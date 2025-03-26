const mongoose = require('mongoose');

const adminPartnerSchema = new mongoose.Schema(
	{
		companyName: {
			type: String,
			required: true,
		},
		companyRegistrationNumber: {
			type: String,
			required: true,
		},
		industry: {
			type: String,
			required: true,
		},

		companyRepresentative: {
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

		website: {
			type: String,
			required: true,
		},

		socialMedia: {
			type: String,
		},

		partnershipStatus: {
			type: String,
			enum: ['Active', 'Pending', 'Terminated'],
			default: 'Pending',
		},

		partnershipStartDate: {
			type: Date,
			required: true,
		},
		partnershipEndDate: {
			type: Date,
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			// default: 3,
		},
		documents: {
			type: [String], // Array of file paths or URLs
			default: [],
		},

		legalRepresentative: {
			type: String,
		},

		notes: {
			type: String,
			// default: '',
		},
	},
	{ timestamps: true },
);

const AdminPartner = mongoose.model(
	'AdminPartner',
	adminPartnerSchema,
	'admin_partners',
);

module.exports = AdminPartner;
