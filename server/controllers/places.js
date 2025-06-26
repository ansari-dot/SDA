import TouristPlace from "../models/Places.js";
import User from '../models/User.js'
export class Places {
    // to add all the places
    async addPlaces(req, res) {
            const { location, placeName, description, fullDetails, image, rating, bestTime, review } = req.body
            const userid = req.user;

            try {
                const user = await User.findById(userid);
                if (!user || user.role !== "Admin") {
                    return res.status(403).json({ message: "You are not authorized to add places" });
                }

                const imagePaths = req.files.map(file => file.path);

                const newPlace = new TouristPlace({
                    placeName,
                    location,
                    description,
                    fullDetails,
                    image: imagePaths,
                    rating,
                    bestTime,
                    review,
                    user: userid
                });


                await newPlace.save();

                res.status(201).json({ message: "Place added successfully", place: newPlace });

            } catch (err) {
                console.log("Error adding tourist place:", err);
                res.status(500).json({ message: "Failed to add place" });
            }
        }
        // to get all the places
    async getPlaces(req, res) {
            try {
                const packages = await TouristPlace.find();
                res.status(200).json(packages);
            } catch (err) {
                console.log("Error fetching places:", err);
                res.status(500).json({ message: "Failed to fetch places" });
            }
        }
        // to delete the places
    async deletePlaces(req, res) {
        const userid = req.user;
        const id = req.params.id;
        try {
            const user = await User.findById(userid);
            if (!user || user.role != "Admin") {
                return res.status(403).json({ message: "You are not authorized to delete places" });
            }
            const place = await TouristPlace.findByIdAndDelete(id);
            if (!place) {
                return res.status(404).json({ message: "Place not found" });
            }
        } catch (err) {
            console.log("Error deleting place:", err);
            res.status(500).json({ message: "Failed to delete place" });
        }

    }

}