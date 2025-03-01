const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'tourism_images', // Change this to your desired folder in Cloudinary
		allowed_formats: ['jpg', 'png', 'jpeg'],
	},
});

const upload = multer({ storage });

module.exports = upload;
