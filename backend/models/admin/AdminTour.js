const mongoose = require('mongoose');

const adminTourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	minPrice: {
		type: Number,
		required: true,
	},
	minGroupSize: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	duration: {
		days: { type: Number, required: true }, // Number of days
		nights: { type: Number, required: true }, // Number of nights
	},
	// images: [
	// {
	// imgUrl: { type: String },
	// publicId: { type: String },
	// },
	// ],
});

const AdminTour = mongoose.model('AdminTour', adminTourSchema, 'admin_tours');

module.exports = AdminTour;
