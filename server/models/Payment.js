import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  payee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['hotel', 'tour'], required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  reference: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Payment', PaymentSchema); 