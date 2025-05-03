import HotelModel from '../models/Hotel.js'
import UserModel from '../models/User.js';
export class Hotel {
    // the method use to add hotels
    async addHotel(req, res) {
        const user_id = req.user;
        try {
            const user = await UserModel.findById(user_id);
            if (!user || user.role !== "HotelManager") {
                return res.status(401).json({ message: "You are not authorized to perform this action" });
            }

            const imagePaths = req.files.map(file => file.path);

            const newHotel = await HotelModel.create({
                name: req.body.name,
                manager: user_id,
                location: req.body.location,
                description: req.body.description,
                facilities: req.body.facilities,
                images: imagePaths,
                rooms: req.body.rooms,
            });

            return res.status(201).json({ message: "Hotel created successfully", newHotel });
        } catch (err) {
            console.error("Error adding hotel:", err);
            return res.status(500).json({ message: "Failed to add hotel" });
        }
    }

    // the method use to get all hotels
    async getHotelsByRoomPrice(req, res) {
            try {
                const minPrice = Number(req.query.minPrice);
                const maxPrice = Number(req.query.maxPrice);

                const hotels = await HotelModel.find({
                    rooms: {
                        $elemMatch: {
                            pricePerNight: { $gte: minPrice, $lte: maxPrice }
                        }
                    }
                });

                return res.status(200).json({
                    message: "Hotels with rooms in the specified price range retrieved successfully",
                    hotels
                });

            } catch (err) {
                console.error("Error getting hotels by room price:", err);
                return res.status(500).json({ message: "Failed to get hotels by room price" });
            }
        }
        // the method to update the hotel price;
    async updateHotelPrice(req, res) {
            try {
                const hotelId = req.params.hotelId;
                const user_id = req.user;
                const { RoomType, newPrice } = req.body;

                // Find user and check role
                const user = await UserModel.findById(user_id);
                if (!user || user.role !== "HotelManager") {
                    return res.status(401).json({ message: "Unauthorized to update hotel price" });
                }
                const Rooms = await HotelModel.rooms.finds((roomType) => roomType == RoomType);
                if (!Rooms) {
                    return res.status(404).json({ message: "Room not found" });
                }
                const hotel = await HotelModel.findByIdAndUpdate(hotelId, {
                    $set: {
                        "rooms.$.pricePerNight": newPrice
                    }
                }, { new: true });
                await hotel.save();
                return res.status(200).json({
                    message: "Hotel price updated successfully",
                    hotel
                });


            } catch (err) {
                console.error("Error updating hotel price:", err);
                return res.status(500).json({ message: "Failed to update hotel price" });
            }
        }
        // the method to get the hotel by id;
    async getHotelById(req, res) {
            const hotelId = req.params.id;

            try {
                const hotel = await HotelModel.findById(hotelId);

                if (!hotel) {
                    return res.status(404).json({ message: "Hotel not found" });
                }

                return res.status(200).json({ message: "Hotel retrieved successfully", hotel });
            } catch (err) {
                console.error("Error getting hotel by id:", err);
                return res.status(500).json({ message: "Failed to get hotel by id" });
            }
        }
        //the method to delete the hotels
    async deleteHotel(req, res) {
        const hotelId = req.params.id;
        const userid = req.user;
        try {
            const user = await UserModel.findById(userid);
            if (!user || user.role !== "HotelManager") {
                return res.status(401).json({ message: "Unauthorized to delete hotel" });
            }
            const hotel = await HotelModel.findByIdAndDelete(hotelId);
            if (!hotel) {
                return res.status(404).json({ message: "Hotel not found" });
            }
            return res.status(200).json({ message: "Hotel deleted successfully" });
        } catch (err) {
            console.error("Error deleting hotel:", err);
            return res.status(500).json({ message: "Failed to delete hotel" });
        }
    }
}