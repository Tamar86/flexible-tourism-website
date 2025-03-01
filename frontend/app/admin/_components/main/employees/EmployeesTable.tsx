import { Table } from 'react-bootstrap';
import DropdownMenu from './DropdownMenu';

import { employeeTableData } from '@/app/admin/constants/formFields';
import { useEmployees } from '@/app/admin/context/EmployeesContext';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

export default function EmployeesTable() {
	const { state } = useEmployees();
	const { allEmployees } = state;

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					{employeeTableData.map(data => (
						<th key={data.id}>{data.title}</th>
					))}
				</tr>
				<tr></tr>
			</thead>
			<tbody>
				{allEmployees.length === 0 && <LoadingSpinner />}
				{allEmployees.map((employee, i) => (
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
							<DropdownMenu id={employee._id} employee={employee} />
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
