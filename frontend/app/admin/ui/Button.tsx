import { MouseEventHandler } from 'react';

interface ButtonProps {
	label: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className: string;
	type: 'submit' | 'reset' | 'button';
}

export default function Button({
	label,
	onClick,
	className,
	type,
}: ButtonProps) {
	return (
		<button className={className} type={type} onClick={onClick}>
			{label}
		</button>
	);
}
