   import express from 'express';
   import cors from 'cors';
   import dotenv from 'dotenv';
   import cookieParser from 'cookie-parser';
   import connectDB from './config/db.js';
   import userRoutes from './routes/user.routes.js'
   import hotelRoutes from './routes/hotel.routes.js'
   import packageRoutes from './routes/package.routes.js'
   import routePlaces from './routes/places.routes.js'
   import feedBackRoutes from './routes/feedback.routes.js'
   import galleryRoutes from './routes/gallery.routes.js'
   import heroRoutes from './routes/herobanner.routes.js';

   dotenv.config();

   const app = express();

   connectDB();
   app.use(cookieParser());


   app.use(cors({
       origin: 'http://localhost:5173',
       credentials: true
   }));

   app.use(express.json());
   app.get('/', (req, res) => {
           res.json({
               message: "Welcome to the API"
           })
       })
       /* the routes api are */
   app.use('/api', userRoutes);
   app.use('/api', hotelRoutes);
   app.use('/api', packageRoutes);
   app.use('/api', routePlaces);
   app.use('/api', feedBackRoutes);
   app.use('/api', galleryRoutes);
   app.use('/api', heroRoutes);







   const port = process.env.PORT || 2000;

   app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
   });