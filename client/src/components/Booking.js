import React, { useState, useEffect } from 'react';
import { submitBooking } from '../utils/api';

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
    const [selectedPackage, setSelectedPackage] = useState('');

    // Check for selected package on component mount and when custom event is fired
    useEffect(() => {
        // Check sessionStorage for selected package
        const storedPackage = sessionStorage.getItem('selectedPackage');
        if (storedPackage) {
            setFormData(prev => ({ ...prev, package: storedPackage }));
            setSelectedPackage(storedPackage);
            // Clear it after using
            sessionStorage.removeItem('selectedPackage');
        }

        // Listen for custom event
        const handlePackageSelection = (event) => {
            const { packageId } = event.detail;
            setFormData(prev => ({ ...prev, package: packageId }));
            setSelectedPackage(packageId);
        };

        window.addEventListener('packageSelected', handlePackageSelection);
        
        return () => {
            window.removeEventListener('packageSelected', handlePackageSelection);
        };
    }, []);

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
            const response = await submitBooking(formData);
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
            setSelectedPackage('');
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

    // Package options for the dropdown
    const packageOptions = [
        { value: '', label: 'Choose a package' },
        { value: 'full-valeting', label: 'Luxego Full Valeting - £80+' },
        { value: 'standard-valeting', label: 'Luxego Standard Valeting - £50+' },
        { value: 'regular-maintenance', label: 'Luxego Regular Maintenance - £30+' }
    ];

    return (
        <section id="booking" className="section">
            <div className="container">
                <h2 className="section-title fade-in">Schedule Your Detailing</h2>
                <p className="section-subtitle fade-in">
                    Fill out the form below to book our mobile car detailing service at your location
                </p>
                
                <div className="booking-container glass-card fade-in">
                    {selectedPackage && (
                        <div className="selected-package-notice">
                            <i className="fas fa-check-circle"></i>
                            <span>You've selected the {packageOptions.find(p => p.value === selectedPackage)?.label}</span>
                        </div>
                    )}
                    
                    {submitMessage && (
                        <div className={`submit-message ${submitMessage.type}`}>
                            <i className={`fas ${submitMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                            {submitMessage.text}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="booking-form">
                        <div className="form-row">
                            <div className="form-group">
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
                            
                            <div className="form-group">
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
                        
                        <div className="form-row">
                            <div className="form-group">
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
                            
                            <div className="form-group">
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
                        
                        <div className="form-group">
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
                                {packageOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors.package && <span className="error-message">{errors.package}</span>}
                        </div>
                        
                        <div className="form-group">
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
                        
                        <div className="form-group">
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
                        
                        <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
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
            
            <style jsx>{`
                .booking-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 3rem;
                }
                
                .selected-package-notice {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 1rem 1.5rem;
                    background: rgba(76, 175, 80, 0.1);
                    color: #4CAF50;
                    border: 1px solid rgba(76, 175, 80, 0.3);
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    font-weight: 500;
                    animation: slideInDown 0.5s ease;
                }
                
                @keyframes slideInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .submit-message {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    font-weight: 500;
                }
                
                .submit-message.success {
                    background: rgba(76, 175, 80, 0.1);
                    color: #4CAF50;
                    border: 1px solid rgba(76, 175, 80, 0.3);
                }
                
                .submit-message.error {
                    background: rgba(244, 67, 54, 0.1);
                    color: #F44336;
                    border: 1px solid rgba(244, 67, 54, 0.3);
                }
                
                .booking-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                
                .form-group label {
                    margin-bottom: 0.5rem;
                    color: var(--accent-gold);
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .form-group label i {
                    font-size: 0.9rem;
                }
                
                .form-group input,
                .form-group select,
                .form-group textarea {
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid var(--border-gold);
                    border-radius: 8px;
                    color: var(--text-primary);
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }
                
                .form-group input:focus,
                .form-group select:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--accent-gold);
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
                }
                
                .form-group input.error,
                .form-group select.error {
                    border-color: #F44336;
                }
                
                .error-message {
                    color: #F44336;
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .submit-btn {
                    margin-top: 1rem;
                    padding: 1rem 2rem;
                    font-size: 1.1rem;
                    align-self: center;
                    min-width: 200px;
                }
                
                @media (max-width: 768px) {
                    .booking-container {
                        padding: 2rem 1.5rem;
                    }
                    
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                    
                    .submit-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default Booking;