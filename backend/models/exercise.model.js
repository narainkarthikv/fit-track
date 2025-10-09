const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.String, ref: 'users' },
    Exercises: [
      {
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        exerciseCheck: { type: Boolean, required: true },
      },
    ],
    trackExercises: [
      {
        date: { type: Date },
        totalExercises: { type: Number },
      },
    ],
  },
  {
    collection: 'exercises',
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
