const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const router = express.Router();

// Get all bookings
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
    
    // Execute query
    const bookings = await Booking.find(query)
        .sort({ createdAt: -1 })
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
    console.log('Received booking request:', req.body);
    
    try {
        // Check for duplicate booking within 24 hours
        const existingBooking = await Booking.findOne({
            email: req.body.email,
            createdAt: {
                $gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
            }
        });
        
        if (existingBooking) {
            return next(new AppError('You already have a booking within the last 24 hours. Please contact us directly for any changes.', 400));
        }
        
        // Create the booking
        const newBooking = await Booking.create(req.body);
        console.log('New booking created:', newBooking);
        
        // Send confirmation email
        if (req.transporter) {
            try {
                await sendBookingConfirmationEmail(newBooking, req);
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Error sending email:', emailError);
                // Continue with the response even if email fails
            }
        }
        
        res.status(201).json({
            status: 'success',
            data: {
                booking: newBooking
            }
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        return next(new AppError('Failed to create booking. Please try again.', 500));
    }
}));

// Get a specific booking
router.get('/:id', catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
        return next(new AppError('No booking found with that ID', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            booking
        }
    });
}));

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
router.delete('/:id', catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
        return next(new AppError('No booking found with that ID', 404));
    }
    
    await booking.remove();
    
    res.status(204).json({
        status: 'success',
        data: null
    });
}));

// Email function
const sendBookingConfirmationEmail = async (booking, req) => {
    try {
        // Skip email sending if disabled in development
        if (req.env.NODE_ENV === 'development' && req.env.DISABLE_EMAIL_IN_DEV === 'true') {
            console.log('Email sending disabled in development mode');
            return;
        }
        
        // Generate WhatsApp URL
        const whatsappUrl = generateWhatsAppUrl(booking, req.env);
        
        const mailOptions = {
            from: req.env.EMAIL_USER,
            to: booking.email,
            subject: 'Luxego Auto Spa - Booking Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #D4AF37; margin-bottom: 5px;">Luxego Auto Spa</h1>
                        <p style="margin-top: 0; color: #666;">Auto Spa on Wheels</p>
                    </div>
                    
                    <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Booking Confirmation</h2>
                    
                    <p>Thank you for booking with Luxego Auto Spa! We've received your booking request and will contact you shortly to confirm the details.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #D4AF37;">Booking Details:</h3>
                        <p><strong>Name:</strong> ${booking.name}</p>
                        <p><strong>Phone:</strong> ${booking.phone}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                        <p><strong>Vehicle:</strong> ${booking.vehicle}</p>
                        <p><strong>Package:</strong> ${booking.package.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                        <p><strong>Address:</strong> ${booking.address}</p>
                        ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
                    </div>
                    
                    <p>We'll be in touch within 24 hours to confirm your appointment date and time.</p>
                    
                    ${whatsappUrl ? `
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${whatsappUrl}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                            <i style="margin-right: 5px;">💬</i> Message us on WhatsApp
                        </a>
                    </div>
                    ` : ''}
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="margin-bottom: 5px;">Best regards,</p>
                        <p style="margin-top: 0; color: #D4AF37; font-weight: bold;">The Luxego Auto Spa Team</p>
                        <p style="margin-top: 5px; font-size: 14px; color: #666;">
                            Phone: ${req.env.WHATSAPP_BUSINESS_NUMBER ? `+${req.env.WHATSAPP_BUSINESS_NUMBER}` : '07721482404'} | Email: ${req.env.EMAIL_USER}
                        </p>
                    </div>
                </div>
            `
        };

        await req.transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent to:', booking.email);
        
        // Also send notification to business email
        const notificationOptions = {
            from: req.env.EMAIL_USER,
            to: req.env.ADMIN_EMAIL || req.env.EMAIL_USER,
            subject: 'New Booking Received - Luxego Auto Spa',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                    <h2 style="color: #D4AF37;">New Booking Received</h2>
                    <p>A new booking has been submitted with the following details:</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${booking.name}</p>
                        <p><strong>Phone:</strong> ${booking.phone}</p>
                        <p><strong>Email:</strong> ${booking.email}</p>
                        <p><strong>Vehicle:</strong> ${booking.vehicle}</p>
                        <p><strong>Package:</strong> ${booking.package.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                        <p><strong>Address:</strong> ${booking.address}</p>
                        ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
                    </div>
                    
                    <p>Please contact the customer to confirm the appointment details.</p>
                    
                    ${whatsappUrl ? `
                    <div style="margin: 20px 0;">
                        <a href="${whatsappUrl}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                            <i style="margin-right: 5px;">💬</i> Contact on WhatsApp
                        </a>
                    </div>
                    ` : ''}
                </div>
            `
        };
        
        await req.transporter.sendMail(notificationOptions);
        console.log('New booking notification sent to business');
        
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
    }
};

// Function to generate WhatsApp URL
const generateWhatsAppUrl = (booking, env) => {
    if (!env.USE_WHATSAPP_LINK || env.USE_WHATSAPP_LINK !== 'true') {
        return null;
    }
    
    try {
        const message = `Hello ${booking.name}! Thank you for booking with Luxego Auto Spa. We've received your request for ${booking.package.replace('-', ' ')} service for your ${booking.vehicle}. We'll contact you shortly at ${booking.phone} to confirm your appointment details. Reply to this message if you have any questions.`;
        
        // Create WhatsApp URL with the business number
        const whatsappUrl = `https://wa.me/${env.WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
        
        console.log('WhatsApp notification URL:', whatsappUrl);
        return whatsappUrl;
    } catch (error) {
        console.error('Error generating WhatsApp URL:', error);
        return null;
    }
};

module.exports = router;