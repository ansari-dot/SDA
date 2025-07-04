import express from 'express';
import { PackageController } from '../controllers/package.js';
import { authorized } from '../middleware/authMiddleware.js';
import { uploadSingleImage } from '../middleware/multerMiddleware.js';


const router = express.Router();
// Add package
router.post('/package/add', authorized, uploadSingleImage, PackageController.addPackage);
// Get all packages
router.get('/package/get', PackageController.getPackage);

// Get specific package by type
router.post('/package/type/:id', PackageController.getSpecificPackage);

// Update package
router.patch('/package/update/:id', authorized, uploadSingleImage, PackageController.updatePackage);
// get Owner Package
router.get('/package/getOwnerPackage', authorized, PackageController.getOwnerPackage);
// get Owner delete
router.delete('/package/delete/owner/:id', authorized, PackageController.deleteOwnerPackage);
// to sort package 
router.post('/packages/sort', PackageController.sortPackage);
// to get package according to filter;
router.post('/packages/filter', PackageController.filterPackage);
// Admin: update any package
router.patch('/package/admin/update/:id', authorized, PackageController.adminUpdatePackage);
// Admin: delete any package
router.delete('/package/admin/delete/:id', authorized, PackageController.adminDeletePackage);
// Get all packages as a flat array (for frontend filtering)
router.get('/package/allflat', PackageController.getAllFlatPackages);
export default router;