const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars only in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const contactRoutes = require('./routes/contact');
const packageRoutes = require('./routes/packages');

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

/* =======================
   ROUTES
======================= */
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/packages', packageRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running',
    environment: process.env.NODE_ENV
  });
});

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

/* =======================
   DB CONNECTION
======================= */
const connectDB = async () => {
  try {
    if (!process.env.DATABASE) {
      throw new Error('DATABASE env variable not defined');
    }

    await mongoose.connect(process.env.DATABASE);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

/* =======================
   START SERVER
======================= */
const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();

/* =======================
   PROCESS HANDLERS
======================= */
process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION:', err);
  process.exit(1);
});

module.exports = app;
