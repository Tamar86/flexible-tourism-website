const AdminTour = require('../../models/admin/AdminTour');

exports.getAllTours = async (req, res) => {
	try {
		const allTours = await AdminTour.find();
		res.status(200).json({ message: 'Success', tours: allTours });
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.createTour = async (req, res) => {
	try {
		const newTour = new AdminTour(req.body);
		await newTour.save();

		res
			.status(201)
			.json({ message: 'New Tour created successfully', tour: newTour });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateTour = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;

		const updatedTour = await AdminTour(
			id,
			{ $set: updatedData },
			{ new: true },
		);
		if (!updatedTour) {
			return res.status(404).json({ message: 'Tour not found' });
		}

		res
			.status(200)
			.json({ message: 'Tour updated successfully', tour: updatedTour });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error updating tour', error: error.message });
	}
};

exports.deleteTour = async (req, res) => {
	try {
		const id = req.params.id;
		await AdminTour.findByIdAndDelete(id);

		res.status(200).json({ message: 'Tour deleted successfully' });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error deleting tour', error: error.message });
	}
};
