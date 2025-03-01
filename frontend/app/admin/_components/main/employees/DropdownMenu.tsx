'use client';

import Dropdown from 'react-bootstrap/Dropdown';
import { Employee } from '../../../types/employees';
import { CiMenuKebab } from 'react-icons/ci';
import DeleteEmployeeConfirm from './DeleteEmployeeConfirm';
import { useState } from 'react';
import { deleteEmployee } from '@/app/admin/services/employeesService';

interface DropdownMenuProps {
	employee: Employee; // ✅ Define the type of the employee prop
	id: string;
}

export default function DropdownMenu({ id, employee }: DropdownMenuProps) {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);

	const handleDelete = async function () {
		setShowConfirmDelete(true);
		if (typeof id === 'string') {
			await deleteEmployee(id);
		}
	};

	return (
		<>
			<DeleteEmployeeConfirm
				handleDelete={handleDelete}
				show={showConfirmDelete}
				handleClose={handleClose}
				id={id}
			/>
			<Dropdown>
				<Dropdown.Toggle
					as='button'
					bsPrefix='custom-dropdown-toggle'
					id={employee.idNumber}
				>
					<CiMenuKebab className='size-6' />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item href={`/admin/dashboard/employees/${id}`}>
						Details/Edit
					</Dropdown.Item>
					<Dropdown.Item as='button' onClick={handleShow}>
						Delete
					</Dropdown.Item>
					<Dropdown.Item href={`/admin/dashboard/employees/archive`}>
						Archive
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
}
