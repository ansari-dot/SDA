import express from 'express';
import { uploadMultipleImages } from '../middleware/multerMiddleware.js'
import { Hotel } from "../controllers/hotel.js";
import { authorized } from '../middleware/authMiddleware.js';
const router = express.Router();

const hotel = new Hotel();
// add  hotel route
router.post('/hotel/add', authorized, uploadMultipleImages, (req, res) => hotel.addHotel(req, res));
// get all the hotel route
router.get('hotel/get', (req, res) => hotel.getAllHotels(req, res));
// get hotel room by price limit
router.get('/hotel/price', (req, res) => hotel.getHotelsByRoomPrice(req, res));
// to update the hotel room price
router.post('/hotel/price/update/:id', authorized, (req, res) => hotel.updateHotelPrice(req, res));
// to delete the hotel room
router.post('/hotel/delete', authorized, (req, res) => hotel.deleteHotel((req, res)));
export default router;