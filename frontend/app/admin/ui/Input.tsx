import { ChangeEventHandler, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	type:
		| 'text'
		| 'password'
		| 'email'
		| 'number'
		| 'tel'
		| 'url'
		| 'date'
		| 'time'
		| 'file'
		| 'checkbox';
	placeholder?: string;
	title?: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function Input({
	id,
	type,
	placeholder,
	title,
	onChange,
}: InputProps) {
	return (
		<input
			className=''
			id={id}
			type={type}
			placeholder={placeholder}
			title={title}
			onChange={onChange}
		/>
	);
}
