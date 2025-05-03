import express from 'express';
import { PackageController } from '../controllers/package.js';
import { authorized } from '../middleware/authMiddleware.js';
import { uploadSingleImage } from '../middleware/multerMiddleware.js';
const router = express.Router();
const Package = new PackageController()
    // the route to add the package;
router.post('/package/add', authorized, uploadSingleImage, (req, res) => Package.addPackage(req, res));
// the route to get all the package
router.get('/package/get', (req, res) => Package.getPackage(req, res));
// the route to get specific package when search to 
router.post('/package/type/:id', (req, res) => Package.getSpecificPackage(req, res));
// the route to update the package 
router.patch('/package/update/:id', authorized, uploadSingleImage, (req, res) => Package.updatePackage(req, res));
export default router;