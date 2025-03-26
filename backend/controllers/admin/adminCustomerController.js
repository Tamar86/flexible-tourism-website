const fs = require('fs');
const path = require('path');
const AdminCustomer = require('../../models/admin/AdminCustomer');
const { uploadCustomerDocuments } = require('../../utils/fileUpload');

exports.getAllCustomers = async (req, res) => {
	try {
		const allCustomers = await AdminCustomer.find();
		res.status(200).json({
			message: 'Success getting all customers data',
			customers: allCustomers,
		});
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.getCustomer = async (req, res) => {
	try {
		const { id } = req.params;
		const customer = await AdminCustomer.findById(id);
		if (!customer) {
			return res.status(404).json({ message: 'Customer not found' });
		}
		res.status(200).json({
			message: 'Success getting customer data',
			customer,
		});
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.createCustomer = async (req, res) => {
	try {
		let documentsUrl = [];

		// If files are uploaded, process each file
		if (req.files && req.files.length > 0) {
			for (let file of req.files) {
				let fileUrl = await uploadCustomerDocuments(file);
				documentsUrl.push(fileUrl);
			}
		}

		// Prepare partner data
		const customerData = {
			fullname: req.body.fullname,

			contact: {
				address: req.body.contactAddress,
				telephone: req.body.contactTelephone,
				email: req.body.contactEmail,
				city: req.body.contactCity,
				country: req.body.contactCountry,
				zip: req.body.contactZip,
			},

			notes: req.body.notes,
			documents: documentsUrl, // Store file paths in DB
		};

		const newCustomer = new AdminCustomer(customerData);
		await newCustomer.save();

		res.status(201).json({
			message: 'New customer created successfully',
			customer: newCustomer,
		});
	} catch (error) {
		console.error('Error creating customer:', error);
		res
			.status(500)
			.json({ message: 'Error creating customer', error: error.message });
	}
};

exports.updateCustomer = async (req, res) => {
	try {
		const { id } = req.params;
		console.log('Received FormData:', req.body); // Debugging

		// Find existing partner
		const existingCustomer = await AdminCustomer.findById(id);
		if (!existingCustomer) {
			return res.status(404).json({ message: 'Customer not found' });
		}

		// Extract text fields from req.body (since FormData sends them as strings)
		const updateFields = {
			fullname: req.body.fullname || existingCustomer.fullname,

			contact: {
				address: req.body.contactAddress || existingCustomer.contact.address,
				telephone:
					req.body.contactTelephone || existingCustomer.contact.telephone,
				email: req.body.contactEmail || existingCustomer.contact.email,
				city: req.body.contactCity || existingCustomer.contact.city,
				country: req.body.contactCountry || existingCustomer.contact.country,
				zip: req.body.contactZip || existingCustomer.contact.zip,
			},
		};

		// Handle new uploaded files (if any)
		if (req.files && req.files.length > 0) {
			const newFilePaths = req.files.map(
				file => `/uploads/customer/${file.filename}`,
			);
			const existingDocuments = existingCustomer.documents || [];

			// Merge old and new documents
			updateFields.documents = [...existingDocuments, ...newFilePaths];
		}

		// Update in database
		const updatedCustomer = await AdminCustomer.findByIdAndUpdate(
			id,
			updateFields,
			{
				new: true,
				runValidators: true,
			},
		);

		res.status(200).json({
			message: 'Customer updated successfully',
			customer: updatedCustomer,
		});
	} catch (error) {
		console.error('Update error:', error);
		res.status(500).json({ message: 'Error updating customer', error });
	}

	// Handle file deletion if provided in request
};

exports.deleteCustomer = async (req, res) => {
	try {
		const id = req.params.id;
		await AdminCustomer.findByIdAndDelete(id);
		res.status(200).json({ message: 'Customer deleted successfully' });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error deleting customer', error: error.message });
	}
};

exports.deleteCustomerDocument = async (req, res) => {
	const { fileName } = req.body;
	if (!fileName) {
		return res.status(400).json({ message: 'Filename is required' });
	}

	// Construct full file path
	const filePath = path.join(__dirname, '../../uploads/customer', fileName);
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
		await AdminCustomer.updateOne(
			{},
			{ $pull: { documents: `/uploads/customer/${fileName}` } },
		);

		res.status(200).json({ message: 'Document deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting document', error });
	}
};
