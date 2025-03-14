'use client';

import { createContext, useContext, useReducer } from 'react';
import {
	ToursAction,
	ToursContextType,
	ToursProvidersProps,
	TourState,
} from '../types/tours';

const emptyTour = {
	name: '',
	description: '',
	minPrice: 0,
	minGroupSize: 0,
	location: '',
	duration: { days: 0, nights: 0 },
	_id: '',
};

////

const initialToursState = {
	allTours: [],
	tours: [],
	tour: emptyTour,
};

const toursReducer = (state: TourState, action: ToursAction) => {
	switch (action.type) {
		case 'SET_ALL_TOURS':
			return { ...state, allTours: action.payload };
		case 'SET_TOURS':
			return { ...state, bookings: action.payload };
		case 'DELETE_TOUR':
			return {
				...state,
				allTours: state.allTours.filter(emp => emp._id !== action.payload),
			};
	}
};

export const ToursContext = createContext<ToursContextType>({
	state: initialToursState,
	dispatch: () => {
		throw new Error('dispatch called outside of ToursProvider');
	},
});

export const ToursProvider = ({ children }: ToursProvidersProps) => {
	const [state, dispatch] = useReducer(toursReducer, initialToursState);

	return (
		<ToursContext.Provider value={{ state, dispatch }}>
			{children}
		</ToursContext.Provider>
	);
};

export function useTours() {
	const context = useContext(ToursContext);
	if (!context) {
		throw new Error('useTours must be used within a ToursProvider');
	}
	return context;
}
