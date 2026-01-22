const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        // MongoDB Atlas connection string
        const dbURI = process.env.DATABASE || 'mongodb+srv://rajusivakumar453_db_user:DzUftqv0rgkpZVBm@cluster0.2daknwb.mongodb.net/?appName=Cluster0';
        
        // Connect to MongoDB
        const conn = await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        
        return conn;
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        
        // Exit process with failure
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed through app termination');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
        process.exit(1);
    }
});

module.exports = connectDB;