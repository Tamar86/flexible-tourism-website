const express = require('express');
const upload = require('../../middlewares/multer');
const AdminTour = require('../../models/admin/AdminTour');
const router = express.Router();

router.post('/upload/:tourId', upload.single('image'), async (req, res) => {
	try {
		const { tourId } = req.params;
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' });
		}

		const imgUrl = req.file.path; // Cloudinary URL
		const publicId = req.file.filename; // Cloudinary Public ID

		// Find the tour and update its images array
		const tour = await AdminTour.findByIdAndUpdate(
			tourId,
			{
				$push: { images: { publicId, imgUrl } },
			},
			{ new: true },
		);
		if (!tour) {
			return res.status(404).json({ message: 'Tour not found' });
		}

		res.status(200).json({
			message: 'Image uploaded and saved successfully',
			tour,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error uploading image', error: error.message });
	}
});

module.exports = router;
