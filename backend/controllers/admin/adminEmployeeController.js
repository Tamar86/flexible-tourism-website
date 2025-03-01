const AdminEmployee = require('../../models/admin/AdminEmployee');

exports.getAllEmployees = async (req, res) => {
	try {
		const allEmployees = await AdminEmployee.find();
		res.status(200).json(allEmployees);
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.getEmployee = async (req, res) => {
	try {
		const { id } = req.params;

		const employee = await AdminEmployee.findById(id);
		// Check if employee exists
		if (!employee) {
			return res.status(404).json({ message: 'Employee not found' });
		}
		res.status(200).json(employee);
	} catch (error) {
		res.status(500).json({ message: `Server Error, ${error}` });
	}
};

exports.createEmployee = async (req, res) => {
	try {
		const newEmployee = new AdminEmployee(req.body);
		await newEmployee.save();

		res.status(201).json({
			message: 'New employee created successfully',
			employee: newEmployee,
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.partialUpdateOfEmployee = async (req, res) => {
	try {
		const id = req.params.id; // Get the _id from URL params
		const updatedData = req.body; // Get updated data from request body

		const updatedEmployee = await AdminEmployee.findByIdAndUpdate(
			id, // _id to find the employee
			{ $set: updatedData }, // New data to update
			{ new: true }, // Return the updated document
		);

		if (!updatedEmployee) {
			return res.status(404).json({ message: 'Employee not found' });
		}
		// Respond with the updated employee

		res.status(200).json({
			message: 'Employee updated successfully',
			employee: updatedEmployee,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error updating employee', error: error.message });
	}
};

exports.deleteEmployee = async (req, res) => {
	try {
		const id = req.params.id;

		await AdminEmployee.findByIdAndDelete(id);
		res.status(200).json({ message: 'Employee deleted successfully' });
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ message: 'Error deleting employee', error: error.message });
	}
};
