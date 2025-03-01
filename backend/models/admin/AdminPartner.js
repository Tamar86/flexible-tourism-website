const mongoose = require('mongoose');

const adminPartnerSchema = new mongoose.Schema({
	companyName: {
		type: [String],
		required: true,
	},
	companyRepresentative: {
		type: [String],
		required: true,
	},

	contact: {
		address: {
			type: [String],
			required: true,
		},
		telephone: {
			type: [String],
			required: true,
		},
		city: {
			type: [String],
			required: true,
		},
		country: {
			type: [String],
			required: true,
		},
		zip: {
			type: [String],
			required: true,
		},
	},

	notes: {
		type: String,
		default: '',
	},
});

const AdminPartner = mongoose.model('AdminPartner', adminPartnerSchema);

module.exports = AdminPartner;
