export function validateHotel(req, res, next) {
  const { name, location, rating } = req.body;
  if (!name || !location || !rating) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }
  next();
} 