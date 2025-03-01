const AdminPartner = require('../../models/admin/AdminPartner');

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

exports.createPartner = async (req, res) => {
	try {
		const newPartner = new AdminPartner(req.body);
		await newPartner.save();

		res
			.status(201)
			.json({ message: 'New partner created', partner: newPartner });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updatePartner = async (req, res) => {
	const id = req.params.id;
	const updatedData = req.body;
	const updatedPartner = await AdminPartner.findByIdAndUpdate(
		id,
		{ $set: updatedData },
		{ new: true },
	);

	if (!updatedPartner) {
		return res.status(404).json({ message: 'Partner not found' });
	}

	res
		.status(200)
		.json({ message: 'Partner updated successfully', parent: updatedPartner });
	try {
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error updating partner', error: error.message });
	}
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
