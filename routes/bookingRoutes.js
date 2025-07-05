const express = require('express');
const { addBooking, getBookings, getBookingCounts } = require('../controllers/bookingController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/', verifyToken, addBooking);
router.get('/', verifyToken, getBookings);
router.get('/booking-counts', verifyToken, getBookingCounts)
module.exports = router;
