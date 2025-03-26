import { Booking } from '../types/bookings';

export const formatFieldNameBooking = (field: string) => {
	switch (field) {
		case 'bookingType':
			return 'Booking Type';
		case 'tourStartDate':
			return 'Tour Start Date';
		case 'groupSize':
			return 'Group Size';
		case 'price':
			return 'Price';
		case 'createdAt':
			return 'Created At';
		case 'status':
			return 'Status';
		case 'isPaid':
			return 'Is Paid';
		default:
			return field;
	}
};

export const getFieldValueBooking = (booking: Booking, field: string) => {
	switch (field) {
		case 'bookingType':
			return booking.bookingType || '';
		case 'tourStartDate':
			return booking.tourStartDate || '';
		case 'groupSize':
			return booking.groupSize || '';
		case 'price':
			return booking.price || '';
		case 'createdAt':
			return booking.createdAt || '';
		case 'status':
			return booking.status || '';
		case 'isPaid':
			return booking.isPaid || '';

		default:
			return '';
	}
};
