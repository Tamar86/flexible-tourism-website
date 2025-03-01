const mongoose = require('mongoose');

const adminEmployeeSchema = new mongoose.Schema({
	fullname: {
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
	},
	idNumber: {
		type: String,
		required: true,
		unique: true,
	},

	bankAccount: {
		type: String,
		required: true,
	},

	employmentType: {
		type: String,
		enum: [
			'Freelance',
			'Contract',
			'Full-time',
			'Part-time',
			'Internship',
			'Temporary',
			'N/A',
		],
		default: 'N/A',
	},

	position: {
		type: String,
		required: true,
	},

	contact: {
		address: {
			type: String,
			required: true,
		},
		telephone: {
			type: String,
			required: true,
		},

		email: {
			type: String,
			required: true,
			match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email regex pattern
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		zip: {
			type: String,
		},
	},

	notes: {
		type: String,
		default: '',
	},
});

const AdminEmployee = mongoose.model(
	'AdminEmployee',
	adminEmployeeSchema,
	'admin_employees',
);

module.exports = AdminEmployee;
