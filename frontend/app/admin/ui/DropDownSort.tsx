'use client';

import { ReactElement, useEffect, useRef, useState } from 'react';

interface DropdownOption {
	label: string;
	value: string; // Equivalent to eventKey
}

interface DropDownProps {
	onClick: () => void;
	label: string;
	options: DropdownOption[];
	onSelect: (option: string) => void;
	icons: { iconDown: ReactElement; iconUp: ReactElement };
}

export default function DropDownSort({
	onClick,
	label,
	options,
	onSelect,
	icons,
}: DropDownProps) {
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

	const unSort = () => {
		onClick();
		setIsOpen(false);
	};

	return (
		<div className='relative inline-block ' ref={dropdownRef}>
			<button type='button' onClick={() => setIsOpen(!isOpen)}>
				<div className='flex items-center gap-1'>
					<span>{label}</span>

					{isOpen ? <span>{icons.iconUp}</span> : <span>{icons.iconDown}</span>}
				</div>
			</button>

			{isOpen && (
				<div className='absolute grid items-center justify-center  mt-3 bg-white border-2  border-slate-100 rounded-lg shadow-lg w-fit min-w-48'>
					<div
						onClick={unSort}
						className='py-2 text-center  cursor-pointer  border-slate-500 border-b-[1px] hover:bg-slate-200 hover:rounded-md '
					>
						UnSort
					</div>
					<ul className=' grid items-center w-full justify-center p-0'>
						{options.map((option, index) => (
							<li
								className='cursor-pointer border-t-[1px] py-2 px-4 hover:bg-slate-200 rounded-md'
								key={index}
								onClick={() => {
									onSelect(option.value);
									setIsOpen(false);
								}}
							>
								<div>
									<span>{option.label}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
