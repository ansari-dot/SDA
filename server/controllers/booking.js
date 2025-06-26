import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import User from '../models/User.js';

export class BookingController {
  // Get all bookings for hotels managed by the current hotel admin
  static async getAdminBookings(req, res) {
    try {
      const userId = req.user;
      // Find hotels managed by this admin
      const hotels = await Hotel.find({ userId });
      const hotelIds = hotels.map(h => h._id);
      // Find bookings for these hotels
      const bookings = await Booking.find({ hotel: { $in: hotelIds } })
        .populate('customer', 'name email')
        .populate('hotel', 'name')
        .populate('room', 'roomType');
      res.status(200).json({ bookings });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
  }

  // Create a new booking
  static async createBooking(req, res) {
    try {
      const { customer, hotel, room, date, nights, totalPrice, status } = req.body;
      const booking = new Booking({ customer, hotel, room, date, nights, totalPrice, status });
      await booking.save();
      res.status(201).json({ message: 'Booking created', booking });
    } catch (err) {
      res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
  }

  // Update a booking
  static async updateBooking(req, res) {
    try {
      const { id } = req.params;
      const update = req.body;
      const booking = await Booking.findByIdAndUpdate(id, update, { new: true });
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.status(200).json({ message: 'Booking updated', booking });
    } catch (err) {
      res.status(500).json({ message: 'Error updating booking', error: err.message });
    }
  }

  // Delete a booking
  static async deleteBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByIdAndDelete(id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.status(200).json({ message: 'Booking deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting booking', error: err.message });
    }
  }

  // Get all unique customers who have bookings in hotels managed by the current hotel admin
  static async getAdminCustomers(req, res) {
    try {
      const userId = req.user;
      // Find hotels managed by this admin
      const hotels = await Hotel.find({ userId });
      const hotelIds = hotels.map(h => h._id);
      // Find bookings for these hotels
      const bookings = await Booking.find({ hotel: { $in: hotelIds } }).populate('customer', 'name email');
      // Get unique customers
      const customersMap = {};
      bookings.forEach(b => {
        if (b.customer && b.customer._id) {
          customersMap[b.customer._id] = b.customer;
        }
      });
      const customers = Object.values(customersMap);
      res.status(200).json({ customers });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching customers', error: err.message });
    }
  }
} 