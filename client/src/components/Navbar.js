import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ scrolled, activeSection, scrollToSection }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navbarVisible, setNavbarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setNavbarVisible(false);
            } else {
                setNavbarVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleNavClick = (section) => {
        scrollToSection(section);
        setMobileMenuOpen(false);
    };

    const navItems = [
        { name: 'Home', id: 'home' },
        { name: 'Services', id: 'services' },
        { name: 'Reviews', id: 'reviews' },
        { name: 'Book Now', id: 'booking' },
        { name: 'Contact', id: 'contact' }
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${!navbarVisible ? 'hidden' : ''}`}>
            <div className="container">
                <div className="navbar-content">
                    <div className="navbar-brand" onClick={() => handleNavClick('home')}>
                        <h2>Luxego Auto Spa</h2>
                        <p>Auto Spa on Wheels</p>
                    </div>
                    
                    <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                        {navItems.map((item) => (
                            <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
                                <button onClick={() => handleNavClick(item.id)}>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                        <li>
                            <a href="tel:07721482404" className="btn btn-primary">
                                <i className="fas fa-phone"></i> Call Us
                            </a>
                        </li>
                    </ul>
                    
                    <button 
                        className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;