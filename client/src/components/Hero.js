import React, { useEffect } from 'react';
import './Hero.css';

const Hero = ({ scrollToSection }) => {
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - scrolled / 600;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-bg">
                <div className="hero-overlay"></div>
            </div>
            <div className="container">
                <div className="hero-content">
                    <h1 className="fade-in">
                        Premium Detailing At Your Doorstep
                    </h1>
                    <p className="hero-subtitle fade-in">
                        Experience the ultimate in mobile car care. Professional valeting services delivered to you in Chelmsford and surrounding areas.
                    </p>
                    <div className="hero-location fade-in">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>Chelmsford, Essex, UK</span>
                    </div>
                    <div className="hero-buttons fade-in">
                        <button 
                            className="btn btn-primary"
                            onClick={() => scrollToSection('booking')}
                        >
                            <i className="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('services')}
                        >
                            <i className="fas fa-th-list"></i> View Services
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;