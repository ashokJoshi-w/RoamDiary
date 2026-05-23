const mongoose = require('mongoose');

const travelStorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    visitedLocations: {
        type: [String],
        required: true
    },
    visitedDate: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        default: null
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('TravelStory', travelStorySchema);