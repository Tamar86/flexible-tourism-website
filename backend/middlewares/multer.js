const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// Set up disk storage for multer (instead of memoryStorage)
const partnerStorage = multer.diskStorage({
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

// Set up disk storage for multer (instead of memoryStorage)
const customerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Define the directory where the contract documents will be stored
		const uploadFolder = path.join(__dirname, '../uploads/customer');

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

// Set up disk storage for multer (instead of memoryStorage)
const bookingStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		// Define the directory where the contract documents will be stored
		const uploadFolder = path.join(__dirname, '../uploads/booking');

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

// Set multer options
const uploadPartnerDocument = multer({
	storage: partnerStorage,
	fileFilter: fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

const uploadCustomerDocument = multer({
	storage: customerStorage,
	fileFilter: fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

const uploadBookingDocument = multer({
	storage: bookingStorage,
	fileFilter: fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

module.exports = {
	uploadPartnerDocument,
	uploadCustomerDocument,
	uploadBookingDocument,
};
