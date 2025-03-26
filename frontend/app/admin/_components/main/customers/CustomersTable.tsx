'use client';

import { useCustomer } from '@/app/admin/context/CustomersContext';
import { deleteCustomer } from '@/app/admin/services/customersService';

import DropdownMenu from '@/app/admin/ui/DropDownMenu';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

const customerTitleData = [
	{ title: '#', id: 1 },
	{ title: 'Fullname', id: 2 },
	{ title: 'Country', id: 3 },
	{ title: 'Email', id: 4 },
	{ title: 'Telephone', id: 5 },
	{ title: 'Created At', id: 6 },
	{ title: 'More', id: 7 },
];

interface BookingsTableProps {
	sortedName: string;
}

export default function CustomersTable({ sortedName }: BookingsTableProps) {
	const { state, dispatch } = useCustomer();
	const { allCustomers } = state;

	const handleDelete = async function (id: string) {
		await deleteCustomer(id);
		dispatch({ type: 'DELETE_CUSTOMER', payload: id });
	};

	if (allCustomers.length === 0) return <LoadingSpinner />;

	return (
		<table className='w-full bg-white rounded-lg'>
			<thead>
				<tr className='bg-slate-700 rounded-lg'>
					{customerTitleData.map(partner => (
						<th className='p-2 text-slate-50' key={partner.id}>
							{partner.title}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{allCustomers?.map((customer, i) => (
					<tr
						key={customer._id}
						className='table-row border-slate-300 border-b-[1px] '
					>
						<td>{i + 1}</td>
						<td
							className={`${sortedName === 'fullname' ? 'bg-green-300' : ''} `}
						>
							{customer.fullname}
						</td>

						<td
							className={`${sortedName === 'country' ? 'bg-green-300' : ''} `}
						>
							{customer.contact.country}
						</td>
						<td>{customer.contact.email}</td>
						<td>{customer.contact.telephone}</td>
						<td
							className={`${
								sortedName === 'createdAt' || sortedName === 'createdAtOldest'
									? 'bg-green-300'
									: ''
							} `}
						>
							{new Date(customer.createdAt).toLocaleDateString()}
						</td>
						<td>
							<DropdownMenu
								id={customer._id}
								pathTitle='customers'
								handleDelete={handleDelete}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
