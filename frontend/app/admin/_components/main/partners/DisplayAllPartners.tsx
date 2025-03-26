'use client';

import { useEffect, useState } from 'react';

import { usePartners } from '@/app/admin/context/PartnersContext';

import { displayAllPartners } from '@/app/admin/services/partnersService';
import AddNewPartnerForm from './AddNewPartnerForm';
import PartnersTable from './PartnersTable';
import FormSearch from '@/app/admin/ui/FormSearch';
import DropDownSort from '@/app/admin/ui/DropDownSort';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Button from '@/app/admin/ui/Button';

export default function DisplayAllPartners() {
	const { dispatch } = usePartners();

	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('Sort Partners By');
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		displayAllPartners(dispatch);
	}, [dispatch]);

	const handleSort = (field: string | null) => {
		if (!field) return;

		setTitle(`Sorted`);

		dispatch({ type: 'SORT_PARTNERS', payload: field });
	};

	const handleUnsortPartners = () => {
		displayAllPartners(dispatch);
	};

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { value } = e.target;

		dispatch({ type: 'SEARCH_BY_NAME', payload: value });
	};
	return (
		<div>
			<div className='mb-3 flex items-center justify-between'>
				<DropDownSort
					onClick={handleUnsortPartners}
					icons={{
						iconDown: <ChevronDown className='w-4' />,
						iconUp: <ChevronUp className='w-4' />,
					}}
					label={title}
					options={[
						{ label: 'Company Name', value: 'companyName' },
						{ label: 'Country', value: 'country' },
						{ label: 'Representative', value: 'companyRepresentative' },
					]}
					onSelect={handleSort}
				/>

				<FormSearch
					type='search'
					placeholder='Search by partner name'
					onChange={handleChangeSearch}
				/>

				<Button
					label='Add New Partner'
					className=''
					type='button'
					onClick={handleShow}
				/>
			</div>

			<PartnersTable />
			<AddNewPartnerForm
				show={show}
				setShow={setShow}
				handleClose={handleClose}
			/>
		</div>
	);
}
