import express from 'express';
import { PaymentController } from '../controllers/payment.js';
import { authorized } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create payment
router.post('/payment', authorized, PaymentController.createPayment);
// Get all payments
router.get('/payment', authorized, PaymentController.getAllPayments);
// Update payment status
router.patch('/payment/:id/status', authorized, PaymentController.updatePaymentStatus);
// Delete payment
router.delete('/payment/:id', authorized, PaymentController.deletePayment);

export default router; 