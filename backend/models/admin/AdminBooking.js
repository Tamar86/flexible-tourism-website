const mongoose = require('mongoose');

const adminBookingSchema = new mongoose.Schema(
	{
		bookingType: {
			type: String,
			enum: ['B2B', 'B2C'],
			required: true,
		},

		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'AdminCustomer', // Reference to a customer model
			required: function () {
				// If bookingType is 'B2C', customer is required
				return this.bookingType === 'B2C';
			},
		},

		partner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'AdminPartner',
			required: function () {
				// If bookingType is 'B2C', customer is required
				return this.bookingType === 'B2B';
			},
			validate: {
				validator: function (value) {
					// Ensure partner is required for B2B, customer for B2C
					if (this.bookingType === 'B2B' && !value) return false;
					return true;
				},
				message: 'Partner is required for B2B bookings.',
			},
		},
		tour: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'AdminTour',
			required: true,
		},

		groupSize: {
			type: Number,
			required: true,
			min: [1, 'Group size must be at least 1'],
		},

		price: {
			type: Number,
			required: true,
		},
		extraIncome: {
			type: Number,
			default: 0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		tourOperator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'AdminEmployee',
			required: true,
		},
		tourGuide: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'AdminEmployee',
				default: null,
			},
		],
		driver: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'AdminEmployee',
				default: null,
			},
		],
		bookingDate: {
			type: Date,
			default: Date.now,
		},

		tourStartDate: { type: Date, required: true },

		tourEndDate: {
			type: Date,
			required: true,
			// validate: {
			// validator: function (endDate) {
			// if (!this.tourStartDate) return false;
			// return endDate > this.tourStartDate;
			// },
			// message: 'Tour end date must be after the tour start date.',
			// },
		},

		accommodations: { type: [String], default: [] },
		status: {
			type: String,
			enum: ['pending', 'confirmed', 'canceled'],
			default: 'pending',
		},

		documents: {
			type: [String],
			default: [],
		},

		notes: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true },
);

const AdminBooking = mongoose.model(
	'AdminBooking',
	adminBookingSchema,
	'admin_bookings',
);

module.exports = AdminBooking;
