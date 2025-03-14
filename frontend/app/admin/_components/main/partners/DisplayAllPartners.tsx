'use client';

import { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { usePartners } from '@/app/admin/context/PartnersContext';
import { formatFieldNamePartner } from '@/app/admin/helpers/formatSortByPartners';
import { displayAllPartners } from '@/app/admin/services/partnersService';
import AddNewPartnerForm from './AddNewPartnerForm';
import PartnersTable from './PartnersTable';

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
		console.log('Sorting by:', field);
		setTitle(`Sorted By: ${formatFieldNamePartner(field)} (A-Z)`);

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
				<DropdownButton onSelect={handleSort} title={title} variant='link'>
					<Dropdown.Item onClick={handleUnsortPartners}>Unsort</Dropdown.Item>
					<Dropdown.Item eventKey='companyName'>
						Company Name (A-Z)
					</Dropdown.Item>
					<Dropdown.Item eventKey='country'>Country (A-Z)</Dropdown.Item>
					<Dropdown.Item eventKey='companyRepresentative'>
						Representative (A-Z)
					</Dropdown.Item>
				</DropdownButton>

				<Form className='d-flex'>
					<Form.Control
						type='search'
						placeholder='Search by name'
						className='me-2'
						aria-label='Search'
						onChange={handleChangeSearch}
					/>
				</Form>
				<Button variant='outline-primary' onClick={handleShow}>
					Add New Employee
				</Button>
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
