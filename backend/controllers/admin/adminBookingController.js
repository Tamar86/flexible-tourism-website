const AdminBooking = require('../../models/admin/AdminBooking');
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

exports.createBooking = async (req, res) => {
	try {
		const newBooking = new AdminBooking(req.body);
		await newBooking.save();

		res.status(201).json({
			message: 'New booking created successfully',
			booking: newBooking,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateBooking = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.params;

		const updatedBooking = await AdminBooking.findByIdAndUpdate(
			id,
			{ $set: updatedData },
			{ new: true },
		);

		if (!updatedBooking) {
			return res.status(404).json({ message: 'Booking not found' });
		}

		res.status(200).json({
			message: 'Booking updated successfully',
			booking: updatedBooking,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error updating booking', error: error.message });
	}
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
