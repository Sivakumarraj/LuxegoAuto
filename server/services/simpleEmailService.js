const simpleEmailService = {
    async sendNewBookingNotification(bookingData) {
        // For development, just log the booking details
        if (process.env.NODE_ENV === 'development') {
            console.log('=== NEW BOOKING NOTIFICATION ===');
            console.log('Name:', bookingData.name);
            console.log('Phone:', bookingData.phone);
            console.log('Email:', bookingData.email);
            console.log('Vehicle:', bookingData.vehicle);
            console.log('Package:', bookingData.package);
            console.log('Address:', bookingData.address);
            console.log('Special Requests:', bookingData.specialRequests || 'None');
            console.log('================================');
            
            return { success: true, message: 'Booking details logged in development mode' };
        }
        
        // For production, you would implement a real email service here
        // This is a placeholder for when you set up a proper email service
        return { 
            success: false, 
            message: 'Email service not configured for production yet' 
        };
    }
};

module.exports = simpleEmailService;