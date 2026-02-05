const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');
const verifyToken = require('../middleware/jwtAuth.js');
const { ensureAdmin, ensureSelf } = require('../middleware/accessControl');

const normalizeDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const normalizeDayKey = (date) => date.toISOString().split('T')[0];

const validateExercisePayload = ({ description, duration, exerciseCheck }) => {
  if (!description || typeof description !== 'string') {
    return 'Description is required';
  }
  if (!Number.isFinite(Number(duration)) || Number(duration) <= 0) {
    return 'Duration must be a positive number';
  }
  if (typeof exerciseCheck !== 'boolean') {
    return 'exerciseCheck must be a boolean';
  }
  return null;
};

router.get('/', verifyToken, ensureAdmin, async (req, res) => {
  try {
    const ExerciseData = await Exercise.find({});
    if (!ExerciseData) {
      return res.status(404).json({ error: 'Exercise data not found for this ID.' });
    }
    return res.json(ExerciseData);
  } catch (error) {
    console.error('Error fetching exercise data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:userId/exercises_list', verifyToken, ensureSelf('userId'), async (req, res) => {
  const { userId } = req.params;
  try {
    const exerciseData = await Exercise.findOne({ userId: userId });
    if (!exerciseData) {
      return res.status(404).json({ error: 'Exercise data not found for this userId.' });
    }
    return res.json(exerciseData);
  } catch (error) {
    console.error('Error fetching exercise data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:userId/add', verifyToken, ensureSelf('userId'), async (req, res) => {
  const { userId } = req.params;
  const { description, duration, exerciseCheck } = req.body;

  try {
    const exercisesData = await Exercise.findOne({ userId: userId });
    if (!exercisesData) {
      return res.status(404).json({ message: 'Exercise data not found for this userId.' });
    }
    const validationError = validateExercisePayload({
      description,
      duration: Number(duration),
      exerciseCheck,
    });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const exerciseEntry = {
      description: description.trim(),
      duration: Number(duration),
      exerciseCheck,
    };

    exercisesData.Exercises.push(exerciseEntry);
    await exercisesData.save();
    res.status(201).json({
      message: 'Exercise added successfully',
      newExercise: exercisesData.Exercises[exercisesData.Exercises.length - 1],
    });
  } catch (error) {
    console.error('Error adding exercise:', error);
    res.status(500).json({ message: 'Error adding exercise to the database.' });
  }
});

router.delete(
  '/:userId/exercises_list/:exerciseId',
  verifyToken,
  ensureSelf('userId'),
  async (req, res) => {
    const { userId, exerciseId } = req.params;
    try {
      const exerciseData = await Exercise.findOne({ userId: userId });
      if (!exerciseData) {
        return res.status(404).json({ message: 'Exercise data not found for this userId.' });
      }
      const exerciseToRemove = exerciseData.Exercises.id(exerciseId);
      if (!exerciseToRemove) {
        return res.status(404).json({ message: 'Exercise not found in exercise data.' });
      }
      exerciseToRemove.deleteOne();
      await exerciseData.save();
      res.json({ message: `${exerciseId} Exercise deleted successfully.` });
    } catch (error) {
      console.error('Error deleting Exercise:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

router.post('/:userId/track-exercise', verifyToken, ensureSelf('userId'), async (req, res) => {
  const { userId } = req.params;
  const { date, count } = req.body;

  try {
    if (!Number.isFinite(Number(count)) || Number(count) < 0) {
      return res.status(400).json({ message: 'Invalid count value' });
    }

    const parsedDate = normalizeDate(date);
    if (!parsedDate) {
      return res.status(400).json({ message: 'Invalid date value' });
    }

    const exerciseData = await Exercise.findOne({ userId: userId });
    if (!exerciseData) {
      return res.status(404).json({ message: 'Exercise data not found for this userId.' });
    }

    // Always update the exercise for the given date or add a new entry without restriction
    const existingEntryIndex = exerciseData.trackExercises.findIndex(
      (entry) => entry.date && normalizeDayKey(entry.date) === normalizeDayKey(parsedDate)
    );

    if (existingEntryIndex !== -1) {
      // If an entry exists, update it
      exerciseData.trackExercises[existingEntryIndex].totalExercises = Number(count);
    } else {
      // If no entry exists, add a new one
      exerciseData.trackExercises.push({
        date: parsedDate,
        totalExercises: Number(count),
      });
    }

    await exerciseData.save();
    res.status(201).json({
      message: 'Exercise data updated successfully',
      data: exerciseData.trackExercises,
    });
  } catch (error) {
    console.error('Error updating exercise data:', error);
    res.status(500).json({ message: 'Error updating exercise data' });
  }
});

// Get exercise data for a specific month
router.get('/:userId/data/:month', verifyToken, ensureSelf('userId'), async (req, res) => {
  const { month, userId } = req.params;
  try {
    // Parse the month into a date range (start and end of the month)
    const year = new Date().getFullYear();
    const startDate = new Date(`${month} 1, ${year}`);
    if (Number.isNaN(startDate.getTime())) {
      return res.status(400).json({ message: 'Invalid month parameter' });
    }
    const endDate = new Date(year, startDate.getMonth() + 1, 0); // last day of the month

    // Find exercises within the date range
    const exerciseData = await Exercise.aggregate([
      {
        $unwind: '$trackExercises',
      },
      {
        $match: {
          'trackExercises.date': {
            $gte: startDate,
            $lt: new Date(endDate.getTime() + 24 * 60 * 60 * 1000), // inclusive of last day
          },
          userId: userId,
        },
      },
      {
        $project: {
          _id: 0,
          date: '$trackExercises.date',
          count: '$trackExercises.totalExercises',
        },
      },
    ]);

    // If data is found, send it; otherwise, return an empty array
    if (exerciseData.length > 0) {
      res.status(200).json(exerciseData);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error('Error fetching exercise data:', error);
    res.status(500).json({ message: 'Error fetching exercise data' });
  }
});

module.exports = router;
