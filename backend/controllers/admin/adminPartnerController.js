const fs = require('fs');
const path = require('path');
const AdminPartner = require('../../models/admin/AdminPartner');

const { uploadContract } = require('../../utils/fileUpload');

exports.getAllPartners = async (req, res) => {
	try {
		const allPartners = await AdminPartner.find();
		res.status(200).json({
			message: 'Success getting all partners data',
			partners: allPartners,
		});
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.getPartner = async (req, res) => {
	try {
		const { id } = req.params;
		const partner = await AdminPartner.findById(id);
		if (!partner) {
			return res.status(404).json({ message: 'Partner not found' });
		}
		res.status(200).json({
			message: 'Success getting all partners data',
			partner,
		});
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.createPartner = async (req, res) => {
	try {
		let contractDocumentsUrl = [];

		// If files are uploaded, process each file
		if (req.files && req.files.length > 0) {
			for (let file of req.files) {
				let fileUrl = await uploadContract(file);
				contractDocumentsUrl.push(fileUrl);
			}
		}

		// Prepare partner data
		const partnerData = {
			companyName: req.body.companyName,
			companyRegistrationNumber: req.body.companyRegistrationNumber,
			industry: req.body.industry,
			companyRepresentative: req.body.companyRepresentative,
			website: req.body.website,
			socialMedia: req.body.socialMedia,
			partnershipStatus: req.body.partnershipStatus,
			partnershipStartDate: req.body.partnershipStartDate
				? new Date(req.body.partnershipStartDate)
				: null,
			partnershipEndDate: req.body.partnershipEndDate
				? new Date(req.body.partnershipEndDate)
				: null,
			rating: req.body.rating ? Number(req.body.rating) : null,
			legalRepresentative: req.body.legalRepresentative,

			contact: {
				address: req.body.contactAddress,
				telephone: req.body.contactTelephone,
				email: req.body.contactEmail,
				city: req.body.contactCity,
				country: req.body.contactCountry,
				zip: req.body.contactZip,
			},

			notes: req.body.notes,
			contractDocuments: contractDocumentsUrl, // Store file paths in DB
		};

		const newPartner = new AdminPartner(partnerData);
		await newPartner.save();

		res.status(201).json({
			message: 'New partner created successfully',
			partner: newPartner,
		});
	} catch (error) {
		console.error('Error creating partner:', error);
		res
			.status(500)
			.json({ message: 'Error creating partner', error: error.message });
	}
};

exports.updatePartner = async (req, res) => {
	try {
		const { id } = req.params;
		console.log('Received FormData:', req.body); // Debugging

		// Find existing partner
		const existingPartner = await AdminPartner.findById(id);
		if (!existingPartner) {
			return res.status(404).json({ message: 'Partner not found' });
		}

		// Extract text fields from req.body (since FormData sends them as strings)
		const updateFields = {
			companyName: req.body.companyName || existingPartner.companyName,
			companyRegistrationNumber:
				req.body.companyRegistrationNumber ||
				existingPartner.companyRegistrationNumber,
			industry: req.body.industry || existingPartner.industry,
			companyRepresentative:
				req.body.companyRepresentative || existingPartner.companyRepresentative,
			website: req.body.website || existingPartner.website,
			socialMedia: req.body.socialMedia || existingPartner.socialMedia,
			partnershipStatus:
				req.body.partnershipStatus || existingPartner.partnershipStatus,
			partnershipStartDate:
				req.body.partnershipStartDate || existingPartner.partnershipStartDate,
			partnershipEndDate:
				req.body.partnershipEndDate || existingPartner.partnershipEndDate,
			rating: req.body.rating || existingPartner.rating,
			legalRepresentative:
				req.body.legalRepresentative || existingPartner.legalRepresentative,
			notes: req.body.notes || existingPartner.notes,
			contact: {
				address: req.body.contactAddress || existingPartner.contact.address,
				telephone:
					req.body.contactTelephone || existingPartner.contact.telephone,
				email: req.body.contactEmail || existingPartner.contact.email,
				city: req.body.contactCity || existingPartner.contact.city,
				country: req.body.contactCountry || existingPartner.contact.country,
				zip: req.body.contactZip || existingPartner.contact.zip,
			},
		};

		// Handle new uploaded files (if any)
		if (req.files && req.files.length > 0) {
			const newFilePaths = req.files.map(
				file => `/uploads/partner/${file.filename}`,
			);
			const existingDocuments = existingPartner.contractDocuments || [];

			// Merge old and new documents
			updateFields.contractDocuments = [...existingDocuments, ...newFilePaths];
		}

		// Update in database
		const updatedPartner = await AdminPartner.findByIdAndUpdate(
			id,
			updateFields,
			{
				new: true,
				runValidators: true,
			},
		);

		res.status(200).json({
			message: 'Partner updated successfully',
			partner: updatedPartner,
		});
	} catch (error) {
		console.error('Update error:', error);
		res.status(500).json({ message: 'Error updating partner', error });
	}

	// Handle file deletion if provided in request
};

exports.deletePartner = async (req, res) => {
	try {
		const id = req.params.id;
		await AdminPartner.findByIdAndDelete(id);
		res.status(200).json({ message: 'Partner deleted successfully' });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error deleting partner', error: error.message });
	}
};

exports.deleteDocument = async (req, res) => {
	const { fileName } = req.body;
	if (!fileName) {
		return res.status(400).json({ message: 'Filename is required' });
	}

	// Construct full file path
	const filePath = path.join(__dirname, '../../uploads/partner', fileName);
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
		await AdminPartner.updateOne(
			{},
			{ $pull: { contractDocuments: `/uploads/partner/${fileName}` } },
		);

		res.status(200).json({ message: 'Document deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting document', error });
	}
};
