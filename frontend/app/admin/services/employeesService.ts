import axios from 'axios';
import {
	Employee,
	EmployeesAction,
	Employees,
	EmployeesState,
	EmployeeFormData,
	SetBooleanState,
} from '../types/employees';

//     DISPLAY ALL EMPLOYEES

export const displayAllEmployees = async (
	dispatch: React.Dispatch<EmployeesAction>,
) => {
	try {
		const response = await axios.get<Employees[]>(
			'http://localhost:5000/api/admin/employees/all',
		);
		dispatch({ type: 'SET_ALL_EMPLOYEES', payload: response.data });
	} catch (err) {
		console.log(err);
	}
};

// DISPLAY SINGLE EMPLOYEE

export const displayEmployee = async (
	dispatch: React.Dispatch<EmployeesAction>,
	id: string,
) => {
	try {
		const response = await axios.get<Employee>(
			`http://localhost:5000/api/admin/employees/employee/${id}`,
		);
		dispatch({ type: 'SET_EMPLOYEE', payload: response.data });
	} catch (err) {
		console.log(err);
	}
};

// CREATE NEW EMPLOYEE

export const addNewEmployee = async (
	state: EmployeesState,
	setShow: SetBooleanState,
	dispatch: React.Dispatch<EmployeesAction>,
) => {
	try {
		const {
			firstName,
			lastName,
			idNumber,
			bankAccount,
			employmentType,
			position,
			telephone,
			email,
			address,
			city,
			country,
			zip,
			notes,
		} = state;
		const newEmployee = {
			fullname: {
				firstName,
				lastName,
			},
			idNumber,
			bankAccount,
			employmentType,
			position,
			contact: {
				address,
				telephone,
				email,
				city,
				country,
				zip,
			},
			notes,
		};

		await axios.post(
			'http://localhost:5000/api/admin/employees/new',
			newEmployee,
			{ headers: { 'Content-Type': 'application/json' } },
		);

		setShow(false);
		dispatch({ type: 'RESET_EMPLOYEE_STATE' });
	} catch (err) {
		console.error('Error adding employee:', err);
	}
};

// UPDATE EMPLOYEE

export const updateEmployee = async function (
	formData: EmployeeFormData,
	id: string,
) {
	try {
		await axios.patch(
			`http://localhost:5000/api/admin/employees/update/${id}`,
			formData, // Send formData, not employee
		);
	} catch (err) {
		console.log(err);
	}
};

// DELETE EMPLOYEE

export const deleteEmployee = async function (id: string) {
	try {
		await axios.delete(
			`http://localhost:5000/api/admin/employees/delete/${id}`,
		);
	} catch (err) {
		console.log(err);
	}
};
