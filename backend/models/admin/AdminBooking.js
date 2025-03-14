const mongoose = require('mongoose');

const adminBookingSchema = new mongoose.Schema({
	bookingType: {
		type: String,
		enum: ['B2B', 'B2C'],
		required: true,
	},

	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer', // Reference to a customer model
		required: function () {
			return this.bookingType === 'B2C';
		},
	},

	partner: {
		type: mongoose.Schema.Types.Mixed,
		ref: 'AdminPartner',
		required: true,
		validate: {
			validator: async function (value) {
				// If it's an ObjectId, check if the referenced partner exists
				if (mongoose.Types.ObjectId.isValid(value)) {
					const partnerExists = await mongoose
						.model('AdminPartner')
						.findById(value);
					return !!partnerExists; // Return true if partner exists, false otherwise
				}
				// If it's a string, allow manual entry
				return typeof value === 'string' && value.trim().length > 0;
			},
			message:
				'Invalid partner. Must be an existing partner ID or a valid name.',
		},
	},
	tour: {
		type: mongoose.Schema.Types.Mixed,
		ref: 'AdminTour',
		required: true,
	},

	price: {
		type: Number,
		required: true,
	},
	extraIncome: {
		type: Number,
		required: true,
		default: 0,
	},
	isPayed: {
		type: Boolean,
		required: true,
	},
	tourOperator: {
		type: mongoose.Schema.Types.Mixed,
		ref: 'AdminEmployee',
		required: true,
	},
	tourGuide: {
		type: mongoose.Schema.Types.Mixed,
		ref: 'AdminEmployee',
		default: null,
	},
	bookingDate: {
		type: Date,
		default: Date.now,
	},
	tourStartDate: { type: Date, required: true },

	tourEndDate: { type: Date, required: true },

	status: {
		type: String,
		enum: ['pending', 'confirmed', 'canceled'],
		default: 'pending',
	},

	notes: {
		type: String,
		default: '',
	},
});

const AdminBooking = mongoose.model(
	'AdminBooking',
	adminBookingSchema,
	'admin_bookings',
);

module.exports = AdminBooking;
