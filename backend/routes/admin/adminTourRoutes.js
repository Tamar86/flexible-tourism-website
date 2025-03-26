const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const adminTourController = require('../../controllers/admin/adminTourController');

router.get('/all', adminTourController.getAllTours);

router.post('/new', upload.none(), adminTourController.createTour);

router.patch('/update/:id', upload.none(), adminTourController.updateTour);

router.delete('/delete/:id', adminTourController.deleteTour);

module.exports = router;
