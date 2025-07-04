import TourBooking from '../models/TourBooking.js';

export class TourBookingController {
  // Create a new booking
  static async createBooking(req, res) {
    try {
      const { packageId, customerName, customerEmail, numberOfPeople, date } = req.body;
      const userId = req.user;
      const booking = new TourBooking({ packageId, userId, customerName, customerEmail, numberOfPeople, date });
      await booking.save();
      res.status(201).json({ message: 'Booking created', booking });
    } catch (err) {
      res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
  }

  // Get all bookings for a TourAdmin's packages
  static async getTourAdminBookings(req, res) {
    try {
      const userId = req.user;
      const bookings = await TourBooking.find({ userId }).populate('packageId');
      res.status(200).json({ bookings });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
  }

  // Delete a booking
  static async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await TourBooking.findByIdAndDelete(id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.status(200).json({ message: 'Booking deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting booking', error: err.message });
    }
  }

  // Get all tour bookings
  static async getAllTourBookings(req, res) {
    try {
      const bookings = await TourBooking.find().populate('packageId userId');
      res.status(200).json({ bookings });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching all tour bookings', error: err.message });
    }
  }
} 