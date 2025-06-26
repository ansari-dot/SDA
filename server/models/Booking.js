import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'hotel', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Confirmed', 'Pending', 'Cancelled'], default: 'Pending' },
  nights: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking; 