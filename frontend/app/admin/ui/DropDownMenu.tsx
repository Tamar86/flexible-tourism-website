'use client';
import { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import { CiMenuKebab } from 'react-icons/ci';

import { Button, Modal } from 'react-bootstrap';

interface DropdownMenuProps {
	id: string;
	handleDelete: (id: string) => Promise<void>;
	pathTitle: string;
}

export default function DropdownMenu({
	id,
	handleDelete,
	pathTitle,
}: DropdownMenuProps) {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);

	const itemDelete = async function () {
		setShowConfirmDelete(true);
		handleDelete(id);
		handleClose();
	};

	return (
		<>
			<Modal show={showConfirmDelete} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to delete employee?</Modal.Body>
				<Modal.Footer>
					<Button variant='outline-secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button variant='outline-danger' onClick={itemDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>

			<Dropdown>
				<Dropdown.Toggle
					as='button'
					bsPrefix='custom-dropdown-toggle'
					id={id} //maybe i would have to use tour._id ??
				>
					<CiMenuKebab className='size-5' />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item href={`/admin/dashboard/${pathTitle}/${id}`}>
						Details/Edit
					</Dropdown.Item>
					<Dropdown.Item as='button' onClick={handleShow}>
						Delete
					</Dropdown.Item>
					<Dropdown.Item href={`/admin/dashboard/${pathTitle}/archive`}>
						Archive
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</>
	);
}
