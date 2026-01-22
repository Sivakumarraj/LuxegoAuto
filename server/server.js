const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config({ path: './.env' });

// Import routes
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contact');
const packageRoutes = require('./routes/packages');

// Initialize express app
const app = express();

// Body parsing middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Check if the origin is in the allowed origins
        const allowedOrigins = process.env.CORS_ORIGINS ? 
            process.env.CORS_ORIGINS.split(',') : 
            [process.env.CLIENT_URL || 'http://localhost:3000'];
            
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Email transporter setup - Fixed method name
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Make email transporter and other utilities available to routes
app.use((req, res, next) => {
    req.transporter = transporter;
    req.env = process.env;
    next();
});

// API Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/packages', packageRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else {
        sendErrorProd(err, req, res);
    }
});

function sendErrorDev(err, req, res) {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

function sendErrorProd(err, req, res) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // Programming or other unknown error: don't leak error details
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('DB connection successful!'))
.catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
});

// Start server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;