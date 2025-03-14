'use client';

import { createContext, useContext, useReducer } from 'react';
import {
	BookingsAction,
	BookingsContextType,
	BookingsProvidersProps,
	BookingsState,
} from '../types/bookings';

const emptyBooking = {
	bookingType: '', //'B2B' or 'B2C'
	customer: '', // Required for B2C
	partner: '', // Required for B2B
	tour: '',
	price: 0,
	extraIncome: 0,
	isPayed: false,
	tourOperator: '',
	tourGuide: '',
	bookingDate: new Date(),
	tourStartDate: new Date(),
	tourEndDate: new Date(),
	status: 'Pending',
	notes: '',
	_id: '',
};

const initialBookingsState = {
	allBookings: [],
	bookings: [],
	booking: emptyBooking,
};

const bookingsReducer = (state: BookingsState, action: BookingsAction) => {
	switch (action.type) {
		case 'SET_ALL_BOOKINGS':
			return { ...state, allBookings: state.allBookings };
		case 'SET_BOOKINGS':
			return { ...state, bookings: state.bookings };
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
