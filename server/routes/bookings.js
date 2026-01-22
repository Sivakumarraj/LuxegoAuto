const express = require('express');
const Booking = require('../models/Booking');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const { sendBookingConfirmation, sendNewBookingNotification } = require('../utils/email');

const router = express.Router();

// Middleware to set query params for admin
router.use((req, res, next) => {
    if (req.query.admin === 'true') {
        req.query.admin = true;
    }
    next();
});

// Get all bookings (with filtering, sorting, and pagination)
router.get('/', catchAsync(async (req, res, next) => {
    // Build query
    let query = {};
    
    // Filter by status
    if (req.query.status) {
        query.status = req.query.status;
    }
    
    // Filter by email
    if (req.query.email) {
        query.email = req.query.email;
    }
    
    // Date range filter
    if (req.query.startDate || req.query.endDate) {
        query.appointmentDate = {};
        if (req.query.startDate) {
            query.appointmentDate.$gte = new Date(req.query.startDate);
        }
        if (req.query.endDate) {
            query.appointmentDate.$lte = new Date(req.query.endDate);
        }
    }
    
    // Execute query
    const bookings = await Booking.find(query)
        .sort({ appointmentDate: -1 })
        .limit(req.query.limit * 1 || 50)
        .skip((req.query.page - 1 || 0) * (req.query.limit || 50));
    
    // Get total count for pagination
    const total = await Booking.countDocuments(query);
    
    res.status(200).json({
        status: 'success',
        results: bookings.length,
        total,
        data: {
            bookings
        }
    });
}));

// Create a new booking
router.post('/', catchAsync(async (req, res, next) => {
    // Check for duplicate booking within 24 hours
    const existingBooking = await Booking.findOne({
        email: req.body.email,
        createdAt: {
            $gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
    });
    
    if (existingBooking) {
        // Instead of throwing an error, we'll create the booking but mark it as a duplicate
        // and return a special status
        const newBooking = await Booking.create({
            ...req.body,
            status: 'duplicate',
            notes: `Possible duplicate of booking ID: ${existingBooking._id}`
        });
        
        return res.status(201).json({
            status: 'success',
            message: 'Booking received. It appears you may have already submitted a booking recently. Our team will review and contact you to confirm.',
            data: {
                booking: newBooking
            }
        });
    }
    
    const newBooking = await Booking.create(req.body);
    
    // Send emails (but don't fail the request if emails fail)
    try {
        await sendBookingConfirmation(newBooking);
        await sendNewBookingNotification(newBooking);
    } catch (error) {
        console.error('Email sending failed, but booking was created:', error);
    }
    
    res.status(201).json({
        status: 'success',
        message: 'Booking submitted successfully! We will contact you soon to confirm your appointment.',
        data: {
            booking: newBooking
        }
    });
}));

// Get a specific booking
router.get('/:id', factory.getOne(Booking));

// Update a booking
router.patch('/:id', catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
        return next(new AppError('No booking found with that ID', 404));
    }
    
    // Only allow certain fields to be updated
    const allowedFields = ['status', 'notes', 'appointmentDate', 'completedDate'];
    const updateData = {};
    
    Object.keys(req.body).forEach(el => {
        if (allowedFields.includes(el)) {
            updateData[el] = req.body[el];
        }
    });
    
    // If status is being updated to completed, set completed date
    if (req.body.status === 'completed' && !req.body.completedDate) {
        updateData.completedDate = new Date();
    }
    
    const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
    
    res.status(200).json({
        status: 'success',
        data: {
            booking: updatedBooking
        }
    });
}));

// Delete a booking
router.delete('/:id', factory.deleteOne(Booking));

// Get booking statistics
router.get('/stats/summary', catchAsync(async (req, res, next) => {
    const stats = await Booking.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalRevenue: { $sum: '$price' }
            }
        }
    ]);
    
    const monthlyStats = await Booking.aggregate([
        {
            $match: {
                appointmentDate: {
                    $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    $lte: new Date()
                }
            }
        },
        {
            $group: {
                _id: { $month: '$appointmentDate' },
                count: { $sum: 1 },
                revenue: { $sum: '$price' }
            }
        }
    ]);
    
    res.status(200).json({
        status: 'success',
        data: {
            stats,
            monthlyStats
        }
    });
}));

module.exports = router;