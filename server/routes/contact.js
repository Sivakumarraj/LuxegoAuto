const express = require('express');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { sendContactNotification } = require('../utils/email');

const router = express.Router();

// Submit contact form
router.post('/', catchAsync(async (req, res, next) => {
    const { name, email, phone, message, subject } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
        return next(new AppError('Please provide name, email, and message', 400));
    }
    
    // Validate email format
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return next(new AppError('Please provide a valid email address', 400));
    }
    
    try {
        // Send email notification to admin
        await sendContactNotification({ name, email, phone, message, subject });
        console.log('Contact form notification sent successfully');
        
        res.status(200).json({
            status: 'success',
            message: 'Your message has been sent successfully. We will get back to you soon!'
        });
    } catch (error) {
        console.error('Error sending contact notification:', error);
        return next(new AppError('Failed to send your message. Please try again later.', 500));
    }
}));

// Get contact form submissions (admin only)
router.get('/messages', catchAsync(async (req, res, next) => {
    // TODO: Implement admin authentication
    // if (!req.user || !req.user.isAdmin) {
    //     return next(new AppError('You are not authorized to access this resource', 403));
    // }
    
    // TODO: Fetch messages from database
    // const messages = await ContactMessage.find().sort('-createdAt');
    
    res.status(200).json({
        status: 'success',
        // data: { messages }
        data: { messages: [] } // Placeholder
    });
}));

module.exports = router;