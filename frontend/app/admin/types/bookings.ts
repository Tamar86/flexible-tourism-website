import { Dispatch, ReactNode } from 'react';

export interface Booking {
	bookingType: string;
	customer: string; // Required for B2C
	partner: string; // Required for B2B
	tour: string;
	price: number;
	extraIncome: number;
	isPayed: boolean;
	tourOperator: string;
	tourGuide: string;
	bookingDate: Date;
	tourStartDate: Date;
	tourEndDate: Date;
	status: string;
	notes: string;
	_id: string;
}

export interface BookingsState {
	allBookings: Booking[];
	bookings: Booking[];
	booking: Booking;
}

export type BookingsAction =
	| { type: 'SET_ALL_BOOKINGS'; payload: Booking[] }
	| { type: 'SET_BOOKINGS'; payload: Booking[] };
// | { type: 'SET_BOOKING'; payload: Booking };

export interface BookingsContextType {
	state: BookingsState;
	dispatch: Dispatch<BookingsAction>;
}

export interface BookingsProvidersProps {
	children: ReactNode;
}
