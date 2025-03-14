const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up disk storage for multer (instead of memoryStorage)
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Define the directory where the contract documents will be stored
		const uploadFolder = path.join(__dirname, '../uploads/partner');

		// Ensure the folder exists
		if (!fs.existsSync(uploadFolder)) {
			fs.mkdirSync(uploadFolder, { recursive: true });
		}

		// Save the file in the 'contracts' folder
		cb(null, uploadFolder);
	},
	filename: (req, file, cb) => {
		// Use timestamp to generate a unique file name
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

// File filter to allow only specific mime types
const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = [
		'application/pdf', // PDF
		'image/jpeg', // JPG & JPEG
		'image/png', // PNG
	];

	if (!allowedMimeTypes.includes(file.mimetype)) {
		return cb(new Error('Invalid file type'), false);
	}
	cb(null, true);
};

// Set multer options
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

module.exports = { upload };
