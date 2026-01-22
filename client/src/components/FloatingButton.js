import React, { useState, useEffect } from 'react';
import './FloatingButton.css';

const FloatingButton = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    if (!visible) return null;

    return (
        <div className="floating-button-container" onClick={(e) => e.stopPropagation()}>
            {showOptions && (
                <div className="floating-options">
                    <a 
                        href="tel:07721482404" 
                        className="floating-option call"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <i className="fas fa-phone"></i>
                        <span>Call Us</span>
                    </a>
                    <a 
                        href="https://wa.me/447721482404?text=Hi%20Luxego%20Auto%20Spa,%20I'd%20like%20to%20book%20a%20car%20detailing%20service." 
                        className="floating-option whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <i className="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </a>
                </div>
            )}
            
            <button 
                className="floating-button" 
                onClick={toggleOptions}
                aria-label="Contact options"
            >
                <i className={`fas ${showOptions ? 'fa-times' : 'fa-comment-dots'}`}></i>
            </button>
        </div>
    );
};

export default FloatingButton;