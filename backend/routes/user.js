const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/jwtAuth.js');
const { ensureAdmin, ensureSelf } = require('../middleware/accessControl');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined');
}
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1d';

const isBcryptHash = (value = '') =>
  value.startsWith('$2a$') || value.startsWith('$2b$') || value.startsWith('$2y$');

const hashPassword = async (password) => {
  if (typeof password !== 'string' || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  return bcrypt.hash(password, saltRounds);
};

const sanitizeUser = (userDoc) => {
  if (!userDoc) {
    return null;
  }

  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  return {
    id: user._id?.toString() || user.id,
    username: user.username,
    email: user.email,
    xp: user.xp,
    totalDays: user.totalDays,
    dayCheck: user.dayCheck,
    lastActiveDate: user.lastActiveDate,
    streakCount: user.streakCount,
    role: user.role || 'user',
  };
};

const createTokenPayload = (user) => ({
  id: user._id.toString(),
  email: user.email,
  role: user.role || 'user',
});

const verifyAndUpgradePassword = async (user, providedPassword) => {
  const storedHash = user.password;
  if (!storedHash || !providedPassword) {
    return false;
  }

  if (isBcryptHash(storedHash)) {
    return bcrypt.compare(providedPassword, storedHash);
  }

  const isMatch = providedPassword === storedHash;
  if (isMatch) {
    user.password = await hashPassword(providedPassword);
    await user.save();
  }
  return isMatch;
};

// Create a new user
router.post('/add', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      xp: 0,
      totalDays: 0,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const newExercise = new Exercise({
      userId: newUser._id,
      Exercises: [],
      trackExercises: [],
    });

    // Save the new exercise to the database
    await newExercise.save();

    res.status(200).json({ message: 'User created successfully', user: sanitizeUser(newUser) });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await verifyAndUpgradePassword(user, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    handlePasswordValid(user, res);
  } catch (error) {
    console.error('🔴 Outer catch block error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Helper function to handle successful password verification
async function handlePasswordValid(user, res) {
  try {
    const today = new Date();
    const todayIndex = today.getDay();

    const lastDate = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    //check if the user has already logged in today
    const isSameDay =
      lastDate &&
      lastDate.getDate() === today.getDate() &&
      lastDate.getMonth() === today.getMonth() &&
      lastDate.getFullYear() === today.getFullYear();

    if (!isSameDay) {
      //Was this user already active today? If yes, do nothing

      //1- Mark today's day of the week as true
      let newDayCheck = user.dayCheck || [false, false, false, false, false, false, false];
      const isNewWeek = todayIndex === 0; //if sunday then start fresh
      if (isNewWeek) {
        newDayCheck = [false, false, false, false, false, false, false]; // Start fresh week
      }
      newDayCheck[todayIndex] = true;

      //2-Compare last active day from the user's DB with yesterday to see if the streak continues
      const isYesterday =
        lastDate &&
        lastDate.getDate() === yesterday.getDate() &&
        lastDate.getMonth() === yesterday.getMonth() &&
        lastDate.getFullYear() === yesterday.getFullYear();

      user.streakCount = isYesterday ? user.streakCount + 1 : 1; //3- Update streak count
      user.lastActiveDate = today;
      user.dayCheck = newDayCheck;

      user.totalDays = newDayCheck.filter(Boolean).length;

      await user.save();
    }

    const token = jwt.sign(createTokenPayload(user), JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    res.status(200).json({ message: 'Login successful', token, user: sanitizeUser(user) });
  } catch (error) {
    console.error('🔴 Error in handlePasswordValid:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

//fetch streak info
router.get('/streak/:userID', verifyToken, ensureSelf('userID'), async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await User.findById(userID);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      dayCheck: user.dayCheck,
      streakCount: user.streakCount,
    });
  } catch (error) {
    console.error('Error fetching streak:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
router.get('/', verifyToken, ensureAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '_id email username role');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a user by ID
router.get('/:userId', verifyToken, ensureSelf('userId'), async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(sanitizeUser(user));
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user profile
router.put('/:userId/update', verifyToken, ensureSelf('userId'), async (req, res) => {
  const { userId } = req.params;
  const { username, email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (username && username.trim()) {
      if (username !== user.username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: 'Username already taken' });
        }
      }
      user.username = username.trim();
    }

    if (email && email.trim()) {
      if (email !== user.email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already taken' });
        }
      }
      user.email = email.trim();
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required' });
      }

      const isPasswordValid = await verifyAndUpgradePassword(user, currentPassword);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
      }

      user.password = await hashPassword(newPassword);
    }

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update totalDays
router.post('/:userId/updateTotalDays', verifyToken, ensureSelf('userId'), async (req, res) => {
  const { userId } = req.params;
  const { dayCheck } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      if (!Array.isArray(dayCheck)) {
        return res.status(400).json({ error: 'dayCheck must be an array' });
      }
      const totalDays = dayCheck.filter(Boolean).length;
      user.totalDays = totalDays;
      await user.save();
      res.status(200).json({ message: 'TotalDays updated successfully', totalDays });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating totalDays:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
