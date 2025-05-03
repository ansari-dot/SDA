import PackageModel from "../models/Package.js";
import User from "../models/User.js";

export class PackageController {
    // this is used to add package 
    async addPackage(req, res) {
        const { packageType, price, description, image, TravelDate } = req.body;
        const user_id = req.user;

        try {
            const user = await User.findById(user_id);
            if (!user || user.role !== 'TourManager') {
                return res.status(400).json({ message: "You are not authorized to perform this action" });
            }

            const newPackage = new PackageModel({
                user: user_id,
                package: []
            });
            const imagePaths = req.files.map(file => file.path);
            newPackage.package.push({ packageType, price, description, image: imagePaths, TravelDate })
            await newPackage.save();

            return res.status(201).json({ message: "Package created successfully", newPackage });

        } catch (err) {
            return res.status(500).json({ message: "Error creating package", error: err.message });
        }
    }

    // this is used to display all the package from database;
    async getPackage(req, res) {
            try {
                const Packages = await PackageModel.find();
                return res.status(200).json({ Packages });
            } catch (err) {
                return res.status(500).json({ message: "Error fetching package", error: err.message });
            }
        }
        // this is used to find the package based on category
    async getSpecificPackage(req, res) {
            const { packageType } = req.body;
            const package_id = req.params.id;

            try {
                const foundPackage = await PackageModel.findById(package_id);
                if (!foundPackage) {
                    return res.status(404).json({ message: "Package not found" });
                }

                const filteredPackages = foundPackage.package.filter(pkg => pkg.package === packageType);

                return res.status(200).json({ packages: filteredPackages });
            } catch (err) {
                console.error("Error getting specific package:", err);
                return res.status(500).json({ message: "Failed to get specific package" });
            }
        }
        // update price of package 
    async updatePackage(req, res) {
        const { price } = req.body;
        const userid = req.user;
        const id = req.params.id;
        try {
            const user = await User.findById(userid);
            if (!user || user.role == 'PackageManager') {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const packages = await PackageModel.findById(id);
            if (!packages) {
                return res.status(404).json({ message: "Package not found" });
            }
            packages.price = price;
            await packages.save();
            return res.status(200).json({ message: "Package updated successfully" }, packages);

        } catch (err) {
            console.error("Error updating package:", err);
        }

    }

}