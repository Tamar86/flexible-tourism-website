import { FormEvent } from 'react';

interface FormProps {
	children?: React.ReactNode;
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ children, onSubmit }: FormProps) {
	return (
		<form onSubmit={onSubmit} className='flex flex-col gap-3'>
			{children}
		</form>
	);
}
