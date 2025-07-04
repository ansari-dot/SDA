import mongoose from 'mongoose';

const TourBookingSchema = new mongoose.Schema({
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('TourBooking', TourBookingSchema); 