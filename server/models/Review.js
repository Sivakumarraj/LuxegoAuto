const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A review must have a name'],
        trim: true,
        maxlength: [50, 'A name must have less or equal than 50 characters']
    },
    rating: {
        type: Number,
        required: [true, 'A review must have a rating'],
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 // Round to 1 decimal place
    },
    text: {
        type: String,
        required: [true, 'A review must have text'],
        trim: true,
        maxlength: [1000, 'Review text must have less or equal than 1000 characters']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please provide a valid email'
        }
    },
    approved: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking'
    },
    response: {
        text: String,
        date: Date,
        respondedBy: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for better query performance
reviewSchema.index({ approved: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ featured: 1, approved: 1 });

// Virtual for formatted date
reviewSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Static method to calculate average rating
reviewSchema.statics.getAverageRating = async function() {
    const stats = await this.aggregate([
        {
            $match: { approved: true }
        },
        {
            $group: {
                _id: '$rating',
                nRating: { $sum: 1 }
            }
        }
    ]);

    if (stats.length > 0) {
        const totalRatings = stats.reduce((acc, curr) => acc + curr.nRating, 0);
        const avgRating = stats.reduce((acc, curr) => acc + curr._id * curr.nRating, 0) / totalRatings;
        return { avgRating, totalRatings };
    }
    
    return { avgRating: 0, totalRatings: 0 };
};

// Pre-find middleware to only return approved reviews
reviewSchema.pre(/^find/, function(next) {
    // Only filter out non-approved reviews for public queries
    if (!this.getQuery().admin) {
        this.find({ approved: true });
    }
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;