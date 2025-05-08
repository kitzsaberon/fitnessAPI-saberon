const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'UserId is Required'],
      index: true
    },
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    duration: {
        type: Number, //duration in minutes
        required: [true, 'Duration is Required'],
        min: [1, 'Duration must be at least 1 minute'],
        validate: {
            validator: v => v > 0,
            message: 'Duration must be a positive number.'
        }
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'skipped'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Workout', workoutSchema);