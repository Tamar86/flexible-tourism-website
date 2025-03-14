'use client';

import Dropdown from 'react-bootstrap/Dropdown';
import { CiMenuKebab } from 'react-icons/ci';
import { useState } from 'react';
import DeletePartnerConfirm from './DeletePartnerConfirm';
import { deletePartner } from '@/app/admin/services/partnersService';
import { Partner } from '@/app/admin/types/partners';

interface DropdownMenuProps {
	partner: Partner; // ✅ Define the type of the employee prop
	id: string;
}

export default function PartnerDropdownMenu({
	id,
	partner,
}: DropdownMenuProps) {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);

	const handleDelete = async function () {
		setShowConfirmDelete(true);
		if (typeof id === 'string') {
			await deletePartner(id);
		}
	};

	return (
		<>
			<DeletePartnerConfirm
				handleDelete={handleDelete}
				show={showConfirmDelete}
				handleClose={handleClose}
				id={id}
			/>
			<Dropdown>
				<Dropdown.Toggle
					as='button'
					bsPrefix='custom-dropdown-toggle'
					id={partner._id}
				>
					<CiMenuKebab className='size-5' />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item href={`/admin/dashboard/partners/${id}`}>
						Details/Edit
					</Dropdown.Item>
					<Dropdown.Item as='button' onClick={handleShow}>
						Delete
					</Dropdown.Item>
					<Dropdown.Item href={`/admin/dashboard/partners/archive`}>
						Archive
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
}
