import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
}, { timestamps: true });

export default mongoose.model('User', UserSchema);