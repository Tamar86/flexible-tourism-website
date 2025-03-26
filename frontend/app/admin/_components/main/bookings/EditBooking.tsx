'use client';

import { useEffect, useState } from 'react';
import { useBookings } from '@/app/admin/context/BookingsContext';
import { useCustomer } from '@/app/admin/context/CustomersContext';
import { useEmployees } from '@/app/admin/context/EmployeesContext';
import { usePartners } from '@/app/admin/context/PartnersContext';
import { useTours } from '@/app/admin/context/ToursContext';
import {
	deleteBooking,
	displayAllBookings,
	displayBooking,
} from '@/app/admin/services/bookingsService';
import { displayAllCustomers } from '@/app/admin/services/customersService';
import { displayAllEmployees } from '@/app/admin/services/employeesService';
import { displayAllPartners } from '@/app/admin/services/partnersService';
import { displayAllTours } from '@/app/admin/services/toursService';

import EditBookingForm from './EditBookingForm';
import { useParams, useRouter } from 'next/navigation';
import { handleSubmitBookingFormUpdate } from '@/app/admin/utils/appendBookingFormDataUpdate';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import ConfirmDelete from '@/app/admin/ui/ConfirmDelete';

export default function EditBooking() {
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	const [readOnly, setReadOnly] = useState(true);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);

	const [validated, setValidated] = useState(false);
	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);

	const { state, dispatch } = useBookings();
	const { state: customerState, dispatch: customerDispatch } = useCustomer();
	const { state: partnerState, dispatch: partnerDispatch } = usePartners();
	const { state: tourState, dispatch: tourDispatch } = useTours();
	const { state: employeeState, dispatch: employeeDispatch } = useEmployees();

	const { allPartners } = partnerState;
	const { allTours } = tourState;
	const { allEmployees } = employeeState;
	const { allCustomers } = customerState;
	const { allBookings, bookingFormData } = state;

	useEffect(() => {
		displayAllBookings(dispatch);
		displayAllCustomers(customerDispatch);
		displayAllPartners(partnerDispatch);
		displayAllTours(tourDispatch);
		displayAllEmployees(employeeDispatch);
		displayBooking(dispatch, id);
	}, [
		dispatch,
		customerDispatch,
		partnerDispatch,
		tourDispatch,
		employeeDispatch,
		id,
	]);

	const handleSubmitCustomerForm = (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		handleSubmitBookingFormUpdate(
			event,
			setValidated,
			bookingFormData,
			id,
			setReadOnly,
		);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
			dispatch({ type: 'SET_DOCUMENTS', payload: selectedFiles }); // Dispatch the files
		}
	};

	if (allBookings.length === 0) return <LoadingSpinner />;

	const handleDelete = async function () {
		await deleteBooking(id);
		dispatch({ type: 'DELETE_BOOKING', payload: id });
		router.push('/admin/dashboard/bookings');
	};

	return (
		<div className='flex items-center justify-center'>
			<ConfirmDelete
				handleDelete={handleDelete}
				show={showConfirmDelete}
				handleClose={handleClose}
			/>
			<EditBookingForm
				allEmployees={allEmployees}
				allCustomers={allCustomers}
				allPartners={allPartners}
				allTours={allTours}
				handleSubmitCustomerForm={handleSubmitCustomerForm}
				validated={validated}
				bookingFormData={bookingFormData}
				dispatch={dispatch}
				readOnly={readOnly}
				setReadOnly={setReadOnly}
				handleShow={handleShow}
				handleChange={handleChange}
				id={id}
			/>
		</div>
	);
}
