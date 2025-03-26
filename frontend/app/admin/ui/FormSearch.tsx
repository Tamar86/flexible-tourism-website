import { ChangeEventHandler, FormEvent } from 'react';

interface SearchFormProps {
	type?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	name?: string;
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
	children?: React.ReactNode;
}

export default function FormSearch({
	type,
	placeholder,
	onChange,
	name,
	onSubmit,
}: SearchFormProps) {
	return (
		<form onSubmit={onSubmit}>
			<input
				name={name}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				className='h-10 w-64 px-3 outline-transparent focus:border-none focus:ring-2 ring-slate-500 border-slate-400 border-[1px] rounded-lg'
			/>
		</form>
	);
}
