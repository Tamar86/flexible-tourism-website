import { NavLink } from '@/app/admin/types/navigation';

export const adminLinks: NavLink[] = [
	{ href: '/admin/dashboard', label: 'Dashboard' },
	{ href: '/admin/dashboard/bookings', label: 'Bookings' },
	{ href: '/admin/dashboard/tours', label: 'Tours' },
	{ href: '/admin/dashboard/employees', label: 'Employees' },
	{ href: '/admin/dashboard/partners', label: 'Partners' },
];
