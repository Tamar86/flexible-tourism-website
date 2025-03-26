const AdminBooking = require('../../models/admin/AdminBooking');
const fs = require('fs');
const path = require('path');
const { uploadBookingDocuments } = require('../../utils/fileUpload');
//
exports.getAllBookings = async (req, res) => {
	try {
		const allBookings = await AdminBooking.find();
		res
			.status(200)
			.json({ message: 'Success getting all bookings data', allBookings });
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.getBooking = async (req, res) => {
	try {
		const { id } = req.params;
		const booking = await AdminBooking.findById(id);

		if (!booking) {
			return res.status(404).json({ message: 'Booking not found' });
		}
		res
			.status(200)
			.json({ message: 'Success getting all bookings data', booking });
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.createBooking = async (req, res) => {
	try {
		let documentsUrl = [];

		// If files are uploaded, process each file
		if (req.files && req.files.length > 0) {
			for (let file of req.files) {
				let fileUrl = await uploadBookingDocuments(file);
				documentsUrl.push(fileUrl);
			}
		}

		// Prepare partner data
		const bookingData = {
			bookingType: req.body.bookingType,
			customer: req.body.bookingType === 'B2C' ? req.body.customer : null,
			partner: req.body.bookingType === 'B2B' ? req.body.partner : null,
			tour: req.body.tour,
			groupSize: req.body.groupSize,
			price: req.body.price,
			extraIncome: req.body.extraIncome,
			isPaid: req.body.isPaid,
			tourOperator: req.body.tourOperator,
			tourGuide: req.body.tourGuide,
			driver: req.body.driver,
			accommodations: req.body.accommodations,
			bookingDate: req.body.bookingDate,
			tourStartDate: req.body.tourStartDate,
			tourEndDate: req.body.tourEndDate,
			status: req.body.status,
			documents: documentsUrl, // Store file paths in DB
			notes: req.body.notes,
		};

		const newBooking = new AdminBooking(bookingData);
		await newBooking.save();

		res.status(201).json({
			message: 'New booking created successfully',
			booking: newBooking,
		});
	} catch (error) {
		console.error('Error creating booking:', error);
		res
			.status(500)
			.json({ message: 'Error creating booking', error: error.message });
	}
};

exports.updateBooking = async (req, res) => {
	try {
		const { id } = req.params;
		console.log('Received FormData:', req.body); // Debugging

		// Find existing partner
		const existingBooking = await AdminBooking.findById(id);
		if (!existingBooking) {
			return res.status(404).json({ message: 'Booking not found' });
		}

		// Extract text fields from req.body (since FormData sends them as strings)
		const updateFields = {
			bookingType: req.body.bookingType || existingBooking.bookingType,
			customer:
				req.body.bookingType === 'B2C'
					? req.body.customer
					: null || existingBooking.customer,
			partner:
				req.body.bookingType === 'B2B'
					? req.body.partner
					: null || existingBooking.partner,
			tour: req.body.tour || existingBooking.tour,
			groupSize: req.body.groupSize || existingBooking.groupSize,
			price: req.body.price || existingBooking.price,
			extraIncome: req.body.extraIncome || existingBooking.extraIncome,
			isPaid: req.body.isPaid || existingBooking.isPaid,
			tourOperator: req.body.tourOperator || existingBooking.tourOperator,
			tourGuide: req.body.tourGuide || existingBooking.tourGuide,
			driver: req.body.driver || existingBooking.driver,
			accommodations: req.body.accommodations || existingBooking.accommodations,
			bookingDate: req.body.bookingDate || existingBooking.bookingDate,
			tourStartDate: req.body.tourStartDate || existingBooking.tourStartDate,
			tourEndDate: req.body.tourEndDate || existingBooking.tourEndDate,
			status: req.body.status || existingBooking.status,
			notes: req.body.notes || existingBooking.notes,
		};

		// Handle new uploaded files (if any)
		if (req.files && req.files.length > 0) {
			const newFilePaths = req.files.map(
				file => `/uploads/booking/${file.filename}`,
			);
			const existingDocuments = existingBooking.documents || [];

			// Merge old and new documents
			updateFields.documents = [...existingDocuments, ...newFilePaths];
		}

		// Update in database
		const updatedBooking = await AdminBooking.findByIdAndUpdate(
			id,
			updateFields,
			{
				new: true,
				runValidators: true,
			},
		);

		res.status(200).json({
			message: 'booking updated successfully',
			booking: updatedBooking,
		});
	} catch (error) {
		console.error('Update error:', error);
		res.status(500).json({ message: 'Error updating booking', error });
	}

	// Handle file deletion if provided in request
};
exports.deleteBooking = async (req, res) => {
	try {
		const id = req.params.id;
		await AdminBooking.findByIdAndDelete(id);
		res.status(200).json({ message: 'Booking deleted successfully' });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error deleting Booking', error: error.message });
	}
};

exports.deleteBookingDocument = async (req, res) => {
	const { fileName } = req.body;
	if (!fileName) {
		return res.status(400).json({ message: 'Filename is required' });
	}

	// Construct full file path
	const filePath = path.join(__dirname, '../../uploads/booking', fileName);
	console.log('path', path);

	try {
		// Delete file from storage (e.g., Cloudinary, local, S3)
		// Check if file exists before deleting
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath); // Delete the file
			console.log(`Deleted file: ${filePath}`);
		} else {
			return res.status(404).json({ message: 'File not found' });
		}

		// Also update MongoDB if needed
		await AdminBooking.updateOne(
			{},
			{ $pull: { documents: `/uploads/booking/${fileName}` } },
		);

		res.status(200).json({ message: 'Document deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting document', error });
	}
};
