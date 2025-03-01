// EMPLOYEE CONTEXT

export interface EmployeesState {
	allEmployees: Employees[];
	employees: Employees[];
	employee: Employee | null;
	firstName: string;
	lastName: string;
	idNumber: string;
	bankAccount: string;
	employmentType: string | null;
	position: string;
	address: string;
	telephone: string;
	email: string;
	city: string;
	country: string;
	zip: string;
	notes: string;
	id: string;
}

export type EmployeesAction =
	| { type: 'UPDATE_EMPLOYEE'; payload: Employee }
	| { type: 'DELETE_EMPLOYEE'; payload: string }
	| { type: 'SET_ALL_EMPLOYEES'; payload: Employees[] }
	| { type: 'SET_EMPLOYEE'; payload: Employee }
	| { type: 'SET_FIRST_NAME'; payload: string }
	| { type: 'SET_LAST_NAME'; payload: string }
	| { type: 'SET_ID_NUMBER'; payload: string }
	| { type: 'SET_BANK_ACCOUNT'; payload: string }
	| { type: 'SET_EMPLOYMENT_TYPE'; payload: string | null }
	| { type: 'SET_POSITION'; payload: string }
	| { type: 'SET_ADDRESS'; payload: string }
	| { type: 'SET_TELEPHONE'; payload: string }
	| { type: 'SET_EMAIL'; payload: string }
	| { type: 'SET_CITY'; payload: string }
	| { type: 'SET_COUNTRY'; payload: string }
	| { type: 'SET_ZIP'; payload: string }
	| { type: 'SET_NOTES'; payload: string }
	| { type: 'SORT_EMPLOYEES'; payload: string }
	| { type: 'SEARCH_BY_NAME'; payload: string }
	| { type: 'RESET_EMPLOYEE_STATE' };

// EMPLOYEE PROPS

export type EmployeeFormData = {
	fullname: {
		firstName: string;
		lastName: string;
	};
	idNumber: string;
	bankAccount: string;
	employmentType: string;
	position: string;
	contact: {
		address: string;
		telephone: string;
		email: string;
		city: string;
		country: string;
		zip: string;
	};
	notes: string;
};

export interface DeleteEmployee {
	id: string;
	show: boolean;
	handleDelete: () => void;
	handleClose: () => void;
}

export type SetBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

export interface EmployeeFormProps {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	handleClose: () => void;
	addNewEmployee: () => void;
}

export interface EditEmployeeFormType {
	formData: EmployeeFormData;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => void;
	readOnly: boolean;
	setReadOnly: SetBooleanState;
	handleSubmitForm: (e: React.FormEvent) => void;
	handleShow: () => void;
}

// EMPLOYEE VARIABLES

interface Contact {
	address: string;
	telephone: string;
	email: string;
	city: string;
	country: string;
	zip: string;
}

interface Fullname {
	firstName: string;
	lastName: string;
}

export interface Employees {
	_id: string;
	fullname: {
		firstName: string;
		lastName: string;
	};
	idNumber: string;
	bankAccount: string;
	employmentType: string;
	position: string;
	contact: {
		address: string;
		telephone: string;
		email: string;
		city: string;
		country: string;
		zip: string;
	};
	notes: string;
}

export interface Employee {
	fullname: Fullname;
	idNumber: string;
	bankAccount: string;
	employmentType: string;
	position: string;
	contact: Contact;
	notes: string;
	_id: string;
}
