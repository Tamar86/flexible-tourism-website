'use client';

import {
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Offcanvas,
} from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { useLogout } from './logout';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

function Header() {
	const { state, dispatch } = useAuth();
	const { loggedIn } = state;
	const logout = useLogout();
	const pathname = usePathname();

	useEffect(() => {
		dispatch({ type: 'PAGE_ACTIVE', payload: pathname });
	}, [dispatch, pathname]);

	return (
		<>
			{['lg'].map(expand => (
				<Navbar key={expand} expand={expand} className='bg-body-tertiary mb-3'>
					<Container fluid>
						<Navbar.Brand href='/admin/dashboard' className='ps-5'>
							Navbar Offcanvas
						</Navbar.Brand>
						{/* OFFCANVAS */}
						{loggedIn ? (
							<>
								<Navbar.Toggle
									aria-controls={`offcanvasNavbar-expand-${expand}`}
								/>
								<Navbar.Offcanvas
									id={`offcanvasNavbar-expand-${expand}`}
									aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
									placement='end'
								>
									<Offcanvas.Header closeButton>
										<Offcanvas.Title
											id={`offcanvasNavbarLabel-expand-${expand}`}
										>
											Offcanvas
										</Offcanvas.Title>
									</Offcanvas.Header>
									<Offcanvas.Body>
										<Nav className='justify-content-end flex-grow-1 pe-5'>
											<Nav.Link href='/admin/dashboard'>Home</Nav.Link>
											<Nav.Link href='/admin/dashboard/bookings'>
												Bookings
											</Nav.Link>
											<Nav.Link href='/admin/dashboard/tours'>Tours</Nav.Link>
											<Nav.Link href='/admin/dashboard/employees'>
												Employees
											</Nav.Link>
											<Nav.Link href='/admin/dashboard/partners'>
												Partners
											</Nav.Link>
											<NavDropdown
												title='Account'
												id={`offcanvasNavbarDropdown-expand-${expand}`}
											>
												<NavDropdown.Item>Name S.</NavDropdown.Item>
												<NavDropdown.Item href='#action4'>
													Profile
												</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item href='#action5' onClick={logout}>
													Log out
												</NavDropdown.Item>
											</NavDropdown>
										</Nav>
									</Offcanvas.Body>
								</Navbar.Offcanvas>
							</>
						) : (
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
						)}
					</Container>
				</Navbar>
			))}
		</>
	);
}

export default Header;
