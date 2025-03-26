'use client';

import { ReactNode, useContext, useReducer, createContext } from 'react';

import { getFieldValue } from '../helpers/formatSortbyEmployees';
import {
	EmployeesAction,
	EmployeesContextType,
	EmployeesState,
} from '../types/employees';

const initialEmployeesState: EmployeesState = {
	allEmployees: [],
	employees: [],
	idNumbers: [],
	employee: null,
	firstName: '',
	lastName: '',
	idNumber: '',
	bankAccount: '',
	employmentType: '',
	position: '',
	address: '',
	telephone: '',
	email: '',
	city: '',
	country: '',
	zip: '',
	notes: '',
};

const employeesReducer = (
	state: EmployeesState,
	action: EmployeesAction,
): EmployeesState => {
	switch (action.type) {
		case 'SET_ALL_EMPLOYEES':
			return {
				...state,
				allEmployees: action.payload,
				employees: action.payload,
			};
		case 'SET_EMPLOYEE':
			return { ...state, employee: action.payload };
		case 'UPDATE_EMPLOYEE':
			return { ...state, employee: action.payload };
		case 'DELETE_EMPLOYEE':
			return {
				...state,
				allEmployees: state.allEmployees.filter(
					emp => emp._id !== action.payload,
				),
			};
		case 'SET_ID_NUMBERS':
			return { ...state, idNumbers: action.payload };
		case 'SET_FIRST_NAME':
			return { ...state, firstName: action.payload };
		case 'SET_LAST_NAME':
			return { ...state, lastName: action.payload };
		case 'SET_ID_NUMBER':
			return { ...state, idNumber: action.payload };
		case 'SET_BANK_ACCOUNT':
			return { ...state, bankAccount: action.payload };
		case 'SET_EMPLOYMENT_TYPE':
			return { ...state, employmentType: action.payload };
		case 'SET_POSITION':
			return { ...state, position: action.payload };
		case 'SET_ADDRESS':
			return { ...state, address: action.payload };
		case 'SET_TELEPHONE':
			return { ...state, telephone: action.payload };
		case 'SET_EMAIL':
			return { ...state, email: action.payload };
		case 'SET_CITY':
			return { ...state, city: action.payload };
		case 'SET_COUNTRY':
			return { ...state, country: action.payload };
		case 'SET_ZIP':
			return { ...state, zip: action.payload };
		case 'SET_NOTES':
			return { ...state, notes: action.payload };

		case 'SEARCH_BY_NAME': {
			const searchTerm = action.payload.toLowerCase();
			const filteredEmployees = state.employees.filter(employee =>
				employee.fullname.firstName.toLowerCase().startsWith(searchTerm),
			);
			return { ...state, allEmployees: filteredEmployees };
		}
		case 'SORT_EMPLOYEES': {
			const field = action.payload;
			const sortedEmployees = [...state.allEmployees].sort((a, b) => {
				const valueA = getFieldValue(a, field);
				const valueB = getFieldValue(b, field);

				return valueA.localeCompare(valueB); // Always A-Z
			});

			return { ...state, allEmployees: sortedEmployees };
		}
		case 'RESET_EMPLOYEE_STATE':
			return { ...initialEmployeesState }; // Reset state

		default:
			return state;
	}
};

export const EmployeesContext = createContext<EmployeesContextType>({
	state: initialEmployeesState,
	dispatch: () => {
		throw new Error('dispatch called outside of EmployeesProvider');
	},
});

export const EmployeesProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(employeesReducer, initialEmployeesState);

	return (
		<EmployeesContext.Provider value={{ state, dispatch }}>
			{children}
		</EmployeesContext.Provider>
	);
};

export function useEmployees() {
	const context = useContext(EmployeesContext);
	if (!context) {
		throw new Error('useEmployee must be used within an EmployeeProvider');
	}
	return context;
}
