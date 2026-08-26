/**
 * Validates exercise payload for create/update operations
 * @param {Object} payload - Exercise data to validate
 * @param {string} payload.description - Exercise description
 * @param {number} payload.duration - Exercise duration in minutes
 * @param {boolean} payload.exerciseCheck - Exercise completion flag
 * @returns {string|null} Error message if invalid, null if valid
 */
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

/**
 * Validates month parameter
 * @param {number} month - Month value to validate (1-12)
 * @returns {string|null} Error message if invalid, null if valid
 */
const validateMonth = (month) => {
  const monthNum = Number(month);
  if (!Number.isFinite(monthNum) || monthNum < 1 || monthNum > 12) {
    return 'Invalid month parameter';
  }
  return null;
};

module.exports = {
  validateExercisePayload,
  validateMonth,
};
