import express from 'express';
import { TourBookingController } from '../controllers/tourBooking.js';
import { authorized } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create booking
router.post('/tourbooking', authorized, TourBookingController.createBooking);
// Get all bookings for TourAdmin
router.get('/tourbooking', authorized, TourBookingController.getTourAdminBookings);
// Delete booking
router.delete('/tourbooking/:id', authorized, TourBookingController.deleteBooking);
// Admin: get all tour bookings
router.get('/tourbooking/all', authorized, TourBookingController.getAllTourBookings);

export default router; 