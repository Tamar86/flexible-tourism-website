const express = require('express');
const router = express.Router();
const adminBookingController = require('../../controllers/admin/adminBookingController');

router.get('/bookings', adminBookingController.getAllBookings);

router.post('/newBooking', adminBookingController.createBooking);

router.patch('/update/:id', adminBookingController.createBooking);

router.delete('/delete/:id', adminBookingController.createBooking);

module.exports = router;
