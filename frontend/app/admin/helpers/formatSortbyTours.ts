import { Tour } from '../types/tours';

export const formatFieldNameTour = (field: string) => {
	switch (field) {
		case 'minPrice':
			return 'Minimum Price';
		case 'minGroupSize':
			return 'Minimum Group Size';
		case 'duration.days':
			return 'Duration';
		default:
			return field;
	}
};

export const getFieldValueTour = (tour: Tour, field: string) => {
	switch (field) {
		case 'minPrice':
			return tour.minPrice || 0;
		case 'minGroupSize':
			return tour.minGroupSize || 0;
		case 'duration.days':
			return tour.duration.days || 0;
		default:
			return '';
	}
};
