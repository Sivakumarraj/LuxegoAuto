import React, { useState, useEffect } from 'react';

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

    const closeOptions = () => {
        setShowOptions(false);
    };

    useEffect(() => {
        if (showOptions) {
            document.addEventListener('click', closeOptions);
            return () => document.removeEventListener('click', closeOptions);
        }
    }, [showOptions]);

    if (!visible) return null;

    return (
        <div className="floating-button-container" onClick={(e) => e.stopPropagation()}>
            {showOptions && (
                <div className="floating-options">
                    <a 
                        href="tel:+447776648820" 
                        className="floating-option call"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <i className="fas fa-phone"></i>
                        <span>Call Us</span>
                    </a>
                    <a 
                        href="https://wa.me/447776648820?text=Hi%20Luxego%20Auto%20Spa,%20I'd%20like%20to%20book%20a%20car%20detailing%20service." 
                        className="floating-option whatsapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <i className="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </a>
                    <a 
                        href="https://tiktok.com/@luxego_autospa" 
                        className="floating-option tiktok"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <i className="fab fa-tiktok"></i>
                        <span>TikTok</span>
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
            
            <style jsx>{`
                .floating-button-container {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 999;
                }
                
                .floating-button {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark));
                    color: var(--bg-dark);
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 2;
                }
                
                .floating-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 25px rgba(212, 175, 55, 0.6);
                }
                
                .floating-button:active {
                    transform: scale(0.95);
                }
                
                .floating-options {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    animation: fadeInUp 0.3s ease;
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .floating-option {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 15px;
                    text-decoration: none;
                    color: white;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .floating-option span {
                    background: var(--bg-card);
                    color: var(--text-primary);
                    padding: 8px 15px;
                    border-radius: 25px;
                    white-space: nowrap;
                    opacity: 0;
                    transform: translateX(10px);
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--border-gold);
                }
                
                .floating-option:hover span {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                .floating-option i {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.3rem;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                }
                
                .floating-option.call i {
                    background: #4CAF50;
                }
                
                .floating-option.whatsapp i {
                    background: #25D366;
                }
                
                .floating-option.tiktok i {
                    background: #000000;
                    border: 2px solid #FF0050;
                }
                
                .floating-option:hover i {
                    transform: scale(1.1);
                }
                
                .floating-option.tiktok:hover i {
                    background: #FF0050;
                    border-color: #FF0050;
                }
                
                @media (max-width: 768px) {
                    .floating-button-container {
                        bottom: 20px;
                        right: 20px;
                    }
                    
                    .floating-button {
                        width: 55px;
                        height: 55px;
                        font-size: 1.3rem;
                    }
                    
                    .floating-option i {
                        width: 45px;
                        height: 45px;
                        font-size: 1.2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default FloatingButton;