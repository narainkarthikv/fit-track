const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

/**
 * Converts string to valid MongoDB ObjectId if valid, otherwise returns null
 * @param {string} value - Value to convert to ObjectId
 * @returns {ObjectId|null} Valid ObjectId or null
 */
const toObjectId = (value) =>
  mongoose.Types.ObjectId.isValid(value) ? new mongoose.Types.ObjectId(value) : null;

/**
 * Normalizes date string to valid Date object
 * @param {string} value - Date string to normalize
 * @returns {Date|null} Valid Date or null
 */
const normalizeDate = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

/**
 * Converts Date to ISO day string (YYYY-MM-DD)
 * @param {Date} date - Date to convert
 * @returns {string} ISO day string
 */
const normalizeDayKey = (date) => date.toISOString().split('T')[0];

/**
 * Builds MongoDB filter for userId that works with both ObjectId and string
 * @param {string} userId - User ID (string or ObjectId)
 * @returns {Object} MongoDB filter query
 */
const buildUserIdFilter = (userId) => {
  const objectId = toObjectId(userId);
  if (!objectId) {
    return { $expr: { $eq: [{ $toString: '$userId' }, userId] } };
  }

  return {
    $or: [{ userId: objectId }, { $expr: { $eq: [{ $toString: '$userId' }, userId] } }],
  };
};

/**
 * Checks if a value is a valid bcrypt hash
 * @param {string} value - Value to check
 * @returns {boolean} True if valid bcrypt hash
 */
const isBcryptHash = (value = '') =>
  value.startsWith('$2a$') || value.startsWith('$2b$') || value.startsWith('$2y$');

/**
 * Hashes a password using bcrypt
 * @param {string} password - Password to hash
 * @returns {Promise<string>} Hashed password
 * @throws {Error} If password is invalid
 */
const hashPassword = async (password) => {
  if (typeof password !== 'string' || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Sanitizes user document for API response
 * @param {Object} userDoc - Mongoose user document
 * @returns {Object|null} Sanitized user object
 */
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

module.exports = {
  toObjectId,
  normalizeDate,
  normalizeDayKey,
  buildUserIdFilter,
  isBcryptHash,
  hashPassword,
  sanitizeUser,
  SALT_ROUNDS,
};
