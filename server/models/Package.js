import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
    packageType: {
        type: String,
        enum: ['Luxury', 'Family', 'Customized'],
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    TravelData: {
        type: String,
        required: true,
    },
});

const packageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    package: [typeSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

export default Package;