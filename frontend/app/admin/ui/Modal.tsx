import Button from './Button';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title: string;
}

export default function Modal({
	isOpen,
	onClose,
	children,
	title,
}: ModalProps) {
	if (!isOpen) return null; // Don't render the modal if it's not open

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose(); // Close the modal when clicking on the overlay
		}
	};
	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-scroll p-5'
			onClick={handleOverlayClick}
		>
			<div className='bg-white p-6 mt-25 rounded-lg shadow-lg w-1/2'>
				<div className='flex justify-between items-center'>
					<h2 className='text-xl font-semibold'>{title}</h2>

					<Button type='button' className='' label='x' onClick={onClose} />
				</div>
				<div className='mt-4'>{children}</div>
			</div>
		</div>
	);
}
