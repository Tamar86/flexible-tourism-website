//  TYPES

import { Dispatch, ReactNode } from 'react';

interface CustomersContact {
	address: string;
	telephone: string;
	email: string;
	city: string;
	country: string;
	zip: string;
}

// Define the shape of each partner

export interface Customer {
	_id: string;
	fullname: string;
	contact: CustomersContact;
	documents: (File | string)[];
	notes?: string;
	createdAt: string;
}

export interface CustomersState {
	allCustomers: Customer[];
	customers: Customer[];
	customer: Customer;
	customerFormData: CustomerFormData;
}

// Define action types

export type CustomerAction =
	| { type: 'SET_ALL_CUSTOMERS'; payload: Customer[] }
	| { type: 'SET_CUSTOMERS'; payload: Customer[] }
	| { type: 'SET_CUSTOMER'; payload: Customer }
	| {
			type: 'SET_CUSTOMER_FORM_DATA';
			payload: CustomerFormData;
	  }
	| {
			type: 'SET_CUSTOMER_FORM_DATA_INPUT';
			payload: { name: string; value: string | number };
	  }
	| { type: 'SEARCH_BY_NAME'; payload: string }
	| {
			type: 'SET_CONTACT_FIELD';
			payload: { field: string; value: string };
	  }
	| { type: 'SORT_CUSTOMERS'; payload: string }
	| { type: 'DELETE_CUSTOMER'; payload: string }
	| { type: 'DELETE_DOCUMENT'; payload: string }
	| { type: 'SET_DOCUMENT'; payload: (File | string)[] }
	| { type: 'SET_FULLNAME'; payload: string }
	| { type: 'SET_NOTES'; payload: string }
	| { type: 'SET_ADDRESS'; payload: string }
	| { type: 'SET_EMAIL'; payload: string }
	| { type: 'SET_TELEPHONE'; payload: string }
	| { type: 'SET_CITY'; payload: string }
	| { type: 'SET_COUNTRY'; payload: string }
	| { type: 'SET_ZIP'; payload: string };

// Define the shape of context value

export interface CustomersContextType {
	state: CustomersState;
	dispatch: Dispatch<CustomerAction>;
}

// Provider component props type
export interface CustomersProvidersProps {
	children: ReactNode;
}

export type CustomerFormData = {
	fullname: string;
	contact: CustomersContact;
	documents: (File | string)[];
	notes?: string;
	_id: string;
};

import { SetBooleanState } from './employees';

export interface EditCustomersFormType {
	customerFormData: CustomerFormData;
	id: string;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => void;
	readOnly: boolean;
	setReadOnly: SetBooleanState;
	handleSubmitCustomerForm: (e: React.FormEvent<HTMLFormElement>) => void;
	handleShow: () => void;
	validated: boolean;
}

export interface CustomerFormProps {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	handleClose: () => void;
}
