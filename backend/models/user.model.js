const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    xp: { type: Number, default: 0 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    totalDays: { type: Number, default: 0 },

    //New fields for automatic streak tracking
    dayCheck: {
      type: [Boolean],
      default: [false, false, false, false, false, false, false],
    },
    lastActiveDate: { type: Date, default: null },
    streakCount: { type: Number, default: 0 }, //tracks total consecutive dates that the user was active
  },
  {
    collection: 'users',
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
