import React from 'react';
import './Vision.css';

const Vision = () => {
    const visionPoints = [
        {
            icon: 'fa-tint-slash',
            title: 'Waterless Wash',
            description: 'Our revolutionary waterless technology significantly reduces water consumption while delivering exceptional cleaning results.',
            color: '#3498db'
        },
        {
            icon: 'fa-solar-panel',
            title: 'Solar Powered',
            description: 'We utilize solar-powered equipment to minimize our carbon footprint and environmental impact.',
            color: '#f39c12'
        },
        {
            icon: 'fa-leaf',
            title: 'Eco-Friendly Products',
            description: 'All our cleaning products are biodegradable and environmentally safe, without compromising on quality.',
            color: '#27ae60'
        },
        {
            icon: 'fa-recycle',
            title: 'Sustainable Future',
            description: 'We are committed to continuous improvement in our sustainability practices for a greener future.',
            color: '#16a085'
        }
    ];

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title fade-in">Driving Towards Sustainability</h2>
                <p className="section-subtitle fade-in">
                    At Luxego Auto Spa, we're committed to protecting the environment while delivering premium car detailing services. 
                    Our sustainable approach includes waterless technology and solar-powered equipment to reduce our ecological footprint.
                </p>
                
                <div className="vision-grid">
                    {visionPoints.map((point, index) => (
                        <div className="vision-card glass-card fade-in" key={index}>
                            <div className="vision-icon" style={{ color: point.color }}>
                                <i className={`fas ${point.icon}`}></i>
                            </div>
                            <h3>{point.title}</h3>
                            <p>{point.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vision;