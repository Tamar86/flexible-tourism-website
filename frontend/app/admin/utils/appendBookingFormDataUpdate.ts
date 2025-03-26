import { Dispatch } from 'react';
import { Booking, BookingsAction } from '../types/bookings';
import { addNewBooking, updateBooking } from '../services/bookingsService';
import { SetBooleanState } from '../types/employees';

export const handleSubmitBookingFormUpdate = async (
	event: React.FormEvent<HTMLFormElement>,
	setValidated: Dispatch<boolean>,
	bookingFormData: Booking,
	id: string,
	setReadOnly: Dispatch<boolean>,
) => {
	event.preventDefault();
	const form = event.currentTarget;
	if (!form.checkValidity()) {
		event.stopPropagation();
		setValidated(true);
		return;
	}

	try {
		// Prepare FormData for submission

		const formData = new FormData();

		const {
			bookingType,
			customer,
			partner,
			tour,
			price,
			extraIncome,
			isPaid,
			tourOperator,
			tourGuide,
			driver,
			bookingDate,
			tourStartDate,
			tourEndDate,
			status,
			groupSize,
			documents,
			accommodations,
			notes,
		} = bookingFormData;

		formData.append('bookingType', bookingType);
		formData.append('customer', customer);
		formData.append('partner', partner);
		formData.append('tour', tour);
		formData.append('price', price.toString());
		formData.append('extraIncome', extraIncome.toString());
		formData.append('isPaid', isPaid.toString());
		formData.append('tourOperator', tourOperator);
		formData.append('status', status);
		formData.append('notes', notes);
		formData.append('groupSize', groupSize.toString());

		if (bookingDate) {
			formData.append('bookingDate', new Date(bookingDate).toISOString());
		}
		if (tourStartDate) {
			formData.append('tourStartDate', new Date(tourStartDate).toISOString());
		}
		if (tourEndDate) {
			formData.append('tourEndDate', new Date(tourEndDate).toISOString());
		}
		if (tourGuide && tourGuide.length > 0) {
			tourGuide.forEach(el => {
				formData.append('tourGuide', el);
			});
		}
		if (driver && driver.length > 0) {
			driver.forEach(el => {
				formData.append('driver', el);
			});
		}
		if (accommodations && accommodations.length > 0) {
			accommodations.forEach(el => {
				formData.append('accommodations', el);
			});
		}

		if (documents && documents.length > 0) {
			documents.forEach(file => {
				formData.append('documents', file);
			});
		}

		// Debugging: Log FormData entries
		for (const [key, value] of formData.entries()) {
			console.log(key, value);
		}

		// Submit the form
		await updateBooking(formData, id);

		setValidated(true);
		setReadOnly(true);
	} catch (err) {
		console.error('Error in handleSubmit:', err);
	}
};
