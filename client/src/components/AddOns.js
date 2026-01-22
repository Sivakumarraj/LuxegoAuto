import React from 'react';
import './AddOns.css';

const AddOns = () => {
    const addOns = [
        { service: 'Engine Bay Cleaning', s: '£10', m: '£15', l: '£20', icon: 'fa-engine-warning' },
        { service: 'Heavily Soiled Areas', s: '£15', m: '£20', l: '£25', icon: 'fa-soap' },
        { service: 'Interior Ceiling', s: '£10', m: '£15', l: '£20', icon: 'fa-car' },
        { service: 'Pet Hair Removal', s: '£10', m: '£15', l: '£20', icon: 'fa-paw' },
        { service: 'Odor Elimination', s: '£15', m: '£20', l: '£25', icon: 'fa-spray-can' }
    ];

    return (
        <section className="section bg-dark">
            <div className="container">
                <h2 className="section-title fade-in">Add-Ons</h2>
                <p className="section-subtitle fade-in">
                    Enhance your car detailing service with these additional options
                </p>
                
                <div className="addons-table-container glass-card fade-in">
                    <table className="addons-table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Small</th>
                                <th>Medium</th>
                                <th>Large</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addOns.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <i className={`fas ${item.icon}`}></i>
                                        {item.service}
                                    </td>
                                    <td>{item.s}</td>
                                    <td>{item.m}</td>
                                    <td>{item.l}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AddOns;