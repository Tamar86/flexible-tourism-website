const express = require('express');
const router = express.Router();
const adminTourController = require('../../controllers/admin/adminTourController');

router.get('/all', adminTourController.getAllTours);

router.post('/new', adminTourController.createTour);

router.patch('/update/:id', adminTourController.updateTour);

router.delete('/delete/:id', adminTourController.deleteTour);

module.exports = router;
