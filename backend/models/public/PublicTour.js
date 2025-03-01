const mongoose = require('mongoose');

const publicTourSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	description: String,
	price: {
		type: Number,
		require: true,
	},
	location: String,
	duration: {
		days: { type: Number, required: true }, // Number of days
		nights: { type: Number, required: true }, // Number of nights
	},
	images: [String],
	availableDates: [Date],
});

const PublicTour = mongoose.model('PublicTour', publicTourSchema);

module.exports = PublicTour;
