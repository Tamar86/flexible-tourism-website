import { useEmployees } from '@/app/admin/context/EmployeesContext';
import { DeleteEmployee } from '@/app/admin/types/employees';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteEmployeeConfirm({
	handleDelete,
	id,
	show,
	handleClose,
}: DeleteEmployee) {
	const { dispatch } = useEmployees();
	function deleteEmployee() {
		handleDelete();
		handleClose();
		dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
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
