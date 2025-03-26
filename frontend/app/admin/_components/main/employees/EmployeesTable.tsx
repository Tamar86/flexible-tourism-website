import { useEmployees } from '@/app/admin/context/EmployeesContext';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import DropdownMenu from '@/app/admin/ui/DropDownMenu';
import { deleteEmployee } from '@/app/admin/services/employeesService';

export const employeeTableData = [
	{ title: '#', id: 1 },
	{ title: 'First Name', id: 2 },
	{ title: 'Last Name', id: 3 },
	{ title: 'Employment Type', id: 6 },
	{ title: 'Position', id: 7 },
	{ title: 'Telephone', id: 8 },
	{ title: 'Email', id: 9 },
	{ title: 'More', id: 10 },
];

export default function EmployeesTable() {
	const { state, dispatch } = useEmployees();
	const { allEmployees } = state;

	const handleDelete = async function (id: string) {
		await deleteEmployee(id);
		dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
	};

	if (allEmployees.length === 0) return <LoadingSpinner />;

	return (
		<table>
			<thead>
				<tr>
					{employeeTableData.map(data => (
						<th key={data.id}>{data.title}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{allEmployees.map((employee, i) => {
					return (
						<tr key={employee._id}>
							<td>{i + 1}</td>
							<td>{employee.fullname.firstName}</td>
							<td>{employee.fullname.lastName}</td>

							<td>{employee.employmentType}</td>
							<td>{employee.position}</td>
							<td>
								<a href={`tel:${employee.contact.telephone}`}>
									{employee.contact.telephone}
								</a>
							</td>
							<td>
								<a href={`mailto${employee.contact.email}`}>
									{employee.contact.email}
								</a>
							</td>

							<td className='flex items-center justify-center '>
								<DropdownMenu
									id={employee._id}
									pathTitle='employees'
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
