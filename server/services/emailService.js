const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendNewBookingNotification(bookingData) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: `🚗 New Booking Request - ${bookingData.name}`,
            html: this.generateBookingEmailTemplate(bookingData)
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Booking notification email sent to admin:', info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('Error sending booking email:', error);
            return { success: false, error: error.message };
        }
    }

    async sendBookingConfirmationToCustomer(bookingData) {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: bookingData.email,
            subject: `✅ Your Luxego Auto Spa Booking Confirmation`,
            html: this.generateCustomerEmailTemplate(bookingData)
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Booking confirmation email sent to customer:', info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('Error sending confirmation email:', error);
            return { success: false, error: error.message };
        }
    }

    generateBookingEmailTemplate(booking) {
        const packageName = this.getPackageName(booking.package);
        const packagePrice = this.getPackagePrice(booking.package);
        
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Booking - Luxego Auto Spa</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #0B0B0B;
                    color: #FFFFFF;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #121212;
                    border-radius: 12px;
                    border: 1px solid #D4AF37;
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #D4AF37, #C9A24D);
                    padding: 30px;
                    text-align: center;
                }
                .header h1 {
                    color: #0B0B0B;
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    padding: 30px;
                }
                .booking-details {
                    background-color: rgba(212, 175, 55, 0.1);
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                }
                .detail-row:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .label {
                    color: #D4AF37;
                    font-weight: 600;
                }
                .value {
                    color: #FFFFFF;
                }
                .package-badge {
                    background: linear-gradient(135deg, #D4AF37, #C9A24D);
                    color: #0B0B0B;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 600;
                    display: inline-block;
                    margin-top: 10px;
                }
                .footer {
                    background-color: #0B0B0B;
                    padding: 20px;
                    text-align: center;
                    color: #B5B5B5;
                }
                .cta-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #D4AF37, #C9A24D);
                    color: #0B0B0B;
                    padding: 12px 30px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    margin: 20px 0;
                }
                .urgent {
                    color: #ff6b6b;
                    font-weight: 600;
                }
                .price {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #D4AF37;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚗 New Booking Received</h1>
                </div>
                <div class="content">
                    <h2 style="color: #D4AF37; margin-bottom: 20px;">Customer Booking Details</h2>
                    
                    <div class="booking-details">
                        <div class="detail-row">
                            <span class="label">Customer Name:</span>
                            <span class="value">${booking.name}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Phone Number:</span>
                            <span class="value">${booking.phone}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Email Address:</span>
                            <span class="value">${booking.email}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Vehicle:</span>
                            <span class="value">${booking.vehicle}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Service Address:</span>
                            <span class="value">${booking.address}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Booking Date:</span>
                            <span class="value">${new Date().toLocaleDateString('en-GB')}</span>
                        </div>
                    </div>

                    <div style="text-align: center;">
                        <h3 style="color: #D4AF37; margin-bottom: 10px;">Selected Package</h3>
                        <div class="package-badge">
                            ${packageName}
                        </div>
                        <div class="price">Estimated Price: ${packagePrice}</div>
                    </div>

                    ${booking.specialRequests ? `
                    <div style="margin-top: 20px;">
                        <h3 style="color: #D4AF37;">Special Requests:</h3>
                        <p style="color: #B5B5B5; font-style: italic;">${booking.specialRequests}</p>
                    </div>
                    ` : ''}

                    <div style="text-align: center; margin-top: 30px;">
                        <a href="tel:${booking.phone}" class="cta-button">📞 Call Customer Now</a>
                        <br>
                        <a href="mailto:${booking.email}" class="cta-button">✉️ Send Email</a>
                        <br>
                        <a href="https://wa.me/${booking.phone.replace(/\s/g, '').replace(/^0/, '+44')}" class="cta-button">💬 WhatsApp</a>
                    </div>

                    <div class="urgent">
                        ⚠️ Please respond to this booking within 24 hours to provide excellent customer service!
                    </div>
                </div>
                <div class="footer">
                    <p>Luxego Auto Spa - Auto Spa on Wheels</p>
                    <p style="font-size: 12px;">This is an automated notification. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    generateCustomerEmailTemplate(booking) {
        const packageName = this.getPackageName(booking.package);
        const packagePrice = this.getPackagePrice(booking.package);
        
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation - Luxego Auto Spa</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #0B0B0B;
                    color: #FFFFFF;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #121212;
                    border-radius: 12px;
                    border: 1px solid #D4AF37;
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(135deg, #D4AF37, #C9A24D);
                    padding: 30px;
                    text-align: center;
                }
                .header h1 {
                    color: #0B0B0B;
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    padding: 30px;
                }
                .confirmation-details {
                    background-color: rgba(212, 175, 55, 0.1);
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                }
                .detail-row:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                .label {
                    color: #D4AF37;
                    font-weight: 600;
                }
                .value {
                    color: #FFFFFF;
                }
                .package-badge {
                    background: linear-gradient(135deg, #D4AF37, #C9A24D);
                    color: #0B0B0B;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-weight: 600;
                    display: inline-block;
                    margin-top: 10px;
                }
                .footer {
                    background-color: #0B0B0B;
                    padding: 20px;
                    text-align: center;
                    color: #B5B5B5;
                }
                .cta-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #D4AF37, #C9A24D);
                    color: #0B0B0B;
                    padding: 12px 30px;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    margin: 20px 0;
                }
                .price {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #D4AF37;
                }
                .note {
                    font-style: italic;
                    color: #B5B5B5;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✅ Booking Confirmation</h1>
                </div>
                <div class="content">
                    <h2 style="color: #D4AF37; margin-bottom: 20px;">Thank You, ${booking.name}!</h2>
                    <p>We've received your booking request and will contact you within 24 hours to confirm your appointment.</p>
                    
                    <div class="confirmation-details">
                        <div class="detail-row">
                            <span class="label">Service:</span>
                            <span class="value">${packageName}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Vehicle:</span>
                            <span class="value">${booking.vehicle}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Service Address:</span>
                            <span class="value">${booking.address}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Estimated Price:</span>
                            <span class="value price">${packagePrice}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Booking Date:</span>
                            <span class="value">${new Date().toLocaleDateString('en-GB')}</span>
                        </div>
                    </div>

                    ${booking.specialRequests ? `
                    <div style="margin-top: 20px;">
                        <h3 style="color: #D4AF37;">Your Special Requests:</h3>
                        <p style="color: #B5B5B5; font-style: italic;">${booking.specialRequests}</p>
                    </div>
                    ` : ''}

                    <div style="text-align: center; margin-top: 30px;">
                        <h3 style="color: #D4AF37; margin-bottom: 15px;">What Happens Next?</h3>
                        <p>Our team will contact you within 24 hours to confirm your appointment date and time.</p>
                        <br>
                        <a href="tel:07721482404" class="cta-button">📞 Call Us</a>
                        <br>
                        <a href="https://wa.me/447721482404?text=Hi%20Luxego%20Auto%20Spa,%20I%20just%20submitted%20a%20booking%20for%20${encodeURIComponent(booking.package)}" class="cta-button">💬 WhatsApp Us</a>
                    </div>

                    <div class="note">
                        <p>Note: This is a booking request, not a confirmed appointment. Our team will contact you to finalize the details.</p>
                    </div>
                </div>
                <div class="footer">
                    <p>Luxego Auto Spa - Auto Spa on Wheels</p>
                    <p>📍 Chelmsford, Essex, UK | 📞 07721482404</p>
                    <p style="font-size: 12px;">This is an automated confirmation. Please do not reply to this email.</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    getPackageName(packageId) {
        const packages = {
            'full-valeting': 'Luxego Full Valeting',
            'standard-valeting': 'Luxego Standard Valeting',
            'regular-maintenance': 'Luxego Regular Maintenance'
        };
        return packages[packageId] || 'Selected Package';
    }

    getPackagePrice(packageId) {
        const prices = {
            'full-valeting': '£80+',
            'standard-valeting': '£50+',
            'regular-maintenance': '£30+'
        };
        return prices[packageId] || 'Price TBD';
    }
}

module.exports = new EmailService();