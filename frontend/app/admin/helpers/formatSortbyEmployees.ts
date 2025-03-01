import { Employee } from '../types/employees';

export const formatFieldName = (field: string) => {
	switch (field) {
		case 'firstName':
			return 'First Name';
		case 'employmentType':
			return 'Employment Type';
		case 'position':
			return 'Position';
		default:
			return field;
	}
};

export const getFieldValue = (employee: Employee, field: string) => {
	switch (field) {
		case 'firstName':
			return employee.fullname.firstName;
		case 'lastName':
			return employee.fullname.lastName; // optional if you add it to dropdown
		case 'employmentType':
			return employee.employmentType;
		case 'position':
			return employee.position;
		default:
			return '';
	}
};
