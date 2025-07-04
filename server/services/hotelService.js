import Hotel from '../models/Hotel.js';
import User from '../models/User.js';
import Company from '../models/CompanyVerfication.js';
import Room from '../models/Room.js';

class HotelService {
  static async addHotel({ userId, name, location, rating, facilities, imagePaths, description }) {
    if (!name || !location || !rating) {
      throw new Error('Please fill all the fields');
    }
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const company = await Company.findOne({ User: userId });
    if (!company) throw new Error('Company not found, please add company first');
    if (company.verificationStatus === 'pending') throw new Error('Company verification pending, please verify company first');
    if (company.verificationStatus === 'rejected') throw new Error('Company verification rejected, please reapply for verification');
    if (typeof facilities === 'string') facilities = facilities.split(',');
    const hotel = new Hotel({ userId, name, location, rating, facilities: facilities || [], images: imagePaths, description });
    await hotel.save();
    return hotel;
  }

  static async getAllHotels({ page = 1, limit = 9, location = '', rating = null, price = null, sort = '' }) {
    const skip = (page - 1) * limit;
    // Build match conditions
    const match = {};
    if (location) {
      match.location = { $regex: location, $options: 'i' };
    }
    if (rating) {
      match.rating = { $gte: rating };
    }

    // Aggregation pipeline
    let pipeline = [
      { $match: match },
      // Lookup rooms for price filtering and min price
      {
        $lookup: {
          from: 'rooms',
          localField: '_id',
          foreignField: 'hotelId',
          as: 'rooms',
        },
      },
      // Add minRoomPrice field
      {
        $addFields: {
          minRoomPrice: { $min: '$rooms.pricePerNight' },
        },
      },
    ];

    // Price filter (hotels with at least one room <= price)
    if (price) {
      pipeline.push({ $match: { minRoomPrice: { $lte: price } } });
    }

    // Sorting
    if (sort === 'price-low-high') {
      pipeline.push({ $sort: { minRoomPrice: 1 } });
    } else if (sort === 'price-high-low') {
      pipeline.push({ $sort: { minRoomPrice: -1 } });
    } else if (sort === 'rating-high-low') {
      pipeline.push({ $sort: { rating: -1 } });
    } else if (sort === 'rating-low-high') {
      pipeline.push({ $sort: { rating: 1 } });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } }); // Default: newest first
    }

    // Pagination
    pipeline.push({ $skip: skip }, { $limit: limit });

    // Get total count for pagination (without skip/limit)
    const countPipeline = pipeline.filter(
      stage => !('$skip' in stage) && !('$limit' in stage)
    );
    countPipeline.push({ $count: 'total' });

    const [hotels, totalResult] = await Promise.all([
      Hotel.aggregate(pipeline),
      Hotel.aggregate(countPipeline),
    ]);
    const total = totalResult[0]?.total || 0;
    return {
      hotels,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalHotels: total,
    };
  }

  static async getHotelDetail(hotelId) {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) throw new Error('Hotel not found');
    const rooms = await Room.find({ hotelId });
    return { hotel, rooms };
  }

  static async getHotelsByUser(userId) {
    return await Hotel.find({ userId });
  }

  static async getRoomsByHotel(userId, hotelId) {
    const hotel = await Hotel.findOne({ _id: hotelId, userId });
    if (!hotel) throw new Error('Hotel not found or not authorized');
    return await Room.find({ hotelId });
  }

  static async deleteHotel(userId, hotelId) {
    const hotel = await Hotel.findOne({ _id: hotelId, userId });
    if (!hotel) throw new Error('Hotel not found or not authorized');
    await Room.deleteMany({ hotelId });
    await Hotel.findByIdAndDelete(hotelId);
    return true;
  }

  static async deleteRoom(userId, hotelId, roomId) {
    const hotel = await Hotel.findOne({ _id: hotelId, userId });
    if (!hotel) throw new Error('Hotel not found or not authorized');
    const room = await Room.findOne({ _id: roomId, hotelId });
    if (!room) throw new Error('Room not found');
    await Room.findByIdAndDelete(roomId);
    return true;
  }

  static async addRoom(userId, hotelId, roomData, imagePaths) {
    const hotel = await Hotel.findOne({ _id: hotelId, userId });
    if (!hotel) throw new Error('Hotel not found or not authorized');
    const room = new Room({ ...roomData, hotelId, images: imagePaths });
    await room.save();
    return room;
  }

  static async updateHotel(userId, hotelId, update) {
    const hotel = await Hotel.findOne({ _id: hotelId, userId });
    if (!hotel) throw new Error('Hotel not found or not authorized');
    Object.keys(update).forEach(key => {
      hotel[key] = update[key];
    });
    await hotel.save();
    return hotel;
  }
}

export default HotelService; 