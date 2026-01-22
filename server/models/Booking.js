const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A booking must have a name'],
        trim: true,
        maxlength: [50, 'A name must have less or equal than 50 characters']
    },
    phone: {
        type: String,
        required: [true, 'A booking must have a phone number'],
        trim: true,
        validate: {
            validator: function(v) {
                return /^[\d\s\-\+\(\)]+$/.test(v);
            },
            message: 'Please provide a valid phone number'
        }
    },
    email: {
        type: String,
        required: [true, 'A booking must have an email'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please provide a valid email'
        }
    },
    vehicle: {
        type: String,
        required: [true, 'A booking must have vehicle details'],
        trim: true,
        maxlength: [100, 'Vehicle details must have less or equal than 100 characters']
    },
    package: {
        type: String,
        required: [true, 'A booking must have a package selected'],
        enum: {
            values: ['full-valeting', 'standard-valeting', 'regular-maintenance'],
            message: 'Package must be either: full-valeting, standard-valeting, or regular-maintenance'
        }
    },
    address: {
        type: String,
        required: [true, 'A booking must have an address'],
        trim: true,
        maxlength: [200, 'Address must have less or equal than 200 characters']
    },
    specialRequests: {
        type: String,
        trim: true,
        maxlength: [500, 'Special requests must have less or equal than 500 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    appointmentDate: {
        type: Date,
        default: Date.now
    },
    completedDate: Date,
    price: {
        type: Number,
        min: 0
    },
    addOns: [{
        name: String,
        price: Number
    }],
    notes: {
        type: String,
        trim: true,
        maxlength: [1000, 'Notes must have less or equal than 1000 characters']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for better query performance
bookingSchema.index({ email: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ appointmentDate: 1 });

// Virtual for formatted appointment date
bookingSchema.virtual('formattedDate').get(function() {
    return this.appointmentDate.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Pre-save middleware to set price based on package
bookingSchema.pre('save', function(next) {
    const packagePrices = {
        'full-valeting': 80,
        'standard-valeting': 50,
        'regular-maintenance': 30
    };
    
    if (this.isNew && !this.price) {
        this.price = packagePrices[this.package] || 0;
        
        // Add add-on prices
        if (this.addOns && this.addOns.length > 0) {
            this.price += this.addOns.reduce((total, addOn) => total + (addOn.price || 0), 0);
        }
    }
    
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;