'use client';

import { useCustomer } from '@/app/admin/context/CustomersContext';
import { usePartners } from '@/app/admin/context/PartnersContext';
import { useBookings } from '@/app/admin/context/BookingsContext';
import { deleteBooking } from '@/app/admin/services/bookingsService';
import DropdownMenu from '@/app/admin/ui/DropDownMenu';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import { Check, X } from 'lucide-react';

interface CustomerTitleData {
	title: string;
	id: number;
}

interface BookingsTableProps {
	sortedName: string;
}

const customerTitleData: CustomerTitleData[] = [
	{ title: '#', id: 0 },
	{ title: 'Booking Type', id: 1 },
	{ title: 'Client Name', id: 2 },
	{ title: 'Start Day', id: 3 },
	{ title: 'Group Size', id: 4 },
	{ title: 'Price', id: 5 },
	{ title: 'Created At', id: 6 },
	{ title: 'Paid', id: 7 },
	{ title: 'Status', id: 8 },
	{ title: '', id: 9 },
];

export default function BookingsTable({ sortedName }: BookingsTableProps) {
	const { state, dispatch } = useBookings();
	const { state: customerState } = useCustomer();
	const { state: partnersState } = usePartners();
	const { allBookings } = state;
	const { allCustomers } = customerState;
	const { allPartners } = partnersState;

	const handleDelete = async function (id: string) {
		await deleteBooking(id);
		dispatch({ type: 'DELETE_BOOKING', payload: id });
	};

	console.log('type', sortedName);

	if (allBookings.length === 0) return <LoadingSpinner />;

	return (
		<table className='w-full bg-white rounded-lg'>
			<thead className=''>
				<tr className='bg-slate-700 rounded-lg'>
					{customerTitleData.map(partner => (
						<th className='p-2 text-slate-50' key={partner.id}>
							{partner.title}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{allBookings?.map((booking, i) => {
					const customerName = allCustomers.find(
						el => el._id === booking.customer,
					)?.fullname;

					const partnerName = allPartners.find(
						el => el._id === booking.partner,
					)?.companyName;

					return (
						<tr
							key={booking._id}
							className='table-row border-slate-300 border-b-[1px] '
						>
							<td className=''>{i + 1}</td>
							<td
								className={`${
									sortedName === 'bookingType' ? 'text-green-700 font-bold' : ''
								}`}
							>
								{booking.bookingType}
							</td>
							<td>
								{booking.customer && customerName}
								{booking.partner && partnerName}
							</td>

							<td
								className={`${
									sortedName === 'tourStartDate'
										? 'text-green-700 font-bold'
										: ''
								}`}
							>
								{booking.tourStartDate
									? new Date(booking.tourStartDate).toLocaleDateString()
									: 'N/A'}
							</td>
							<td
								className={`${
									sortedName === 'groupSize' ? 'text-green-700 font-bold' : ''
								}`}
							>
								{booking.groupSize}
							</td>
							<td
								className={`${
									sortedName === 'price' ? 'text-green-700 font-bold' : ''
								}`}
							>
								{booking.price}
							</td>
							<td
								className={`${
									sortedName === 'createdAt' ? 'text-green-700 font-bold' : ''
								}`}
							>
								{new Date(booking.createdAt).toLocaleDateString()}
							</td>
							<td
								className={`font-semibold ${
									sortedName === 'isPaid' ? 'bg-green-100' : ''
								} ${booking.isPaid ? 'text-green-600' : 'text-red-600'}`}
							>
								{booking.isPaid ? (
									<Check className='w-5' />
								) : (
									<X className='w-5' />
								)}
							</td>
							<td>
								<span
									className={`flex items-center justify-center w-2/3 text-white rounded-xl text-xs font-bold py-1  ${
										booking.status === 'confirmed'
											? 'bg-green-600'
											: booking.status === 'canceled'
											? 'bg-red-600'
											: booking.status === 'pending'
											? 'bg-yellow-600'
											: ''
									}`}
								>
									{booking.status.toUpperCase()}
								</span>
							</td>
							<td>
								<DropdownMenu
									id={booking._id}
									pathTitle='bookings'
									handleDelete={handleDelete}
								/>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
