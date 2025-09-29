const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint to monitor service status
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const healthInfo = {
      status: 'ok',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    };

    res.status(200).json(healthInfo);
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during health check',
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;