import axios, { AxiosError } from 'axios';
import { BookingsAction } from '../types/bookings';
import { SetBooleanState } from '../types/employees';

export const displayAllBookings = async (
	dispatch: React.Dispatch<BookingsAction>,
) => {
	try {
		const response = await axios.get(
			'http://localhost:5000/api/admin/bookings/all',
		);
		console.log('res', response);
		dispatch({ type: 'SET_ALL_BOOKINGS', payload: response.data.allBookings });
		dispatch({ type: 'SET_BOOKINGS', payload: response.data.allBookings });
	} catch (err) {
		console.log(err);
	}
};

export const displayBooking = async (
	dispatch: React.Dispatch<BookingsAction>,
	id: string,
) => {
	try {
		const response = await axios.get(
			`http://localhost:5000/api/admin/bookings/booking/${id}`,
		);

		console.log('resBooking', response);

		dispatch({ type: 'SET_BOOKING', payload: response.data.booking });
	} catch (err) {
		console.log(err);
	}
};

export const addNewBooking = async (
	formData: FormData,
	setShow: SetBooleanState,
	dispatch: React.Dispatch<BookingsAction>,
): Promise<void> => {
	console.log('formdata', formData);
	try {
		const response = await axios.post(
			'http://localhost:5000/api/admin/bookings/new',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		const response2 = await axios.get(
			'http://localhost:5000/api/admin/bookings/all',
		);

		if (response.status === 201) {
			setShow(false);
			dispatch({
				type: 'SET_ALL_BOOKINGS',
				payload: response2.data.allBookings,
			});
			dispatch({ type: 'SET_BOOKINGS', payload: response2.data.allBookings });
		} else {
			console.error('Error adding partner', response.data);
		}
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			console.error('Error adding partner:', err.response);
			alert(`There was an issue adding the partner: ${err.message}`);
		}
	}
};

export const deleteBooking = async function (id: string) {
	try {
		await axios.delete(`http://localhost:5000/api/admin/bookings/delete/${id}`);
	} catch (err) {
		console.log(err);
	}
};

export const updateBooking = async function (formData: FormData, id: string) {
	try {
		const response = await axios.patch(
			`http://localhost:5000/api/admin/bookings/update/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Ensures FormData is sent correctly
				},
			},
		);
		if (response.status === 200) {
		}
	} catch (err) {
		console.log(err);
	}
};

export const deleteBookingsDocument = async (
	doc: string,
	dispatch: React.Dispatch<BookingsAction>,
) => {
	const parts = doc.split('/');
	const fileName = parts[parts.length - 1];
	const url = `/uploads/booking/${fileName}`;
	console.log('filename', fileName);

	try {
		const response = await fetch(
			`http://localhost:5000/api/admin/bookings/delete-document`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fileName }),
			},
		);

		if (response.ok) {
			console.log('Document deleted successfully');
			dispatch({ type: 'DELETE_DOCUMENT', payload: url });
		} else {
			console.error('Failed to delete document');
		}
	} catch (error) {
		console.error('Error:', error);
	}
};
