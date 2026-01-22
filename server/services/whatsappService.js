const twilio = require('twilio');

class WhatsAppService {
    constructor() {
        // Initialize Twilio client if credentials are provided
        if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
            this.client = twilio(
                process.env.TWILIO_ACCOUNT_SID,
                process.env.TWILIO_AUTH_TOKEN
            );
            this.useTwilioAPI = true;
        } else {
            this.useTwilioAPI = false;
        }
    }

    async sendNewBookingNotification(bookingData) {
        const message = `
🚗 *NEW BOOKING ALERT*

*Customer:* ${bookingData.name}
*Phone:* ${bookingData.phone}
*Email:* ${bookingData.email}
*Service:* ${this.getPackageName(bookingData.package)}
*Vehicle:* ${bookingData.vehicle}
*Address:* ${bookingData.address}
*Date:* ${new Date().toLocaleDateString('en-GB')}

 ${bookingData.specialRequests ? `*Special Requests:* ${bookingData.specialRequests}` : ''}

Please contact the customer within 24 hours to confirm the appointment.
        `;

        try {
            if (this.useTwilioAPI && process.env.USE_WHATSAPP_LINK !== 'true') {
                // Use Twilio API for real WhatsApp messages
                const response = await this.client.messages.create({
                    body: message,
                    from: process.env.TWILIO_WHATSAPP_NUMBER,
                    to: `whatsapp:${process.env.ADMIN_WHATSAPP}`
                });

                console.log('WhatsApp notification sent to admin:', response.sid);
                return { success: true, sid: response.sid, method: 'Twilio API' };
            } else {
                // Use WhatsApp click-to-chat link (free method)
                const encodedMessage = encodeURIComponent(message);
                const whatsappLink = `https://wa.me/${process.env.ADMIN_WHATSAPP.replace('+', '')}?text=${encodedMessage}`;
                
                console.log('WhatsApp link generated for admin:', whatsappLink);
                return { 
                    success: true, 
                    method: 'Click-to-Chat Link',
                    link: whatsappLink,
                    message: 'Admin can use the provided WhatsApp link to view booking details'
                };
            }
        } catch (error) {
            console.error('Error sending WhatsApp notification:', error);
            return { success: false, error: error.message };
        }
    }

    async sendBookingConfirmationToCustomer(bookingData) {
        const message = `
✅ *Luxego Auto Spa - Booking Received!*

Dear ${bookingData.name},

Thank you for choosing Luxego Auto Spa! We've received your booking request:

📋 *Booking Details:*
• Service: ${this.getPackageName(bookingData.package)}
• Vehicle: ${bookingData.vehicle}
• Address: ${bookingData.address}
• Date: ${new Date().toLocaleDateString('en-GB')}

📞 *Next Steps:*
Our team will contact you within 24 hours to confirm your appointment time.

📍 *Service Area:* Chelmsford, Essex & surrounding areas
⏰ *Availability:* 7 days a week, 8am - 4pm

Need immediate assistance? Call us at 07721482404

Thank you for choosing Luxego Auto Spa! ✨
        `;

        try {
            if (this.useTwilioAPI && process.env.USE_WHATSAPP_LINK !== 'true') {
                // Use Twilio API for real WhatsApp messages
                const response = await this.client.messages.create({
                    body: message,
                    from: process.env.TWILIO_WHATSAPP_NUMBER,
                    to: `whatsapp:+44${bookingData.phone.replace(/\s/g, '').replace(/^0/, '')}`
                });

                console.log('WhatsApp confirmation sent to customer:', response.sid);
                return { success: true, sid: response.sid, method: 'Twilio API' };
            } else {
                // Use WhatsApp click-to-chat link (free method)
                const encodedMessage = encodeURIComponent(message);
                const whatsappLink = `https://wa.me/44${bookingData.phone.replace(/\s/g, '').replace(/^0/, '')}?text=${encodedMessage}`;
                
                console.log('WhatsApp link generated for customer:', whatsappLink);
                return { 
                    success: true, 
                    method: 'Click-to-Chat Link',
                    link: whatsappLink,
                    message: 'Customer can use the provided WhatsApp link to confirm booking'
                };
            }
        } catch (error) {
            console.error('Error sending WhatsApp confirmation:', error);
            return { success: false, error: error.message };
        }
    }

    getPackageName(packageId) {
        const packages = {
            'full-valeting': 'Luxego Full Valeting (£80+)',
            'standard-valeting': 'Luxego Standard Valeting (£50+)',
            'regular-maintenance': 'Luxego Regular Maintenance (£30+)'
        };
        return packages[packageId] || 'Selected Package';
    }
}

module.exports = new WhatsAppService();