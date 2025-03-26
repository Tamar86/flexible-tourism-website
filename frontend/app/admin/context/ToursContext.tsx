'use client';

import { createContext, useContext, useReducer } from 'react';
import {
	ToursAction,
	ToursContextType,
	ToursProvidersProps,
	TourState,
} from '../types/tours';
import { getFieldValueTour } from '../helpers/formatSortbyTours';

const emptyTour = {
	name: '',
	location: '',
	duration: { days: 0, nights: 0 },
	minGroupSize: 0,
	minPrice: 0,
	description: '',
	notes: '',
	_id: '',
};

////

const initialToursState: TourState = {
	allTours: [],
	tours: [],
	tour: emptyTour,
	toursFormData: emptyTour,
};

const toursReducer = (state: TourState, action: ToursAction) => {
	switch (action.type) {
		case 'SET_ALL_TOURS':
			return { ...state, allTours: action.payload, tours: action.payload };
		case 'SET_TOURS':
			return { ...state, allTours: action.payload };

		case 'SET_TOUR_FORM':
			const id = action.payload;
			const tour =
				(state.allTours.length > 0 &&
					state.allTours.find(el => el._id === id)) ||
				emptyTour;
			return {
				...state,
				tour: tour,
				toursFormData: tour,
			};

		case 'SET_TOUR_FORM_DATA_INPUT': {
			const { name, value } = action.payload;
			return {
				...state,
				toursFormData: { ...state.toursFormData, [name]: value },
			};
		}
		case 'SET_DURATION_FIELD': {
			const { field, value } = action.payload;
			return {
				...state,
				toursFormData: {
					...state.toursFormData,
					duration: { ...state.toursFormData.duration, [field]: value },
				},
			};
		}
		case 'DELETE_TOUR':
			return {
				...state,
				allTours: state.allTours.filter(emp => emp._id !== action.payload),
			};
		case 'SORT_TOURS': {
			const field = action.payload;

			console.log(field);
			const sortedTours = [...state.allTours].sort((a, b) => {
				const valueA = getFieldValueTour(a, field);
				const valueB = getFieldValueTour(b, field);
				// Check if both values are numbers
				if (typeof valueA === 'number' && typeof valueB === 'number') {
					return valueA - valueB; // Numeric sorting
				}

				// Otherwise, assume they are strings and use localeCompare()
				return String(valueA).localeCompare(String(valueB));
			});
			return { ...state, allTours: sortedTours };
		}

		case 'SEARCH_BY_NAME': {
			const searchTerm = action.payload.toLowerCase();
			const filteredTours = state.tours.filter(
				(
					tour, // needs to handle the case when there are no matches
				) => tour.name.toLowerCase().startsWith(searchTerm),
			);

			return { ...state, allTours: filteredTours };
		}
		case 'SET_TOUR_NAME':
			return {
				...state,
				toursFormData: { ...state.toursFormData, name: action.payload },
			};
		case 'SET_TOUR_LOCATION':
			return {
				...state,
				toursFormData: { ...state.toursFormData, location: action.payload },
			};
		case 'SET_MIN_PRICE':
			return {
				...state,
				toursFormData: { ...state.toursFormData, minPrice: action.payload },
			};
		case 'SET_MIN_GROUP_SIZE':
			return {
				...state,
				toursFormData: { ...state.toursFormData, minGroupSize: action.payload },
			};
		case 'SET_TOUR_DESCRIPTION':
			return {
				...state,
				toursFormData: { ...state.toursFormData, description: action.payload },
			};
		case 'SET_NOTES':
			return {
				...state,
				toursFormData: { ...state.toursFormData, notes: action.payload },
			};
		case 'SET_DURATION_DAYS':
			return {
				...state,
				toursFormData: {
					...state.toursFormData,
					duration: {
						...state.toursFormData.duration,
						days: action.payload,
					},
				},
			};
		case 'SET_DURATION_NIGHTS':
			return {
				...state,
				toursFormData: {
					...state.toursFormData,
					duration: {
						...state.toursFormData.duration,
						nights: action.payload,
					},
				},
			};
		// case 'RESET_TOUR_STATE':
		// return { ...initialToursState };
		default:
			return state;
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
