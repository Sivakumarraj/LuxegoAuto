import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'Reviews', href: '#reviews' },
        { name: 'Book Now', href: '#booking' },
        { name: 'Contact', href: '#contact' }
    ];

    const socialLinks = [
        { name: 'Instagram', icon: 'fa-instagram', href: 'https://instagram.com/luxego_autospa' },
        { name: 'Facebook', icon: 'fa-facebook', href: '#' },
        { name: 'TikTok', icon: 'fa-tiktok', href: 'https://tiktok.com/@luxego_autospa' }
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h2>Luxego Auto Spa</h2>
                        <p>Auto Spa on Wheels</p>
                        <p className="footer-description">
                            Premium mobile car detailing service in Chelmsford, Essex. 
                            We bring the luxury car spa experience directly to your doorstep.
                        </p>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                >
                                    <i className={`fab ${social.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href}>{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="footer-contact">
                        <h3>Contact Info</h3>
                        <div className="contact-item">
                            <i className="fas fa-phone"></i>
                            <a href="tel:07721482404">07721482404</a>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:info@luxegoautospa.com">info@luxegoautospa.com</a>
                        </div>
                        <div className="contact-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Chelmsford, Essex, UK</span>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; {currentYear} Luxego Auto Spa. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .footer {
                    background-color: var(--bg-dark);
                    border-top: 1px solid var(--border-gold);
                    padding: 60px 0 20px;
                }
                
                .footer-content {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr;
                    gap: 3rem;
                    margin-bottom: 3rem;
                }
                
                .footer-brand h2 {
                    color: var(--accent-gold);
                    margin-bottom: 0.5rem;
                    font-size: 2rem;
                }
                
                .footer-brand p {
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                }
                
                .footer-description {
                    max-width: 400px;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                }
                
                .social-links a {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.1);
                    color: var(--accent-gold);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .social-links a:hover {
                    background: var(--accent-gold);
                    color: var(--bg-dark);
                    transform: translateY(-3px);
                }
                
                .footer-links h3,
                .footer-contact h3 {
                    color: var(--accent-gold);
                    margin-bottom: 1.5rem;
                    font-size: 1.3rem;
                }
                
                .footer-links ul {
                    list-style: none;
                }
                
                .footer-links li {
                    margin-bottom: 1rem;
                }
                
                .footer-links a {
                    color: var(--text-secondary);
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                
                .footer-links a:hover {
                    color: var(--accent-gold);
                    transform: translateX(5px);
                }
                
                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 1rem;
                    color: var(--text-secondary);
                }
                
                .contact-item i {
                    color: var(--accent-gold);
                    width: 20px;
                }
                
                .contact-item a {
                    color: var(--text-secondary);
                    transition: all 0.3s ease;
                }
                
                .contact-item a:hover {
                    color: var(--accent-gold);
                }
                
                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 2rem;
                    border-top: 1px solid var(--border-gold);
                    color: var(--text-secondary);
                }
                
                .footer-bottom-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .footer-bottom-links a {
                    color: var(--text-secondary);
                    transition: all 0.3s ease;
                }
                
                .footer-bottom-links a:hover {
                    color: var(--accent-gold);
                }
                
                @media (max-width: 992px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                    
                    .footer-bottom {
                        flex-direction: column;
                        gap: 1rem;
                        text-align: center;
                    }
                }
                
                @media (max-width: 768px) {
                    .footer {
                        padding: 40px 0 20px;
                    }
                    
                    .footer-brand h2 {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;