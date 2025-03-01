const express = require('express');
const router = express.Router();
const adminTourController = require('../../controllers/admin/adminTourController');

router.get('/tours', adminTourController.getAllTours);

router.post('/new-tour', adminTourController.createTour);

router.patch('/update/:id', adminTourController.updateTour);

router.delete('/delete/:id', adminTourController.deleteTour);

module.exports = router;
