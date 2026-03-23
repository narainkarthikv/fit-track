const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration - Production Ready
const corsOptions = {
  origin: function (origin, callback) {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    // Log requests in development
    if (isDevelopment) {
      console.log(`CORS request from origin: ${origin}`);
    }

    // Allow requests with no origin (mobile apps, server-to-server, curl, Postman)
    // In production, you might want to restrict this based on your use case
    if (!origin || origin === 'undefined') {
      return callback(null, true);
    }

    // Build allowed origins list
    const allowedOrigins = [];

    // Development origins
    if (isDevelopment) {
      allowedOrigins.push(
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000'
      );
    }

    // Production origins from environment variables
    // Format: FRONTEND_URL=https://fit-track.vercel.app,https://fit-track.netlify.app
    const frontendUrls = process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(',').map((url) => url.trim())
      : [];

    allowedOrigins.push(...frontendUrls);

    // GitHub Codespaces support (for development/preview)
    const isCodespacesURL = origin.includes('.github.dev') || origin.includes('.githubpreview.dev');

    // Vercel preview deployments (branch previews)
    const isVercelPreview = origin.includes('.vercel.app');

    // Netlify preview deployments (branch previews)
    const isNetlifyPreview = origin.includes('.netlify.app');

    // Check if origin is allowed
    const isAllowed =
      allowedOrigins.includes(origin) ||
      (isDevelopment && isCodespacesURL) ||
      (process.env.ALLOW_VERCEL_PREVIEW === 'true' && isVercelPreview) ||
      (process.env.ALLOW_NETLIFY_PREVIEW === 'true' && isNetlifyPreview);

    if (isAllowed) {
      if (isDevelopment) {
        console.log(`✓ CORS allowed for: ${origin}`);
      }
      callback(null, true);
    } else {
      // Log rejected origins for security monitoring
      console.warn(`⚠️  CORS rejected origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Length', 'X-JSON-Response'],
  optionsSuccessStatus: 200,
  maxAge: 86400, // 24 hours cache for preflight requests
  preflightContinue: false,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware for debugging
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${req.get('origin')}`
  );
  next();
});

// Preflight request handler
app.options('*', cors(corsOptions));

// Database connection
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    maxPoolSize: 10,
    minPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  console.error('🔴 UNCAUGHT EXCEPTION:', error.message);
  console.error(error.stack);
  // Don't exit - let express handle it through the error middleware
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔴 UNHANDLED REJECTION at:', promise);
  console.error('Reason:', reason);
});

// Routes
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/user');
const healthRouter = require('./routes/health');

app.use('/api/exercises', exercisesRouter);
app.use('/api/user', userRouter);
app.use('/api/health', healthRouter);

// Global error handler (must be before 404 handler)
app.use((err, req, res, next) => {
  console.error('🔴 Request Error:', err.message);
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler (after error handler)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});
