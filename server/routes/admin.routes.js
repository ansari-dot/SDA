import express from 'express';
import { AdminController } from '../controllers/admin.js';
import { authorized } from '../middleware/authMiddleware.js'
import { BookingController } from '../controllers/booking.js';

const router = express.Router();

router.get('/get/company', authorized, AdminController.getCompany);

router.post('/approve/company', authorized, AdminController.approvedCompany);
router.post('/reject/company', authorized, AdminController.notApprovedCompany);
router.post('/delete/company', authorized, AdminController.deleteCompany);

// Get all bookings for hotels managed by the current hotel admin
router.get('/admin/bookings', authorized, BookingController.getAdminBookings);
// Get all unique customers for hotels managed by the current hotel admin
router.get('/admin/customers', authorized, BookingController.getAdminCustomers);

export default router;