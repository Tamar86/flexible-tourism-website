'use client';

import { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { useEmployees } from '@/app/admin/context/EmployeesContext';
import { formatFieldName } from '@/app/admin/helpers/formatSortbyEmployees';
import {
	addNewEmployee,
	displayAllEmployees,
} from '@/app/admin/services/employeesService';
import EmployeesForm from './AddNewEmployeesForm';
import EmployeesTable from './EmployeesTable';

export default function DisplayAllEmployees() {
	const { state, dispatch } = useEmployees();

	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('Sort Employees By');
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		displayAllEmployees(dispatch);
	}, [dispatch]);

	const handleAddEmployee = async () => {
		addNewEmployee(state, setShow, dispatch);
	};

	const handleSort = (field: string | null) => {
		if (!field) return;
		console.log('Sorting by:', field);
		setTitle(`Sorted By: ${formatFieldName(field)} (A-Z)`);

		dispatch({ type: 'SORT_EMPLOYEES', payload: field });
	};

	const handleUnsortEmployees = () => {
		displayAllEmployees(dispatch);
	};

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { value } = e.target;

		dispatch({ type: 'SEARCH_BY_NAME', payload: value });
	};

	return (
		<div className=''>
			<div className='mb-3 flex items-center justify-between'>
				<DropdownButton onSelect={handleSort} title={title} variant='link'>
					<Dropdown.Item onClick={handleUnsortEmployees}>Unsort</Dropdown.Item>
					<Dropdown.Item eventKey='firstName'>First Name (A-Z)</Dropdown.Item>
					<Dropdown.Item eventKey='employmentType'>
						Employment Type (A-Z)
					</Dropdown.Item>
					<Dropdown.Item eventKey='position'>Position (A-Z)</Dropdown.Item>
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

			<EmployeesTable />

			<EmployeesForm
				show={show}
				setShow={setShow}
				handleClose={handleClose}
				addNewEmployee={handleAddEmployee}
			/>
		</div>
	);
}
