'use client';

import { createContext, useContext, useReducer } from 'react';
import {
	BookingsAction,
	BookingsContextType,
	BookingsProvidersProps,
	BookingsState,
} from '../types/bookings';
import { getFieldValueBooking } from '../helpers/formatSortByBookings';

const emptyBooking = {
	bookingType: '', //'B2B' or 'B2C'
	customer: '', // Required for B2C
	partner: '', // Required for B2B
	tour: '',
	tourOperator: '',
	tourGuide: [],
	driver: [],
	accommodations: [],
	bookingDate: null,
	tourStartDate: null,
	tourEndDate: null,
	groupSize: 1,
	price: 0,
	extraIncome: 0,
	isPaid: false,
	status: 'pending',
	documents: [],
	notes: '',
	_id: '',
	createdAt: '',
};

const initialBookingsState: BookingsState = {
	allBookings: [],
	bookings: [],

	booking: emptyBooking,
	bookingFormData: emptyBooking,
};

const bookingsReducer = (state: BookingsState, action: BookingsAction) => {
	switch (action.type) {
		case 'SET_ALL_BOOKINGS':
			return { ...state, allBookings: action.payload };
		case 'SET_BOOKINGS':
			return { ...state, bookings: action.payload };
		case 'SET_BOOKING':
			return {
				...state,
				booking: action.payload,
				bookingFormData: action.payload,
			};
		case 'SET_BOOKING_TYPE':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					bookingType: action.payload,
				},
			};
		case 'SET_CUSTOMER':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					customer: action.payload,
				},
			};
		case 'SET_PARTNER':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					partner: action.payload,
				},
			};
		case 'SET_TOUR':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					tour: action.payload,
				},
			};
		case 'SET_TOUR_OPERATOR':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					tourOperator: action.payload,
				},
			};
		case 'SET_TOUR_GUIDE':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					tourGuide: action.payload,
				},
			};
		case 'SET_TOUR_DRIVER':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					driver: action.payload,
				},
			};
		case 'SET_ACCOMMODATIONS':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					accommodations: action.payload,
				},
			};
		case 'SET_BOOKING_DATE':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					bookingDate: action.payload,
				},
			};
		case 'SET_TOUR_START_DATE':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					tourStartDate: action.payload,
				},
			};
		case 'SET_TOUR_END_DATE':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					tourEndDate: action.payload,
				},
			};
		case 'SET_GROUP_SIZE':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					groupSize: action.payload,
				},
			};
		case 'SET_PRICE':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					price: action.payload,
				},
			};
		case 'SET_EXTRA_INCOME':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					extraIncome: action.payload,
				},
			};
		case 'SET_IS_PAID':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					isPaid: action.payload,
				},
			};
		case 'SET_STATUS':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					status: action.payload,
				},
			};
		case 'SET_DOCUMENTS':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					documents: action.payload,
				},
			};
		case 'SET_NOTES':
			return {
				...state,
				bookingFormData: {
					...state.bookingFormData,
					notes: action.payload,
				},
			};

		case 'SET_BOOKING_FORM_DATA':
			return {
				...state,
				booking: action.payload,
			};
		case 'SET_BOOKING_FORM_DATA_INPUT': {
			const { name, value } = action.payload;
			return {
				...state,
				bookingFormData: { ...state.bookingFormData, [name]: value },
			};
		}

		case 'DELETE_DOCUMENT': {
			const document = action.payload;
			return {
				...state,
				booking: {
					...state.booking,
					documents: state.booking?.documents.filter(item => item !== document),
				},
			};
		}

		case 'DELETE_BOOKING':
			return {
				...state,
				allBookings: state.allBookings.filter(el => el._id !== action.payload),
			};
		case 'SEARCH_BY_NAME': {
			const { value, customer, partner } = action.payload;
			const searchTerm = value.toLowerCase();

			const filteredBookings = state.bookings.filter(booking => {
				const customerMatch = customer.find(
					el =>
						el._id === booking.customer &&
						el.fullname.toLowerCase().startsWith(searchTerm),
				);
				const partnersMatch = partner.find(
					el =>
						el._id === booking.partner &&
						el.companyName.toLowerCase().startsWith(searchTerm),
				);

				return customerMatch || partnersMatch;
			});

			return { ...state, allBookings: filteredBookings };
		}
		case 'SORT_BOOKINGS': {
			const field = action.payload;
			console.log(field);
			const sortedBookings = [...state.allBookings].sort((a, b) => {
				const valueA = getFieldValueBooking(a, field);
				const valueB = getFieldValueBooking(b, field);

				// Check if both values are numbers
				if (typeof valueA === 'number' && typeof valueB === 'number') {
					return valueA - valueB; // Numeric sorting
				}
				// Otherwise, assume they are strings and use localeCompare()
				return String(valueA).localeCompare(String(valueB));
			});

			return { ...state, allBookings: sortedBookings };
		}
	}
};

export const BookingsContext = createContext<BookingsContextType>({
	state: initialBookingsState,
	dispatch: () => {
		throw new Error('dispatch called outside of BookingsProvider');
	},
});

export const BookingsProvider = ({ children }: BookingsProvidersProps) => {
	const [state, dispatch] = useReducer(bookingsReducer, initialBookingsState);

	return (
		<BookingsContext.Provider value={{ state, dispatch }}>
			{children}
		</BookingsContext.Provider>
	);
};

export function useBookings() {
	const context = useContext(BookingsContext);
	if (!context) {
		throw new Error('useBookings must be used within a BookingsProvider');
	}
	return context;
}
