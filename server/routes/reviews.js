const express = require('express');
const Review = require('../models/Review');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const router = express.Router();

// Get all approved reviews (public)
router.get('/', catchAsync(async (req, res, next) => {
    let query = { approved: true };
    
    // Filter by rating
    if (req.query.rating) {
        query.rating = parseInt(req.query.rating);
    }
    
    // Sort options
    let sort = '-createdAt';
    if (req.query.sort === 'rating') {
        sort = '-rating createdAt';
    }
    
    // Limit for featured reviews
    if (req.query.featured === 'true') {
        query.featured = true;
    }
    
    const reviews = await Review.find(query)
        .sort(sort)
        .limit(req.query.limit * 1 || 10);
    
    // Get average rating
    const { avgRating, totalRatings } = await Review.getAverageRating();
    
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        averageRating: avgRating,
        totalRatings,
        data: {
            reviews
        }
    });
}));

// Create a new review
router.post('/', catchAsync(async (req, res, next) => {
    // Check if user already reviewed in the last 30 days
    const existingReview = await Review.findOne({
        email: req.body.email,
        createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
    });
    
    if (existingReview) {
        return next(new AppError('You can only submit one review per 30 days', 400));
    }
    
    const newReview = await Review.create(req.body);
    
    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
}));
// Get all reviews (including unapproved) for admin
router.get('/admin/all', catchAsync(async (req, res, next) => {
    const reviews = await Review.find({ admin: true })
        .sort('-createdAt');
    
    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data: {
            reviews
        }
    });
}));

// Approve a review
router.patch('/:id/approve', catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(
        req.params.id,
        { approved: true },
        { new: true, runValidators: true }
    );
    
    if (!review) {
        return next(new AppError('No review found with that ID', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
}));

// Feature a review
router.patch('/:id/feature', catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(
        req.params.id,
        { featured: req.body.featured },
        { new: true, runValidators: true }
    );
    
    if (!review) {
        return next(new AppError('No review found with that ID', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
}));

// Respond to a review
router.patch('/:id/respond', catchAsync(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(
        req.params.id,
        {
            response: {
                text: req.body.response,
                date: new Date(),
                respondedBy: req.body.respondedBy || 'Luxego Team'
            }
        },
        { new: true, runValidators: true }
    );
    
    if (!review) {
        return next(new AppError('No review found with that ID', 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
}));

// Get review statistics
router.get('/stats/summary', catchAsync(async (req, res, next) => {
    const stats = await Review.aggregate([
        {
            $match: { approved: true }
        },
        {
            $group: {
                _id: null,
                avgRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 },
                ratingDistribution: {
                    $push: '$rating'
                }
            }
        }
    ]);
    
    // Calculate rating distribution
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    if (stats.length > 0) {
        stats[0].ratingDistribution.forEach(rating => {
            distribution[Math.floor(rating)]++;
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            averageRating: stats.length > 0 ? stats[0].avgRating : 0,
            totalReviews: stats.length > 0 ? stats[0].totalReviews : 0,
            distribution
        }
    });
}));

module.exports = router;
