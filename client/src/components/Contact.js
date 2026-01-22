import React from 'react';

const Contact = () => {
    const contactMethods = [
        {
            icon: 'fa-phone',
            title: 'Call Us',
            info: '+44 7776 648820',
            action: 'tel:+447776648820',
            buttonText: 'Call Now',
            buttonClass: 'btn-primary',
            description: 'Speak directly with our team'
        },
        {
            icon: 'fa-envelope',
            title: 'Email Us',
            info: 'info@luxegoautospa.com',
            action: 'mailto:info@luxegoautospa.com',
            buttonText: 'Send Email',
            buttonClass: 'btn-primary',
            description: 'Get a detailed quote'
        },
        {
            icon: 'fa-tiktok',
            title: 'Follow Us',
            info: '@luxego_autospa',
            action: 'https://tiktok.com/@luxego_autospa',
            buttonText: 'View TikTok',
            buttonClass: 'btn-primary',
            description: 'Watch our work',
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
        <section id="contact" className="section bg-dark">
            <div className="container">
                <h2 className="section-title fade-in">Book Your Appointment</h2>
                <p className="section-subtitle fade-in">
                    Get in touch with us to schedule your mobile car detailing service
                </p>
                
                <div className="contact-grid">
                    {contactMethods.map((method, index) => (
                        <div className="contact-card glass-card fade-in" key={index}>
                            <div className="contact-icon">
                                <i className={`fas ${method.icon}`}></i>
                            </div>
                            <h3>{method.title}</h3>
                            <p className="contact-info">{method.info}</p>
                            <p className="contact-description">{method.description}</p>
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
                    position: relative;
                    overflow: hidden;
                }
                
                .contact-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(90deg, var(--accent-gold), var(--accent-gold-dark));
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }
                
                .contact-card:hover::before {
                    transform: scaleX(1);
                }
                
                .contact-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
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
                    margin-bottom: 0.5rem;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .contact-icon::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: inherit;
                    z-index: -1;
                    opacity: 0.3;
                    transform: scale(1.2);
                }
                
                .contact-card:hover .contact-icon {
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
                }
                
                .contact-card h3 {
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    font-size: 1.3rem;
                    font-weight: 600;
                }
                
                .contact-info {
                    color: var(--accent-gold);
                    margin-bottom: 0.5rem;
                    font-size: 1.1rem;
                    font-weight: 500;
                }
                
                .contact-description {
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                    font-size: 0.95rem;
                    min-height: 2.5rem;
                    display: flex;
                    align-items: center;
                }
                
                .contact-card .btn {
                    min-width: 160px;
                    padding: 12px 24px;
                    font-weight: 600;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                
                .contact-card .btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                    z-index: -1;
                }
                
                .contact-card .btn:hover::before {
                    left: 100%;
                }
                
                .info-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-top: 4rem;
                }
                
                .info-card {
                    padding: 2rem;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                    transition: all 0.3s ease;
                }
                
                .info-card:hover {
                    transform: translateY(-5px);
                    border-color: var(--accent-gold);
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
                    transition: all 0.3s ease;
                }
                
                .info-card:hover .info-icon {
                    background: var(--accent-gold);
                    color: var(--bg-dark);
                    transform: scale(1.1);
                }
                
                .info-card h3 {
                    color: var(--accent-gold);
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                }
                
                .info-card p {
                    color: var(--text-secondary);
                    font-size: 1rem;
                    margin: 0;
                }
                
                /* TikTok specific styling */
                .contact-card:nth-child(3) .contact-icon {
                    background: linear-gradient(135deg, #000000, #FF0050);
                }
                
                .contact-card:nth-child(3) .contact-icon::after {
                    background: linear-gradient(135deg, #000000, #FF0050);
                }
                
                .contact-card:nth-child(3):hover .contact-icon {
                    box-shadow: 0 10px 25px rgba(255, 0, 80, 0.4);
                }
                
                /* Animation delays for staggered entrance */
                .fade-in:nth-child(1) { animation-delay: 0.1s; }
                .fade-in:nth-child(2) { animation-delay: 0.2s; }
                .fade-in:nth-child(3) { animation-delay: 0.3s; }
                
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
                    
                    .contact-card h3 {
                        font-size: 1.2rem;
                    }
                    
                    .contact-info {
                        font-size: 1rem;
                    }
                    
                    .contact-description {
                        font-size: 0.9rem;
                    }
                    
                    .info-section {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                        margin-top: 3rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .contact-card {
                        padding: 1.5rem 1rem;
                    }
                    
                    .contact-icon {
                        width: 60px;
                        height: 60px;
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;