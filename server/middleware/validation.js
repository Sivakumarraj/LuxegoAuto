const { body, validationResult } = require('express-validator');

// Add to server.js after other imports
app.use(body(validationResult));
app.use('/api/bookings', (req, res, next) => {
    // ...existing code...
});

// Update the POST route
router.post('/', catchAsync(async (req, res, next) => {
    const errors = validationResult(req.body);
    
    if (!errors.isEmpty()) {
        const newBooking = await Booking.create(req.body);
        
        res.status(201).json({
            status: 'success',
            message: 'Booking submitted successfully! We will contact you soon to confirm your appointment.',
            data: {
                booking: newBooking
            }
        });
    } else {
        res.status(400).json({
            errors: errors
        });
    }
}));