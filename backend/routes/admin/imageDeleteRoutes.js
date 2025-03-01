const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const AdminTour = require('../../models/admin/AdminTour');

router.delete('/delete/:tourId/:publicId', async (req, res) => {
	try {
		const { tourId, publicId } = req.params;
		console.log(publicId);
		const fullPublicId = `tourism_images/${publicId}`;

		// Delete image from Cloudinary
		await cloudinary.uploader.destroy(fullPublicId);

		// Remove the image from the tour's images array
		const tour = await AdminTour.findByIdAndUpdate(
			tourId,
			{ $pull: { images: { publicId: fullPublicId } } },
			{ new: true },
		);

		if (!tour) {
			return res.status(404).json({ message: 'Tour not found' });
		}
		res
			.status(200)
			.json({ message: 'Image deleted successfully', tour, fullPublicId });
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Failed to delete image', error: error.message });
	}
});

module.exports = router;
