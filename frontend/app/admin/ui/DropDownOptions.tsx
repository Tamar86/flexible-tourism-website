import { ReactElement, useEffect, useRef, useState } from 'react';

interface DropDownOptionsProps {
	label?: string;
	options: { label: string; value?: string; onClick?: () => void }[];
	icons?: { iconDown: ReactElement; iconUp: ReactElement };
	icon?: ReactElement;
}

export default function DropDownOptions({
	label,
	icons,
	icon,
	options,
}: DropDownOptionsProps) {
	const [isOpen, setIsOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		// Attach the event listener
		document.addEventListener('mousedown', handleClickOutside);

		// Cleanup function to remove event listener
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='relative' ref={dropdownRef}>
			<button
				type='button'
				title='More options'
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className='flex items-center gap-[2px]'>
					<span>{label}</span>
					{isOpen ? (
						<span>{icons?.iconUp}</span>
					) : (
						<span>{icons?.iconDown}</span>
					)}
					<span>{icon}</span>
				</div>
			</button>

			{isOpen && (
				<div className='absolute bg-white z-50 shadow-lg rounded-md min-w-32 p-3 gap-3 border mt-2 left-6'>
					<div>
						{options.map((option, index) => (
							<div key={index}>
								<button
									type='button'
									className='block hover:bg-slate-200 py-1 px-3 rounded-md'
									onClick={() => {
										if (option.onClick) {
											option.onClick(); // Execute function if available
										} else if (option.value) {
											window.location.href = option.value; // Navigate if value exists
										}
									}}
								>
									{option.label}
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
