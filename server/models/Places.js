import mongoose from 'mongoose';

const touristPlaceSchema = new mongoose.Schema({
    placeName: {
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
    fullDetails: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    bestTime: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const TouristPlace = mongoose.model('TouristPlace', touristPlaceSchema);
export default TouristPlace;