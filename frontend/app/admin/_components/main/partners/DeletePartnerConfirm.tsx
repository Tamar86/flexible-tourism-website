import { usePartners } from '@/app/admin/context/PartnersContext';
import { DeletePartner } from '@/app/admin/types/partners';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeletePartnerConfirm({
	handleDelete,
	id,
	show,
	handleClose,
}: DeletePartner) {
	const { dispatch } = usePartners();
	function deleteEmployee() {
		handleDelete();
		handleClose();
		dispatch({ type: 'DELETE_PARTNER', payload: id });
	}
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete employee?</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-secondary' onClick={handleClose}>
					Cancel
				</Button>
				<Button variant='outline-danger' onClick={deleteEmployee}>
					Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
