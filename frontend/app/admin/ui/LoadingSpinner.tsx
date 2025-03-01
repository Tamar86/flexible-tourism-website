import { Spinner } from 'react-bootstrap';

export default function LoadingSpinner() {
	return (
		<div className='w-full flex items-center justify-center min-h-screen'>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	);
}
