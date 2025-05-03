import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendOtpEmail } from '../services/mailMiddleware.js';
export class User {

    // A method that is used to register user
    async register(req, res) {
            const { name, email, password, role, gender } = req.body;

            if (!name || !email || !password || !role || !gender) {
                return res.status(400).json({
                    message: 'Please fill in all fields'
                });
            }

            try {
                const existingUser = await UserModel.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({
                        message: "User already exists"
                    });
                }
                const saltRounds = 10;
                const hashPassword = await bcrypt.hash(password, saltRounds);
                // for profile photo
                // For profile photo
                const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${name}`;
                const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${name}`;
                const profilePhoto = gender === 'male' ? maleProfile : femaleProfile;

                const newUser = new UserModel({
                    name,
                    email,
                    gender,
                    password: hashPassword,
                    profilePhoto,
                    role,
                });

                await newUser.save();

                return res.status(201).json({
                    message: 'User registered successfully',
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role,
                        profilePhoto: profilePhoto
                    }
                });

            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: 'Something went wrong while registering'
                });
            }
        }
        // a method that is used to login the user
    async login(req, res) {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Please fill in all fields'
                });
            }

            const existingUser = await UserModel.findOne({ email });

            if (!existingUser) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            const isValidPassword = await bcrypt.compare(password, existingUser.password);

            if (!isValidPassword) {
                return res.status(400).json({
                    message: 'Invalid password'
                });
            }

            const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }).json({
                message: "user login successfully",
                user: {
                    id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role
                }
            })
        }
        // sent otp to reset the password
    async sentOtp(req, res) {
        try {
            const { email } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP

            const hashedOtp = await bcrypt.hash(otp, 10);
            user.otp = hashedOtp;
            user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

            await user.save();
            await sendOtpEmail(email, otp); // Send email

            return res.status(200).json({ message: 'OTP sent to your email' });
        } catch (error) {
            console.error('Error in sentOtp:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Verify OTP
    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user || !user.otp || !user.otpExpiresAt) {
                return res.status(400).json({ message: 'No OTP requested for this user' });
            }

            if (Date.now() > new Date(user.otpExpiresAt)) {
                return res.status(400).json({ message: 'OTP expired' });
            }

            const isMatch = await bcrypt.compare(otp, user.otp);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            user.otp = undefined;
            user.otpExpiresAt = undefined;
            await user.save();

            return res.status(200).json({ message: 'OTP verified successfully' });
        } catch (error) {
            console.error('Error in verifyOtp:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Reset Password
    async resetPassword(req, res) {
        try {
            const { email, newPassword, otp } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user || !user.otp || !user.otpExpiresAt) {
                return res.status(400).json({ message: 'No OTP requested or user not found' });
            }

            if (Date.now() > new Date(user.otpExpiresAt)) {
                return res.status(400).json({ message: 'OTP expired' });
            }

            const isMatch = await bcrypt.compare(otp, user.otp);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.otp = undefined;
            user.otpExpiresAt = undefined;

            await user.save();
            return res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            console.error('Error in resetPassword:', error);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    }

}