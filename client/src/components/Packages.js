import React, { useState } from 'react';
import './Packages.css';

const Packages = () => {
    const [hoveredPackage, setHoveredPackage] = useState(null);

    const packages = [
        {
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

    return (
        <section className="section" id="services">
            <div className="container">
                <h2 className="section-title fade-in">Valeting Packages</h2>
                <p className="section-subtitle fade-in">
                    Choose from our range of premium car detailing packages, designed to meet your specific needs
                </p>
                
                <div className="packages-grid">
                    {packages.map((pkg, index) => (
                        <div 
                            className={`package-card ${pkg.popular ? 'popular' : ''} ${hoveredPackage === index ? 'hovered' : ''}`}
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
                            <button className="btn btn-primary btn-full">
                                Book This Package
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;