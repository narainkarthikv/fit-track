const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
// const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/jwtAuth.js');

// Create a new user
router.post('/add', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // TODO: Re-enable bcrypt hashing once bcryptjs is properly installed
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    // For now, store plain password (NOT SECURE - for testing only)
    const hashedPassword = password;

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

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  console.log('🔵 Login route handler called');

  try {
    console.log('📝 Extracting email and password from request');
    const { email, password } = req.body;
    console.log(`📧 Email: ${email}, Has Password: ${!!password}`);

    console.log('🔍 Finding user in database');
    const user = await User.findOne({ email });
    console.log(`✓ User query completed, Found: ${!!user}`);

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('🔐 Password verification step');

    const providedPassword = req.body.password;
    const storedHash = user.password;

    // Check password validity
    if (!storedHash) {
      console.error('🔴 Stored password is empty or undefined');
      return res
        .status(500)
        .json({ error: 'Invalid user record - no password' });
    }

    if (!providedPassword) {
      console.error('🔴 Provided password is empty or undefined');
      return res.status(401).json({ error: 'Password required' });
    }

    console.log('✓ Comparing passwords...');
    // TODO: Re-enable bcrypt once bcryptjs is properly installed
    // For now, doing plain comparison (NOT SECURE - for testing only)
    const isPasswordValid = providedPassword === storedHash;
    console.log(`✓ Password comparison result: ${isPasswordValid}`);

    if (!isPasswordValid) {
      console.log('❌ Password invalid');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('✅ Password valid, continuing with login...');
    // Continue with rest of logic
    handlePasswordValid(user, res);
  } catch (error) {
    console.error('🔴 Outer catch block error:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// Helper function to handle successful password verification
async function handlePasswordValid(user, res) {
  try {
    console.log('📅 Processing streak update');
    //Automatic streak updation logic

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
      let newDayCheck = user.dayCheck || [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
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

      console.log('💾 Saving user');
      await user.save();
      console.log('✓ User saved');
    }

    console.log('🔑 Generating JWT token');
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    console.log('✓ Token generated');

    console.log('✅ Login successful, sending response');
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('🔴 Error in handlePasswordValid:', error.message);
    console.error(error.stack);
    res
      .status(500)
      .json({ error: 'Internal server error', message: error.message });
  }
}

//fetch streak info
router.get('/streak/:userID', verifyToken, async (req, res) => {
  const { userID } = req.params;

  try {
    const user = await User.findById(userID);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      dayCheck: user.dayCheck,
      streakCount: user.streakCount,
    });
  } catch (error) {
    console.error('Error fetching streak:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id email');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a user by ID
router.get('/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      username: user.username,
      xp: user.xp,
      totalDays: user.totalDays,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update totalDays
router.post('/:userId/updateTotalDays', async (req, res) => {
  const { userId } = req.params;
  const { dayCheck } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      const totalDays = dayCheck.filter(Boolean).length;
      user.totalDays = totalDays;
      await user.save();
      res
        .status(200)
        .json({ message: 'TotalDays updated successfully', totalDays });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating totalDays:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
