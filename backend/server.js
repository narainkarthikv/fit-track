const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl requests, etc.)
    if (!origin || origin === 'undefined') {
      return callback(null, true);
    }

    // Allow localhost and development URLs
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
    ];

    // Allow all Codespaces URLs (github.dev domain)
    const isCodespacesURL = origin.includes('.github.dev');

    if (allowedOrigins.includes(origin) || isCodespacesURL) {
      callback(null, true);
    } else {
      // Log rejected origins for debugging
      console.log(`CORS rejected origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Preflight request handler
app.options('*', cors(corsOptions));

// Database connection
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Routes
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/user');
const healthRouter = require('./routes/health');

app.use('/api/exercises', exercisesRouter);
app.use('/api/user', userRouter);
app.use('/api/health', healthRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
