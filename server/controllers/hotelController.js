import HotelService from '../services/hotelService.js';
import { handleError } from '../utils/errorHandler.js';

export class HotelController {
  static async addHotel(req, res, next) {
    try {
      const { name, location, rating, facilities, description } = req.body;
      const userId = req.user;
      const imagePaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];
      const hotel = await HotelService.addHotel({ userId, name, location, rating, facilities, imagePaths, description });
      res.status(201).json({ message: 'Hotel added successfully', hotel });
    } catch (err) {
      next(err);
    }
  }

  static async getAllHotel(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 9;
      const location = req.query.location || '';
      const rating = req.query.rating ? parseFloat(req.query.rating) : null;
      const price = req.query.price ? parseFloat(req.query.price) : null;
      const sort = req.query.sort || '';
      const result = await HotelService.getAllHotels({ page, limit, location, rating, price, sort });
      res.status(200).json({ message: 'Hotels found', ...result });
    } catch (err) {
      next(err);
    }
  }

  static async getHotelDetail(req, res, next) {
    try {
      const { hotelId } = req.params;
      const result = await HotelService.getHotelDetail(hotelId);
      res.status(200).json({ message: 'Hotel detail found', ...result });
    } catch (err) {
      next(err);
    }
  }

  static async getHotel(req, res, next) {
    try {
      const userId = req.user._id || req.user;
      const hotels = await HotelService.getHotelsByUser(userId);
      res.status(200).json({ hotels });
    } catch (err) {
      next(err);
    }
  }

  static async getRoom(req, res, next) {
    try {
      const userId = req.user._id || req.user;
      const { hotelId } = req.params;
      const rooms = await HotelService.getRoomsByHotel(userId, hotelId);
      res.status(200).json({ rooms });
    } catch (err) {
      next(err);
    }
  }

  static async deleteHotel(req, res, next) {
    try {
      const userId = req.user;
      const { id } = req.params;
      await HotelService.deleteHotel(userId, id);
      res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (err) {
      next(err);
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      const userId = req.user;
      const { hotelId, roomId } = req.params;
      await HotelService.deleteRoom(userId, hotelId, roomId);
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (err) {
      next(err);
    }
  }

  static async addRoom(req, res, next) {
    try {
      const userId = req.user;
      const { hotelId } = req.params;
      const roomData = req.body;
      const imagePaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];
      const room = await HotelService.addRoom(userId, hotelId, roomData, imagePaths);
      res.status(201).json({ message: 'Room added successfully', room });
    } catch (err) {
      next(err);
    }
  }
} 