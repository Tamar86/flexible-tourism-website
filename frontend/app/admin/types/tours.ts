import { Dispatch, ReactNode } from 'react';

export interface Tour {
	name: string;
	description: string; // Required for B2C
	minPrice: number; // Required for B2B
	minGroupSize: number;
	location: string;
	duration: { days: number; nights: number };
	_id: string;
}

export interface TourState {
	allTours: Tour[];
	tours: Tour[];
	tour: Tour;
}

export type ToursAction =
	| { type: 'SET_ALL_TOURS'; payload: Tour[] }
	| { type: 'SET_TOURS'; payload: Tour[] }
	// | { type: 'SET_TOUR'; payload: Tour };
	| { type: 'DELETE_TOUR'; payload: string };

export interface ToursContextType {
	state: TourState;
	dispatch: Dispatch<ToursAction>;
}

export interface ToursProvidersProps {
	children: ReactNode;
}
