import { User } from "../controllers/user.js";
import express from 'express';
import { authorized } from "../middleware/authMiddleware.js";

const router = express.Router();
const userController = new User();
// for verfiy
router.post('/user/register', (req, res) => userController.register(req, res));
router.post('/user/login', (req, res) => userController.login(req, res));

// for update user profile
router.patch('/user/update', authorized, (req, res) => userController.updateProfile(req, res));
router.get('/logout', (req, res) => userController.logout(req, res));

// to reset 
router.post('/user/sentOtp', (req, res) => userController.sentOtp(req, res));
router.post('/user/verifyOtp', (req, res) => userController.verifyOtp(req, res));
router.post('/user/resetPassword', (req, res) => userController.resetPassword(req, res));

// List all users (admin only)
router.get('/user/all', authorized, (req, res) => userController.listUsers(req, res));
// Delete a user (admin only)
router.delete('/user/:id', authorized, (req, res) => userController.deleteUser(req, res));

export default router;