const express = require('express');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

// Submit contact form
router.post('/', catchAsync(async (req, res, next) => {
    const { name, email, phone, message, subject } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
        return next(new AppError('Please provide name, email, and message', 400));
    }
    
    // TODO: Send email notification
    console.log('Contact form submission:', { name, email, phone, message, subject });
    
    res.status(200).json({
        status: 'success',
        message: 'Your message has been sent successfully. We will get back to you soon!'
    });
}));

module.exports = router;