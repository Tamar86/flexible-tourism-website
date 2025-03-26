'use client';

import { useBookings } from '@/app/admin/context/BookingsContext';
import { useCustomer } from '@/app/admin/context/CustomersContext';

import { usePartners } from '@/app/admin/context/PartnersContext';

import { displayAllBookings } from '@/app/admin/services/bookingsService';
import { displayAllCustomers } from '@/app/admin/services/customersService';

import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import AddNewBookingForm from './AddNewBookingForm';
import BookingsTable from './BookingsTable';

import Button from '@/app/admin/ui/Button';

import FormSearch from '@/app/admin/ui/FormSearch';
import DropDownSort from '@/app/admin/ui/DropDownSort';

export default function DisplayAllBookings() {
	const [title, setTitle] = useState('Sort By');
	const [sortedName, setSortedName] = useState('');

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	/////////////////////////////////////////////////////////////////////////////////////////////
	const { state, dispatch } = useBookings();
	const { state: customerState, dispatch: customerDispatch } = useCustomer();
	const { state: partnerState } = usePartners();

	const { allCustomers } = customerState;
	const { allPartners } = partnerState;
	const { allBookings } = state;

	console.log('all', allBookings);
	console.log('allCustomers', allCustomers);

	useEffect(() => {
		displayAllBookings(dispatch);
		displayAllCustomers(customerDispatch);
	}, [dispatch, customerDispatch]);

	const handleSort = (field: string | null) => {
		if (!field) return;
		setSortedName(field);
		// setTitle(`Sorted By: ${formatFieldNameBooking(field)}`);
		setTitle(`Sorted`);
		dispatch({ type: 'SORT_BOOKINGS', payload: field });
	};
	const handleUnsortBookings = () => {
		setTitle('Sort By'); // Reset title
		displayAllBookings(dispatch);
		setSortedName('');
	};
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { value } = e.target;
		const customer = allCustomers.map(customer => customer);
		const partner = allPartners.map(partner => partner);

		dispatch({
			type: 'SEARCH_BY_NAME',
			payload: { value, customer, partner },
		});
	};

	if (allBookings.length === 0 || allCustomers.length === 0)
		return <LoadingSpinner />;

	return (
		<div className='grid gap-4'>
			<div className='flex items-center justify-between  pt-3 pb-3 '>
				<DropDownSort
					onClick={handleUnsortBookings}
					icons={{
						iconDown: <ChevronDown className='w-4' />,
						iconUp: <ChevronUp className='w-4' />,
					}}
					label={title}
					options={[
						{ label: 'Booking Type', value: 'bookingType' },
						{ label: 'Group Size', value: 'groupSize' },
						{ label: 'Price', value: 'price' },
						{ label: 'Created At', value: 'createdAt' },
						{ label: 'Tour Start Date', value: 'tourStartDate' },
						{ label: 'Is Paid', value: 'isPaid' },
					]}
					onSelect={handleSort}
				/>

				<FormSearch
					type='search'
					placeholder='Search by client name'
					onChange={handleChangeSearch}
				/>

				<Button
					type='button'
					label='Add new booking'
					onClick={handleShow}
					className='border-1  px-6 py-2 rounded-lg font-bold bg-slate-50 border-slate-600 border-2 text-slate-700 shadow-lg hover:bg-slate-700 hover:text-purple-50'
				/>
			</div>

			<BookingsTable sortedName={sortedName} />

			<AddNewBookingForm
				show={show}
				setShow={setShow}
				handleClose={handleClose}
			/>
		</div>
	);
}
