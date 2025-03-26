'use client';

import { useEffect, useState } from 'react';
import CustomersTable from './CustomersTable';
import { displayAllCustomers } from '@/app/admin/services/customersService';
import { useCustomer } from '@/app/admin/context/CustomersContext';

import AddNewCustomerForm from './AddNewCustomerForm';
import FormSearch from '@/app/admin/ui/FormSearch';
import Button from '@/app/admin/ui/Button';
import DropDownSort from '@/app/admin/ui/DropDownSort';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function DisplayAllCustomers() {
	const [sortedName, setSortedName] = useState('');
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('Sort By');
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { dispatch } = useCustomer();

	useEffect(() => {
		displayAllCustomers(dispatch);
	}, [dispatch]);

	const handleSort = (field: string | null) => {
		if (!field) return;
		setSortedName(field);
		setTitle(`Sorted`);

		dispatch({ type: 'SORT_CUSTOMERS', payload: field });
	};
	const handleUnsortCustomers = () => {
		setTitle('Sort By'); // Reset title
		displayAllCustomers(dispatch);
		setSortedName('');
	};

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { value } = e.target;
		dispatch({ type: 'SEARCH_BY_NAME', payload: value });
	};

	return (
		<div className='grid gap-4'>
			<div className='flex items-center justify-between  pt-3 pb-3 '>
				<DropDownSort
					onClick={handleUnsortCustomers}
					icons={{
						iconDown: <ChevronDown className='w-4' />,
						iconUp: <ChevronUp className='w-4' />,
					}}
					label={title}
					options={[
						{ label: 'Fullname', value: 'fullname' },
						{ label: 'Country', value: 'country' },
						{ label: 'Most Recent', value: 'createdAt' },
						{ label: 'Oldest', value: 'createdAtOldest' },
					]}
					onSelect={handleSort}
				/>

				<FormSearch
					type='search'
					placeholder='Search by customer name'
					onChange={handleChangeSearch}
				/>

				<Button
					type='button'
					onClick={handleShow}
					label='Add New Customer'
					className='border-1  px-6 py-2 rounded-lg font-bold bg-slate-50 border-slate-600 border-2 text-slate-700 shadow-lg hover:bg-slate-700 hover:text-purple-50'
				/>
			</div>

			<CustomersTable sortedName={sortedName} />
			<AddNewCustomerForm
				show={show}
				setShow={setShow}
				handleClose={handleClose}
			/>
		</div>
	);
}
