const express = require('express');
const router = express.Router();
const adminBookingController = require('../../controllers/admin/adminBookingController');
const { uploadBookingDocument } = require('../../middlewares/multer');

router.get('/all', adminBookingController.getAllBookings);

router.get('/booking/:id', adminBookingController.getBooking);

router.post(
	'/new',
	uploadBookingDocument.array('documents', 5),
	adminBookingController.createBooking,
);

router.patch(
	'/update/:id',
	uploadBookingDocument.array('documents', 5),
	adminBookingController.updateBooking,
);

router.delete('/delete/:id', adminBookingController.deleteBooking);

router.delete('/delete-document', adminBookingController.deleteBookingDocument);

module.exports = router;
