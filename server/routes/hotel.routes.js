import express from 'express';
import { uploadMultipleImages } from '../middleware/multerMiddleware.js';
import { HotelController } from '../controllers/hotelController.js';
import { authorized } from '../middleware/authMiddleware.js';
import { validateHotel } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Use static methods directly on HotelController
router.post('/hotel/add', authorized, uploadMultipleImages, validateHotel, HotelController.addHotel);
router.get('/get/allhotel', HotelController.getAllHotel);
router.get('/get/hoteldetail/:hotelId', HotelController.getHotelDetail);

// for hoteladmin
router.get('/get/hotel', authorized, HotelController.getHotel);
router.get('/get/rooms/:hotelId', authorized, HotelController.getRoom);
router.delete('/hotel/:id', authorized, HotelController.deleteHotel);
router.delete('/hotel/:hotelId/room/:roomId', authorized, HotelController.deleteRoom);
router.post('/hotel/:hotelId/room', authorized, uploadMultipleImages, HotelController.addRoom);

export default router;