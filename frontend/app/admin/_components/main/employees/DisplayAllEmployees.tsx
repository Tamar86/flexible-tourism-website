'use client';

import { useEffect, useState } from 'react';

import { useEmployees } from '@/app/admin/context/EmployeesContext';
import { formatFieldName } from '@/app/admin/helpers/formatSortbyEmployees';
import { displayAllEmployees } from '@/app/admin/services/employeesService';
import EmployeesForm from './AddNewEmployeesForm';
import EmployeesTable from './EmployeesTable';
import FormSearch from '@/app/admin/ui/FormSearch';
import DropDownSort from '@/app/admin/ui/DropDownSort';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Button from '@/app/admin/ui/Button';

export default function DisplayAllEmployees() {
	const { dispatch, state } = useEmployees();
	const { allEmployees, idNumbers } = state;

	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('Sort Employees By');
	const handleClose = () => setShow(false);

	useEffect(() => {
		displayAllEmployees(dispatch);
	}, [dispatch]);

	const handleAddNewEmployee = () => {
		setShow(true);
		const ids = allEmployees.map(employee => employee.idNumber);
		dispatch({ type: 'SET_ID_NUMBERS', payload: ids });
		// setIdNumbers(ids);
	};
	console.log('ids', idNumbers);
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
		<div className='grid gap-4'>
			<div className='flex items-center justify-between  pt-3 pb-3 '>
				<DropDownSort
					onClick={handleUnsortEmployees}
					icons={{
						iconDown: <ChevronDown className='w-4' />,
						iconUp: <ChevronUp className='w-4' />,
					}}
					label={title}
					options={[
						{ label: 'First Name', value: 'firstName' },
						{ label: 'Employment Type', value: 'employmentType' },
						{ label: 'Position', value: 'position' },
					]}
					onSelect={handleSort}
				/>

				<FormSearch
					type='search'
					placeholder='Search by employee name'
					onChange={handleChangeSearch}
				/>

				<Button
					label='Add New Employee'
					className=''
					type='button'
					onClick={handleAddNewEmployee}
				/>
			</div>

			<EmployeesTable />

			<EmployeesForm show={show} setShow={setShow} handleClose={handleClose} />
		</div>
	);
}
