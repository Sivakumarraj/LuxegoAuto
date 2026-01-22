const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: './.env' });

// Import routes
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contact');
const packageRoutes = require('./routes/packages');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Connect to MongoDB
const connectDB = async () => {
    try {
        // Check if we're using a local or Atlas connection
        const isLocalDB = process.env.DATABASE.includes('localhost');
        
        if (isLocalDB) {
            console.log('Connecting to local MongoDB...');
            await mongoose.connect(process.env.DATABASE_LOCAL || 'mongodb://localhost:27017/luxego-autospa', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } else {
            console.log('Connecting to MongoDB Atlas...');
            // Replace <PASSWORD> in the connection string if needed
            const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD || '');
            await mongoose.connect(DB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        
        console.log('DB connection successful!');
    } catch (error) {
        console.error('DB connection error:', error);
        
        // Provide helpful error message
        if (error.code === 'ENOTFOUND') {
            console.error('\nPossible solutions:');
            console.error('1. Check your internet connection');
            console.error('2. Verify your MongoDB Atlas connection string in .env file');
            console.error('3. Ensure your IP is whitelisted in MongoDB Atlas Network Access');
            console.error('4. Try using a local MongoDB instance instead');
        }
        
        process.exit(1);
    }
};

// Start server
const port = process.env.PORT || 5000;
const server = app.listen(port, async () => {
    console.log(`App running on port ${port}...`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Connect to database after server starts
    await connectDB();
});

module.exports = app;