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
		console.log('reqBody', req.body);
		// const newTour = new AdminTour(req.body);

		const tourData = {
			name: req.body.name,
			description: req.body.description,
			minPrice: Number(req.body.minPrice), // Convert string to number
			minGroupSize: Number(req.body.minGroupSize),
			location: req.body.location,
			notes: req.body.notes,
			duration: {
				days: Number(req.body.durationDays) || 0,

				nights: Number(req.body.durationNights) || 0,
			},
		};
		const newTour = new AdminTour(tourData);
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
		console.log('Received FormData:', req.body); // Debugging

		// Find existing partner
		const existingTour = await AdminTour.findById(id);
		if (!existingTour) {
			return res.status(404).json({ message: 'Tour not found' });
		}

		const updateFields = {
			name: req.body.name || existingTour.name,
			description: req.body.description || existingTour.description,
			minPrice: Number(req.body.minPrice) || existingTour.minPrice,
			minGroupSize: Number(req.body.minGroupSize) || existingTour.minGroupSize,
			location: req.body.location || existingTour.location,
			notes: req.body.notes || existingTour.notes,
			duration: {
				days: Number(req.body.durationDays) || existingTour.duration.days,

				nights: Number(req.body.durationNights) || existingTour.duration.nights,
			},
		};

		// Update in database
		const updatedTour = await AdminTour.findByIdAndUpdate(id, updateFields, {
			new: true,
			runValidators: true,
		});

		// if (!updatedTour) {
		// return res.status(404).json({ message: 'Tour not found' });
		// }

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
