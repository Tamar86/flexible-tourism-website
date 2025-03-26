import { Dispatch, ReactNode } from 'react';

export interface Tour {
	name: string;
	location: string;
	description: string;
	minPrice: number;
	minGroupSize: number;
	duration: { days: number; nights: number };
	notes: string;
	_id: string;
}

export interface TourState {
	allTours: Tour[];
	tours: Tour[];
	tour: Tour;
	toursFormData: Tour;
}

export type ToursAction =
	| { type: 'SET_ALL_TOURS'; payload: Tour[] }
	| { type: 'SET_TOURS'; payload: Tour[] }
	| { type: 'SET_TOUR,'; payload: Tour }
	| { type: 'SET_TOUR_FORM'; payload: string }
	| {
			type: 'SET_DURATION_FIELD';
			payload: { field: string; value: number };
	  }
	| {
			type: 'SET_TOUR_FORM_DATA_INPUT';
			payload: { name: string; value: string };
	  }
	| { type: 'SET_TOUR_NAME'; payload: string }
	| { type: 'SET_TOUR_LOCATION'; payload: string }
	| { type: 'SET_DURATION_DAYS'; payload: number }
	| { type: 'SET_DURATION_NIGHTS'; payload: number }
	| { type: 'SET_MIN_GROUP_SIZE'; payload: number }
	| { type: 'SET_MIN_PRICE'; payload: number }
	| { type: 'SET_TOUR_DESCRIPTION'; payload: string }
	| { type: 'SET_NOTES'; payload: string }
	| { type: 'DELETE_TOUR'; payload: string }
	| { type: 'SORT_TOURS'; payload: string }
	| { type: 'SEARCH_BY_NAME'; payload: string };

export interface ToursContextType {
	state: TourState;
	dispatch: Dispatch<ToursAction>;
}

export interface ToursProvidersProps {
	children: ReactNode;
}
