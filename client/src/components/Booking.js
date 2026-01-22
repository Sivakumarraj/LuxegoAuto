import React, { useState } from 'react';
import { submitBooking } from '../utils/api';
import styles from './Booking.module.css'; // We'll create this file

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        vehicle: '',
        package: '',
        address: '',
        specialRequests: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.vehicle.trim()) newErrors.vehicle = 'Vehicle details are required';
        if (!formData.package) newErrors.package = 'Please select a package';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            await submitBooking(formData);
            setSubmitMessage({
                type: 'success',
                text: 'Booking submitted successfully! We will contact you soon to confirm your appointment.'
            });
            setFormData({
                name: '',
                phone: '',
                email: '',
                vehicle: '',
                package: '',
                address: '',
                specialRequests: ''
            });
        } catch (error) {
            setSubmitMessage({
                type: 'error',
                text: 'Something went wrong. Please try again or contact us directly at 07721482404.'
            });
        }
        
        setIsSubmitting(false);
        
        // Clear message after 5 seconds
        setTimeout(() => {
            setSubmitMessage('');
        }, 5000);
    };

    return (
        <section className="section" id="booking">
            <div className="container">
                <h2 className="section-title fade-in">Schedule Your Detailing</h2>
                <p className="section-subtitle fade-in">
                    Fill out the form below to book our mobile car detailing service at your location
                </p>
                
                <div className={`booking-container glass-card fade-in ${styles.bookingContainer}`}>
                    {submitMessage && (
                        <div className={`submit-message ${submitMessage.type} ${styles.submitMessage}`}>
                            <i className={`fas ${submitMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                            {submitMessage.text}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className={`booking-form ${styles.bookingForm}`}>
                        <div className={`form-row ${styles.formRow}`}>
                            <div className={`form-group ${styles.formGroup}`}>
                                <label htmlFor="name">
                                    <i className="fas fa-user"></i> Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? 'error' : ''}
                                    placeholder="John Smith"
                                />
                                {errors.name && <span className="error-message">{errors.name}</span>}
                            </div>
                            
                            <div className={`form-group ${styles.formGroup}`}>
                                <label htmlFor="phone">
                                    <i className="fas fa-phone"></i> Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={errors.phone ? 'error' : ''}
                                    placeholder="07XXXX XXXXXX"
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                        </div>
                        
                        <div className={`form-row ${styles.formRow}`}>
                            <div className={`form-group ${styles.formGroup}`}>
                                <label htmlFor="email">
                                    <i className="fas fa-envelope"></i> Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'error' : ''}
                                    placeholder="john@example.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            
                            <div className={`form-group ${styles.formGroup}`}>
                                <label htmlFor="vehicle">
                                    <i className="fas fa-car"></i> Vehicle Make & Model *
                                </label>
                                <input
                                    type="text"
                                    id="vehicle"
                                    name="vehicle"
                                    value={formData.vehicle}
                                    onChange={handleChange}
                                    className={errors.vehicle ? 'error' : ''}
                                    placeholder="e.g., BMW 3 Series"
                                />
                                {errors.vehicle && <span className="error-message">{errors.vehicle}</span>}
                            </div>
                        </div>
                        
                        <div className={`form-group ${styles.formGroup}`}>
                            <label htmlFor="package">
                                <i className="fas fa-list"></i> Select Package *
                            </label>
                            <select
                                id="package"
                                name="package"
                                value={formData.package}
                                onChange={handleChange}
                                className={errors.package ? 'error' : ''}
                            >
                                <option value="">Choose a package</option>
                                <option value="full-valeting">Luxego Full Valeting - £80+</option>
                                <option value="standard-valeting">Luxego Standard Valeting - £50+</option>
                                <option value="regular-maintenance">Luxego Regular Maintenance - £30+</option>
                            </select>
                            {errors.package && <span className="error-message">{errors.package}</span>}
                        </div>
                        
                        <div className={`form-group ${styles.formGroup}`}>
                            <label htmlFor="address">
                                <i className="fas fa-map-marker-alt"></i> Address *
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={errors.address ? 'error' : ''}
                                placeholder="e.g., 123 High Street, Chelmsford, CM1 1XX"
                            />
                            {errors.address && <span className="error-message">{errors.address}</span>}
                        </div>
                        
                        <div className={`form-group ${styles.formGroup}`}>
                            <label htmlFor="specialRequests">
                                <i className="fas fa-comment"></i> Special Requests (Optional)
                            </label>
                            <textarea
                                id="specialRequests"
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Any specific requirements or notes..."
                            ></textarea>
                        </div>
                        
                        <button type="submit" className={`btn btn-primary submit-btn ${styles.submitBtn}`} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Submitting...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-calendar-check"></i> Book Now
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Booking;