const express = require('express');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

// Predefined packages data
const packages = [
    {
        id: 'full-valeting',
        name: 'Luxego Full Valeting',
        price: 80,
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
        duration: '3-4 hours',
        icon: 'fa-crown'
    },
    {
        id: 'standard-valeting',
        name: 'Luxego Standard Valeting',
        price: 50,
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
        duration: '2-3 hours',
        icon: 'fa-star'
    },
    {
        id: 'regular-maintenance',
        name: 'Luxego Regular Maintenance',
        price: 30,
        description: 'Reliable regular cleaning',
        features: [
            'Exterior wash',
            'Quick interior vacuum',
            'Window cleaning',
            'Tire dressing',
            'Air freshener spray'
        ],
        popular: false,
        duration: '1-2 hours',
        icon: 'fa-check-circle'
    }
];

// Get all packages
router.get('/', catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        results: packages.length,
        data: {
            packages
        }
    });
}));

module.exports = router;