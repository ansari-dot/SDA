import Payment from '../models/Payment.js';
import User from '../models/User.js';

export class PaymentController {
  // Create a new payment
  static async createPayment(req, res) {
    try {
      const { amount, payer, payee, type, reference } = req.body;
      const payment = new Payment({ amount, payer, payee, type, reference });
      await payment.save();
      res.status(201).json({ message: 'Payment created', payment });
    } catch (err) {
      res.status(500).json({ message: 'Error creating payment', error: err.message });
    }
  }

  // Get all payments
  static async getAllPayments(req, res) {
    try {
      const payments = await Payment.find().populate('payer', 'name email').populate('payee', 'name email');
      res.status(200).json({ payments });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching payments', error: err.message });
    }
  }

  // Update payment status
  static async updatePaymentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      res.status(200).json({ message: 'Payment status updated', payment });
    } catch (err) {
      res.status(500).json({ message: 'Error updating payment', error: err.message });
    }
  }

  // Delete a payment
  static async deletePayment(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.findByIdAndDelete(id);
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      res.status(200).json({ message: 'Payment deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting payment', error: err.message });
    }
  }
} 