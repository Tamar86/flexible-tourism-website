import { Dispatch, ReactNode } from 'react';
import { Customer } from './customers';
import { Partner } from './partners';

export interface Booking {
	bookingType: string;
	customer: string; // Required for B2C
	partner: string; // Required for B2B
	tour: string;
	price: number;
	extraIncome: number;
	isPaid: boolean;
	tourOperator: string;
	tourGuide: string[];
	driver: string[];
	bookingDate: Date | null;
	tourStartDate: Date | null;
	tourEndDate: Date | null;
	status: string;
	groupSize: number;
	documents: (File | string)[];
	accommodations: string[];
	notes: string;
	_id: string;
	createdAt: string;
}

export interface BookingsState {
	allBookings: Booking[];
	bookings: Booking[];
	booking: Booking;
	bookingFormData: Booking;
}

export type BookingsAction =
	| { type: 'SET_ALL_BOOKINGS'; payload: Booking[] }
	| { type: 'SET_BOOKINGS'; payload: Booking[] }
	| { type: 'SET_BOOKING_FORM_DATA'; payload: Booking }
	| { type: 'SET_BOOKING'; payload: Booking }
	| { type: 'SORT_BOOKINGS'; payload: string }
	| {
			type: 'SEARCH_BY_NAME';
			payload: { value: string; customer: Customer[]; partner: Partner[] };
	  }
	| { type: 'DELETE_BOOKING'; payload: string }
	| { type: 'DELETE_DOCUMENT'; payload: string }
	| { type: 'SET_DOCUMENTS'; payload: (File | string)[] }
	| {
			type: 'SET_BOOKING_FORM_DATA_INPUT';
			payload: { name: string; value: string | number };
	  }
	| { type: 'SET_BOOKING_TYPE'; payload: string }
	| { type: 'SET_CUSTOMER'; payload: string }
	| { type: 'SET_PARTNER'; payload: string }
	| { type: 'SET_TOUR'; payload: string }
	| { type: 'SET_TOUR_OPERATOR'; payload: string }
	| { type: 'SET_TOUR_GUIDE'; payload: string[] }
	| { type: 'SET_TOUR_DRIVER'; payload: string[] }
	| { type: 'SET_ACCOMMODATIONS'; payload: string[] }
	| { type: 'SET_BOOKING_DATE'; payload: Date | null }
	| { type: 'SET_TOUR_START_DATE'; payload: Date | null }
	| { type: 'SET_TOUR_END_DATE'; payload: Date | null }
	| { type: 'SET_GROUP_SIZE'; payload: number }
	| { type: 'SET_PRICE'; payload: number }
	| { type: 'SET_EXTRA_INCOME'; payload: number }
	| { type: 'SET_IS_PAID'; payload: boolean }
	| { type: 'SET_STATUS'; payload: string }
	| { type: 'SET_NOTES'; payload: string };

export interface BookingsContextType {
	state: BookingsState;
	dispatch: Dispatch<BookingsAction>;
}

export interface BookingsProvidersProps {
	children: ReactNode;
}

export interface BookingFormProps {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	handleClose: () => void;
}
