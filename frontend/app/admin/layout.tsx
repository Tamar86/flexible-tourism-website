import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './_components/header/Header';
import { AuthProvider } from '@/app/admin/context/AuthContext';
import { EmployeesProvider } from './context/EmployeesContext';
import { PartnersProvider } from './context/PartnersContext';
import { BookingsProvider } from './context/BookingsContext';
import { ToursProvider } from './context/ToursContext';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<AuthProvider>
				<ToursProvider>
					<BookingsProvider>
						<PartnersProvider>
							<EmployeesProvider>
								<header className='fixed w-full z-10'>
									<Header />
								</header>

								<main className='flex items-center justify-center min-h-screen'>
									{children}
								</main>
							</EmployeesProvider>
						</PartnersProvider>
					</BookingsProvider>
				</ToursProvider>
			</AuthProvider>
		</div>
	);
}
