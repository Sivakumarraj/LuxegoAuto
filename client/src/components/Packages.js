import React, { useState } from 'react';

const Packages = () => {
    const [hoveredPackage, setHoveredPackage] = useState(null);

    const packages = [
        {
            id: 'full-valeting',
            name: 'Luxego Full Valeting',
            price: '£80+',
            description: 'Experience comprehensive care, inside and out',
            features: [
                'Complete interior vacuuming',
                'Deep pre-wash treatment',
                'Premium interior care',
                'Exterior paint correction',
                'Alloy wheel cleaning',
                'Window polishing',
                'Air freshener application',
                'Leather conditioning (if applicable)'
            ],
            popular: true,
            icon: 'fa-crown'
        },
        {
            id: 'standard-valeting',
            name: 'Luxego Standard Valeting',
            price: '£50+',
            description: 'Premium interior details, quick exterior shine',
            features: [
                'Interior vacuuming',
                'Gentle pre-wash',
                'Basic interior care',
                'Exterior wash & dry',
                'Wheel cleaning',
                'Window cleaning',
                'Dashboard polishing'
            ],
            popular: false,
            icon: 'fa-star'
        },
        {
            id: 'regular-maintenance',
            name: 'Luxego Regular Maintenance',
            price: '£30+',
            description: 'Reliable regular cleaning',
            features: [
                'Exterior wash',
                'Quick interior vacuum',
                'Window cleaning',
                'Tire dressing',
                'Air freshener spray'
            ],
            popular: false,
            icon: 'fa-check-circle'
        }
    ];

    const handleBookPackage = (packageId) => {
        // Store the selected package in sessionStorage
        sessionStorage.setItem('selectedPackage', packageId);
        
        // Scroll to booking section
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
            
            // Trigger a custom event to notify the Booking component
            window.dispatchEvent(new CustomEvent('packageSelected', { detail: { packageId } }));
        }
    };

    return (
        <section id="services" className="section">
            <div className="container">
                <h2 className="section-title fade-in">Valeting Packages</h2>
                <p className="section-subtitle fade-in">
                    Choose from our range of premium car detailing packages, designed to meet your specific needs
                </p>
                
                <div className="packages-grid">
                    {packages.map((pkg, index) => (
                        <div 
                            className={`package-card glass-card ${pkg.popular ? 'popular' : ''} ${hoveredPackage === index ? 'hovered' : ''}`}
                            key={index}
                            onMouseEnter={() => setHoveredPackage(index)}
                            onMouseLeave={() => setHoveredPackage(null)}
                        >
                            {pkg.popular && (
                                <div className="popular-badge">
                                    <i className="fas fa-fire"></i> Most Popular
                                </div>
                            )}
                            <div className="package-icon">
                                <i className={`fas ${pkg.icon}`}></i>
                            </div>
                            <h3>{pkg.name}</h3>
                            <div className="price">{pkg.price}</div>
                            <p>{pkg.description}</p>
                            <ul className="features-list">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <i className="fas fa-check"></i>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="package-footer">
                                <button 
                                    className="btn btn-primary btn-full"
                                    onClick={() => handleBookPackage(pkg.id)}
                                >
                                    Book This Package
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <style jsx>{`
                .packages-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 2rem;
                    margin-top: 3rem;
                }
                
                .package-card {
                    padding: 2.5rem 2rem;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s ease;
                    display: flex;
                    flex-direction: column;
                }
                
                .package-card.popular {
                    border-color: var(--accent-gold);
                    transform: scale(1.02);
                }
                
                .package-card.hovered {
                    transform: translateY(-10px) scale(1.02);
                }
                
                .popular-badge {
                    position: absolute;
                    top: 0;
                    right: 20px;
                    background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-dark));
                    color: var(--bg-dark);
                    padding: 8px 20px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .package-icon {
                    font-size: 3rem;
                    color: var(--accent-gold);
                    margin-bottom: 1rem;
                }
                
                .package-card h3 {
                    font-size: 1.6rem;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                }
                
                .price {
                    font-size: 2.8rem;
                    font-weight: 700;
                    color: var(--accent-gold);
                    margin-bottom: 1rem;
                }
                
                .package-card p {
                    color: var(--text-secondary);
                    margin-bottom: 2rem;
                    min-height: 3rem;
                }
                
                .features-list {
                    list-style: none;
                    text-align: left;
                    margin-bottom: 2rem;
                    flex-grow: 1;
                }
                
                .features-list li {
                    display: flex;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                    color: var(--text-secondary);
                    gap: 10px;
                }
                
                .features-list i {
                    color: var(--accent-gold);
                    margin-top: 3px;
                    flex-shrink: 0;
                }
                
                .package-footer {
                    margin-top: auto;
                    padding-top: 1rem;
                }
                
                @media (max-width: 768px) {
                    .packages-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }
                    
                    .package-card {
                        padding: 2rem 1.5rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Packages;