'use client';
import { useState } from 'react';

import { Ellipsis } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import DropDownOptions from './DropDownOptions';

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
			<Modal isOpen={showConfirmDelete} onClose={handleClose} title='title'>
				<Button
					onClick={handleClose}
					label='Cancel'
					className=''
					type='button'
				/>
				<Button
					onClick={itemDelete}
					label='Delete'
					className=''
					type='button'
				/>
			</Modal>

			<DropDownOptions
				icon={<Ellipsis className='w-4' />}
				options={[
					{ label: 'View', value: `/admin/dashboard/${pathTitle}/${id}/view` },
					{ label: 'Edit', value: `/admin/dashboard/${pathTitle}/${id}/edit` },
					{ label: 'Delete', onClick: handleShow }, // Function action
				]}
			/>
		</>
	);
}
