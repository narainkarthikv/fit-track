const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/jwtAuth.js')

// Create a new user
router.post('/add', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

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

      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ message: 'Login successful',token,user, });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//fetch streak info
router.get('/streak/:userID',verifyToken, async (req, res) => {
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
router.get('/:userId',verifyToken, async (req, res) => {
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
