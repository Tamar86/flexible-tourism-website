const mongoose = require('mongoose');

const adminCustomerSchema = new mongoose.Schema(
	{
		fullname: {
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
				required: true,
			},
		},

		documents: {
			type: [String], // Array of file paths or URLs
			default: [],
		},

		notes: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true },
);

const AdminCustomer = mongoose.model(
	'AdminCustomer',
	adminCustomerSchema,
	'admin_customers',
);

module.exports = AdminCustomer;
