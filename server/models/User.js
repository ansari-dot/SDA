import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Customer', 'TourManager', 'HotelManager'],
        default: 'Customer'
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    notifications: [
        {
            message: { type: String, required: true },
            type: { type: String, enum: ['info', 'success', 'error'], default: 'info' },
            date: { type: Date, default: Date.now },
        }
    ],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);