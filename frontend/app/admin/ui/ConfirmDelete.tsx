import Button from './Button';
import Modal from './Modal';

export interface DeleteItem {
	show: boolean;
	handleDelete: () => void;
	handleClose: () => void;
}

export default function ConfirmDelete({
	handleDelete,
	show,
	handleClose,
}: DeleteItem) {
	function deleteItem() {
		handleDelete();
		handleClose();
	}
	return (
		<Modal title='Delete' isOpen={show} onClose={handleClose}>
			<Button className='' type='button' label='Delete' onClick={handleClose} />

			<Button className='' type='button' label='Delete' onClick={deleteItem} />
		</Modal>
	);
}
