// DISPLAY ALL PARTNERS

import axios from 'axios';
import { Tour, ToursAction, TourState } from '../types/tours';
import { SetBooleanState } from '../types/employees';

export const displayAllTours = async (
	dispatch: React.Dispatch<ToursAction>,
) => {
	try {
		const response = await axios.get(
			'http://localhost:5000/api/admin/tours/all',
		);
		console.log('tourResponse', response);
		dispatch({ type: 'SET_ALL_TOURS', payload: response.data.tours });
		dispatch({ type: 'SET_TOURS', payload: response.data.tours });
	} catch (err) {
		console.log(err);
	}
};

// DISPLAY SINGLE EMPLOYEE

export const displayTour = async (
	dispatch: React.Dispatch<ToursAction>,
	id: string,
) => {
	try {
		const response = await axios.get<Tour>(
			`http://localhost:5000/api/tours/tour/${id}`,
		);
		// dispatch({ type: 'SET_TOUR', payload: response.data });
	} catch (err) {
		console.log(err);
	}
};

//UPDATE

export const updateTour = async function (
	formData: FormData,
	id: string,
	dispatch: React.Dispatch<ToursAction>,
) {
	try {
		const response = await axios.patch(
			`http://localhost:5000/api/admin/tours/update/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Ensures FormData is sent correctly
				},
			},
		);
		console.log('updateResponse', response);
	} catch (err) {
		console.log(err);
	}
};

// DELETE TOUR

export const deleteTour = async function (id: string) {
	try {
		await axios.delete(`http://localhost:5000/api/admin/tours/delete/${id}`);
	} catch (err) {
		console.log(err);
	}
};

//CREATE NEW TOUR

export const addNewTour = async (
	formData: FormData,
	dispatch: React.Dispatch<ToursAction>,
	handleClose: () => void,
) => {
	try {
		const response = await axios.post(
			'http://localhost:5000/api/admin/tours/new',
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			},
		);

		console.log('resTour', response);

		if (response.status === 201) {
			handleClose();
			try {
				const response = await axios.get(
					'http://localhost:5000/api/admin/tours/all',
				);
				console.log('tourResponse', response);
				dispatch({ type: 'SET_ALL_TOURS', payload: response.data.tours });
				dispatch({ type: 'SET_TOURS', payload: response.data.tours });
			} catch (err) {
				console.log(err);
			}
		}
	} catch (err) {
		console.error('Error adding employee:', err);
		alert(`Error Creating new tour, ${err}`);
	}
};
