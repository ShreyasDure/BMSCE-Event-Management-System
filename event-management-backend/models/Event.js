const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    trim: true,
    required: [function() { return this.isNew; }, 'Event category is required']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(value) {
        // Ensure event date is in the future
        return value > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  registrationDeadline: {
    type: Date,
    required: [function() { return this.isNew; }, 'Registration deadline is required'],
    validate: {
      validator: function(value) {
        if (!this.date) return true;
        return value < this.date;
      },
      message: 'Registration deadline must be before the event date'
    }
  },
  specialInstructions: {
    type: String,
    trim: true,
    maxlength: [1000, 'Special instructions cannot exceed 1000 characters'],
    default: ''
  },
  bannerImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for registration count
eventSchema.virtual('registrationCount', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'event',
  count: true
});

// Index for faster queries
eventSchema.index({ date: 1 });
eventSchema.index({ registrationDeadline: 1 });
eventSchema.index({ organizer: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ venue: 1 });
eventSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Event', eventSchema);