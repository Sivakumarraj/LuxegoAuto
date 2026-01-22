const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

// Create a transporter function
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send booking confirmation email to customer
exports.sendBookingConfirmation = async (booking) => {
    try {
        const transporter = createTransporter();
        
        // Create email HTML using pug template
        const html = pug.renderFile(`${__dirname}/../views/email/bookingConfirmation.pug`, {
            booking,
            firstName: booking.name.split(' ')[0]
        });
        
        const mailOptions = {
            from: `"Luxego Auto Spa" <${process.env.EMAIL_USER}>`,
            to: booking.email,
            subject: 'Your Booking Confirmation - Luxego Auto Spa',
            html
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        throw error;
    }
};

// Send new booking notification to admin
exports.sendNewBookingNotification = async (booking) => {
    try {
        const transporter = createTransporter();
        
        // Create email HTML using pug template
        const html = pug.renderFile(`${__dirname}/../views/email/newBookingNotification.pug`, {
            booking
        });
        
        const mailOptions = {
            from: `"Luxego Auto Spa System" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: 'New Booking Received - Luxego Auto Spa',
            html
        };
        
        await transporter.sendMail(mailOptions);
        console.log('New booking notification email sent successfully');
    } catch (error) {
        console.error('Error sending new booking notification:', error);
        throw error;
    }
};

// Send contact form notification
exports.sendContactNotification = async (contactData) => {
    try {
        const transporter = createTransporter();
        
        // Create email HTML using pug template
        const html = pug.renderFile(`${__dirname}/../views/email/contactNotification.pug`, {
            contact: contactData
        });
        
        const mailOptions = {
            from: `"Luxego Auto Spa System" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
            subject: 'New Contact Form Submission - Luxego Auto Spa',
            html
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Contact notification email sent successfully');
    } catch (error) {
        console.error('Error sending contact notification:', error);
        throw error;
    }
};

// Simple email sender for testing (without templates)
exports.sendSimpleEmail = async (to, subject, message) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"Luxego Auto Spa" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: message
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Simple email sent successfully');
    } catch (error) {
        console.error('Error sending simple email:', error);
        throw error;
    }
};