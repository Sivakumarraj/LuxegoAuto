import React from 'react';

const Contact = () => {
    const contactMethods = [
        {
            icon: 'fa-phone-alt',
            title: 'Call Us',
            info: '07721482404',
            action: 'tel:07721482404',
            buttonText: 'Call Now',
            buttonClass: 'btn-primary'
        },
        {
            icon: 'fa-envelope',
            title: 'Email Us',
            info: 'info@luxegoautospa.com',
            action: 'mailto:info@luxegoautospa.com',
            buttonText: 'Send Email',
            buttonClass: 'btn-secondary'
        },
        {
            icon: 'fa-tiktok',  // Changed from fa-instagram to fa-tiktok
            title: 'Follow Us',
            info: '@luxego_autospa',
            action: 'https://tiktok.com/@luxego_autospa',
            buttonText: 'View TikTok',
            buttonClass: 'btn-secondary',
            external: true
        }
    ];

    const handleContactClick = (action, external = false) => {
        if (external) {
            window.open(action, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = action;
        }
    };

    return (
        <section className="section bg-dark">
            <div className="container">
                <h2 className="section-title fade-in">Book Your Appointment</h2>
                <p className="section-subtitle fade-in">
                    Get in touch with us to schedule your mobile car detailing service
                </p>
                
                <div className="contact-grid">
                    {contactMethods.map((method, index) => (
                        <div className="contact-card glass-card fade-in" key={index}>
                            <div className="contact-icon">
                                <i className={`fab ${method.icon}`}></i>
                            </div>
                            <h3>{method.title}</h3>
                            <p>{method.info}</p>
                            <button 
                                className={`btn ${method.buttonClass}`}
                                onClick={() => handleContactClick(method.action, method.external)}
                            >
                                {method.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
                
                <div className="info-section">
                    <div className="info-card glass-card fade-in">
                        <div className="info-icon">
                            <i className="fas fa-map-marked-alt"></i>
                        </div>
                        <h3>Service Area</h3>
                        <p>Chelmsford, Essex & surrounding areas</p>
                    </div>
                    
                    <div className="info-card glass-card fade-in">
                        <div className="info-icon">
                            <i className="fas fa-clock"></i>
                        </div>
                        <h3>Availability</h3>
                        <p>7 days a week, 8am - 4pm</p>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .bg-dark {
                    background-color: var(--bg-card);
                }
                
                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    margin: 3rem 0;
                }
                
                .contact-card {
                    padding: 2.5rem 2rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    transition: all 0.4s ease;
                }
                
                .contact-card:hover {
                    transform: translateY(-10px);
                }
                
                .contact-icon {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark));
                    color: var(--bg-dark);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    transition: all 0.3s ease;
                }
                
                .contact-card:hover .contact-icon {
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
                }
                
                .contact-card h3 {
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    font-size: 1.3rem;
                }
                
                .contact-card p {
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                    font-size: 1.1rem;
                }
                
                .info-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-top: 3rem;
                }
                
                .info-card {
                    padding: 2rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                
                .info-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--accent-gold);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                
                .info-card h3 {
                    color: var(--accent-gold);
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                }
                
                .info-card p {
                    color: var(--text-secondary);
                    font-size: 1rem;
                }
                
                @media (max-width: 768px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    
                    .contact-card {
                        padding: 2rem 1.5rem;
                    }
                    
                    .contact-icon {
                        width: 70px;
                        height: 70px;
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;