'use client';

import { useAuth } from '@/app/admin/context/authContext';
import { useLogout } from '@/app/admin/context/logout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SideBar from '../main/SideBar';

export default function Header() {
	const { state, dispatch } = useAuth();
	const { loggedIn } = state;
	const logout = useLogout();
	const pathname = usePathname();

	useEffect(() => {
		dispatch({ type: 'PAGE_ACTIVE', payload: pathname });
	}, [dispatch, pathname]);

	return (
		//bg-body-tertiary
		<Navbar className='bg-purple-100 shadow-md shadow-purple-300'>
			<Container>
				<div className='flex items-center gap-3'>
					<Navbar.Brand className='text-purple-950' href='#home'>
						Navbar with text
					</Navbar.Brand>

					<SideBar />
				</div>
				<Navbar.Toggle />
				<Navbar.Collapse className='justify-content-end'>
					{loggedIn && (
						<div className='flex gap-5'>
							<Navbar.Text className='text-purple-950'>
								Signed in as: <Link href='#login'>Mark Otto</Link>
							</Navbar.Text>
							<button
								type='button'
								className='text-purple-950 bg-transparent border-b-2 underline'
								onClick={logout}
							>
								Log out
							</button>
						</div>
					)}
					<Navbar.Text>
						{loggedIn === false && (
							<Navbar.Text>
								{pathname === '/admin/register' && (
									<Link href='/admin'>Log in</Link>
								)}
								{pathname === '/admin' && (
									<Link href='/admin/register'>Sign up</Link>
								)}
							</Navbar.Text>
						)}
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
