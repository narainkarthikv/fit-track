const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            trackExercises: [] 
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

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
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
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ username: user.username, xp: user.xp, totalDays: user.totalDays });
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
            res.status(200).json({ message: "TotalDays updated successfully" ,totalDays });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error updating totalDays:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
