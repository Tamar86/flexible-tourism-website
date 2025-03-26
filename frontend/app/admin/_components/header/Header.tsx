'use client';

import { useAuth } from '../../context/AuthContext';
import { useLogout } from './logout';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

import DropDownOptions from '../../ui/DropDownOptions';

function Header() {
	const { state, dispatch } = useAuth();
	const { loggedIn } = state;
	const logout = useLogout();
	const pathname = usePathname();

	useEffect(() => {
		dispatch({ type: 'PAGE_ACTIVE', payload: pathname });
	}, [dispatch, pathname]);

	return (
		<header className='grid grid-cols-2 justify-between px-14 py-3 bg-slate-50 border-[1px] shadow-xl'>
			<div className='flex items-center'>
				<Link href='/admin/dashboard'>LOGO</Link>
			</div>

			{loggedIn ? (
				<nav>
					<ul className='nav-list flex items-center justify-end h-full gap-6 text-slate-700  '>
						<li>
							<Link href='/admin/dashboard'>Home</Link>
						</li>
						<li>
							<Link href='/admin/dashboard/bookings'>Bookings</Link>
						</li>
						<li>
							<Link href='/admin/dashboard/tours'>Tours</Link>
						</li>
						<li>
							<Link href='/admin/dashboard/employees'>Employees</Link>
						</li>
						<li>
							<DropDownOptions
								label='Clients'
								icons={{
									iconDown: <ChevronDown className='w-4 cursor-pointer' />,
									iconUp: <ChevronUp className='w-4 cursor-pointer' />,
								}}
								options={[
									{ label: 'Partner', value: '/admin/dashboard/partners' },
									{ label: 'Customer', value: '/admin/dashboard/customers' },
								]}
							/>
						</li>
						<li>
							<DropDownOptions
								label='Account'
								icons={{
									iconDown: <ChevronDown className='w-4 cursor-pointer' />,
									iconUp: <ChevronUp className='w-4 cursor-pointer' />,
								}}
								options={[
									{ label: 'Name S', value: '#' },
									{ label: 'Profile', value: '#' },
									{ label: 'Log out', onClick: logout },
								]}
							/>
						</li>
					</ul>
				</nav>
			) : (
				<div>
					<div>
						{pathname === '/admin/register' && (
							<Link href='/admin'>Log in</Link>
						)}
					</div>
					<div>
						{pathname === '/admin' && (
							<Link href='/admin/register'>Sign up</Link>
						)}
					</div>
				</div>
			)}
		</header>
	);
}

export default Header;
