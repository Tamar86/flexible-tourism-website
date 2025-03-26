import { usePartners } from '@/app/admin/context/PartnersContext';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

import DropdownMenu from '@/app/admin/ui/DropDownMenu';
import { deletePartner } from '@/app/admin/services/partnersService';

const PartnersTableData = [
	{ title: '#', id: 1 },
	{ title: 'Company Name', id: 2 },
	{ title: 'Company Representative', id: 4 },
	{ title: 'Country', id: 6 },
	{ title: 'Email', id: 7 },
	{ title: 'Telephone', id: 8 },
	{ title: 'More', id: 10 },
];

export default function PartnersTable() {
	const { state, dispatch } = usePartners();
	const { allPartners } = state;

	const handleDelete = async function (id: string) {
		await deletePartner(id);
		dispatch({ type: 'DELETE_PARTNER', payload: id });
	};

	if (allPartners.length === 0) return <LoadingSpinner />;
	return (
		<table>
			<thead>
				<tr>
					{PartnersTableData.map(partner => (
						<th key={partner.id}>{partner.title}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{allPartners?.map((partner, i) => (
					<tr key={partner._id}>
						<td>{i + 1}</td>
						<td>{partner.companyName}</td>
						<td>{partner.companyRepresentative}</td>
						<td>{partner.contact.country}</td>
						<td>{partner.contact.email}</td>
						<td>{partner.contact.telephone}</td>
						<td>
							<DropdownMenu
								id={partner._id}
								pathTitle='partners'
								handleDelete={handleDelete}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
