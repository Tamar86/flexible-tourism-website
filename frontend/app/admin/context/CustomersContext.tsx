'use client';

import { createContext, useContext, useReducer } from 'react';

import {
	CustomerAction,
	CustomersContextType,
	CustomersProvidersProps,
	CustomersState,
} from '../types/customers';
import { getFieldValueCustomer } from '../helpers/formatSortByCustomers';

const emptyCustomer = {
	fullname: '',
	documents: [],
	notes: '',
	contact: {
		address: '',
		telephone: '',
		email: '',
		city: '',
		country: '',
		zip: '',
	},
	_id: '',
	createdAt: '',
};

const initialCustomersState: CustomersState = {
	allCustomers: [],
	customers: [],
	customer: emptyCustomer,
	customerFormData: emptyCustomer,
};

const customersReducer = (state: CustomersState, action: CustomerAction) => {
	switch (action.type) {
		case 'SET_ALL_CUSTOMERS':
			return {
				...state,
				allCustomers: action.payload,
				customers: action.payload,
			};
		case 'SET_CUSTOMERS':
			return {
				...state,
				customers: action.payload,
			};
		case 'SET_CUSTOMER':
			return { ...state, customer: action.payload };

		case 'SET_CUSTOMER_FORM_DATA':
			return {
				...state,
				customerFormData: action.payload,
			};

		case 'SET_CUSTOMER_FORM_DATA_INPUT': {
			const { name, value } = action.payload;
			return {
				...state,
				customerFormData: { ...state.customerFormData, [name]: value },
			};
		}

		case 'SET_CONTACT_FIELD': {
			const { field, value } = action.payload;
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					contact: { ...state.customerFormData.contact, [field]: value },
				},
			};
		}

		case 'SET_DOCUMENT':
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					documents: action.payload,
				},
			};

		case 'DELETE_DOCUMENT': {
			const document = action.payload;
			console.log('docContext', document);
			return {
				...state,
				customer: {
					...state.customer,
					documents: state.customer.documents.filter(item => item !== document),
				},
			};
		}

		case 'SET_FULLNAME':
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					fullname: action.payload,
				},
			};

		case 'SET_ADDRESS':
			return {
				...state,
				customerFormData: {
					...state.customerFormData, // Preserve the rest of the partnerFormData
					contact: {
						...state.customerFormData.contact, // Preserve other contact fields
						address: action.payload,
					},
				},
			};

		case 'SET_EMAIL':
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					contact: {
						...state.customerFormData.contact,
						email: action.payload,
					},
				},
			};
		case 'SET_TELEPHONE':
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					contact: {
						...state.customerFormData.contact,
						telephone: action.payload,
					},
				},
			};
		case 'SET_CITY':
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					contact: {
						...state.customerFormData.contact,
						city: action.payload,
					},
				},
			};
		case 'SET_COUNTRY':
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					contact: {
						...state.customerFormData.contact,
						country: action.payload,
					},
				},
			};
		case 'SET_ZIP':
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					contact: {
						...state.customerFormData.contact,
						zip: action.payload,
					},
				},
			};
		case 'SET_NOTES':
			return {
				...state,
				customerFormData: {
					...state.customerFormData,
					notes: action.payload,
				},
			};

		case 'DELETE_CUSTOMER':
			return {
				...state,
				allCustomers: state.allCustomers.filter(
					emp => emp._id !== action.payload,
				),
			};
		case 'SEARCH_BY_NAME': {
			const searchTerm = action.payload.toLowerCase();
			const filteredCustomers = state.customers.filter(customer =>
				customer.fullname.toLowerCase().startsWith(searchTerm),
			);
			return { ...state, allCustomers: filteredCustomers };
		}
		case 'SORT_CUSTOMERS': {
			const field = action.payload;
			console.log('field', field);
			const sortedCustomers = [...state.allCustomers].sort((a, b) => {
				const valueA = getFieldValueCustomer(a, field);
				const valueB = getFieldValueCustomer(b, field);
				if (field === 'createdAt') {
					return valueB.localeCompare(valueA);
				} else {
					return valueA.localeCompare(valueB); // Always A-Z
				}
			});

			return { ...state, allCustomers: sortedCustomers };
		}

		default:
			return state;
	}
};

export const CustomersContext = createContext<CustomersContextType>({
	state: initialCustomersState,
	dispatch: () => {
		throw new Error('dispatch called outside of CustomersProvider');
	},
});

export const CustomersProvider = ({ children }: CustomersProvidersProps) => {
	const [state, dispatch] = useReducer(customersReducer, initialCustomersState);

	return (
		<CustomersContext.Provider value={{ state, dispatch }}>
			{children}
		</CustomersContext.Provider>
	);
};

export function useCustomer() {
	const context = useContext(CustomersContext);
	if (!context) {
		throw new Error('useCustomers must be used within an CustomersProvider');
	}
	return context;
}
