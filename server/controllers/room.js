import Room from '../models/Room.js';
import User from '../models/User.js';
import Hotel from '../models/Hotel.js';

export class RoomController {
    async addRoom(req, res) {
            const {
                roomType,
                pricePerNight,
                numberOfGuest,
                numberOfBeds,
                description
            } = req.body;

            const userId = req.user;
            const hotelId = req.params.hotelId;

            try {
                if (!roomType || !pricePerNight || !numberOfGuest || !numberOfBeds || !description) {
                    return res.status(400).json({ error: 'All fields are required' });
                }


                const user = await User.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                const hotel = await Hotel.findById(hotelId);
                if (!hotel) {
                    return res.status(404).json({ message: "Hotel not found" });
                }

                const room = await Room.create({
                    roomType,
                    pricePerNight,
                    numberOfGuest,
                    numberOfBeds,
                    description,
                    hotelId: hotelId,
                    userId: userId,
                    image: req.file.path
                });


                res.status(201).json({
                    message: "Room created successfully",
                    room
                });

            } catch (err) {
                console.error(err);
                res.status(500).json({
                    message: "Error creating room",
                    error: err.message
                });
            }
        }
        // Async function to get all rooms for a specific hotel
    static async getRoom(req, res) {
        const userId = req.user;
        const hotelId = req.params.hotelId;
        try {
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const existingHotel = await Hotel.findById(hotelId);
            if (!existingHotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }

            const rooms = await Room.find({ hotelId: hotelId });
            res.status(200).json({ rooms });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error getting rooms",
                error: err.message,
            });
        }
    }

    static async updateRoom(req, res) {
        try {
            const roomId = req.params.roomId;
            const userId = req.user;
            const update = req.body;
            const room = await Room.findOneAndUpdate({ _id: roomId, userId }, update, { new: true });
            if (!room) return res.status(404).json({ message: 'Room not found or not authorized' });
            res.status(200).json({ message: 'Room updated', room });
        } catch (err) {
            res.status(500).json({ message: 'Error updating room', error: err.message });
        }
    }
}