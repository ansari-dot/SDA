import mongoose from 'mongoose';

const touristPlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
        type: String,
        required: true
    }],
    bestTimeToVisit: {
        type: String,
        required: true
    },
    activities: [{
        type: String,
        trim: true
    }],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const TouristPlace = mongoose.model('TouristPlace', touristPlaceSchema);
export default TouristPlace;