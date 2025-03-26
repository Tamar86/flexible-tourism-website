import axios, { AxiosError } from 'axios';
import { SetBooleanState } from '../types/employees';
import { CustomerAction } from '../types/customers';

// DISPLAY ALL PARTNERS

export const displayAllCustomers = async (
	dispatch: React.Dispatch<CustomerAction>,
) => {
	try {
		const response = await axios.get(
			'http://localhost:5000/api/admin/customers/all',
		);

		console.log('customers', response.data.customers);

		dispatch({ type: 'SET_ALL_CUSTOMERS', payload: response.data.customers });
		dispatch({ type: 'SET_CUSTOMERS', payload: response.data.customers });
	} catch (err) {
		console.log(err);
	}
};

// DISPLAY SINGLE PARTNER

export const displayCustomer = async (
	dispatch: React.Dispatch<CustomerAction>,
	id: string,
) => {
	try {
		const response = await axios.get(
			`http://localhost:5000/api/admin/customers/customer/${id}`,
		);

		console.log('resCustomer', response);

		dispatch({ type: 'SET_CUSTOMER', payload: response.data.customer });
	} catch (err) {
		console.log(err);
	}
};

//UPDATE

export const updateCustomer = async function (
	formData: FormData,
	id: string,
	dispatch: React.Dispatch<CustomerAction>,
) {
	try {
		const response = await axios.patch(
			`http://localhost:5000/api/admin/customers/update/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Ensures FormData is sent correctly
				},
			},
		);

		console.log('docs', response);
		if (response.status === 200) {
			const resContractDocs = response.data.customer.documents;
			console.log('docs', resContractDocs);

			dispatch({
				type: 'SET_DOCUMENT',
				payload: resContractDocs,
			});

			dispatch({ type: 'SET_CUSTOMER', payload: response.data.customer });
		}
	} catch (err) {
		console.log(err);
	}
};

// DELETE EMPLOYEE

export const deleteCustomer = async function (id: string) {
	try {
		await axios.delete(
			`http://localhost:5000/api/admin/customers/delete/${id}`,
		);
	} catch (err) {
		console.log(err);
	}
};

// CREATE NEW EMPLOYEE

export const addNewCustomer = async (
	formData: FormData,
	setShow: SetBooleanState,
	dispatch: React.Dispatch<CustomerAction>,
): Promise<void> => {
	console.log('formdata', formData);
	try {
		const response = await axios.post(
			'http://localhost:5000/api/admin/customers/new',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		const response2 = await axios.get(
			'http://localhost:5000/api/admin/customers/all',
		);

		if (response.status === 201) {
			setShow(false);
			dispatch({
				type: 'SET_ALL_CUSTOMERS',
				payload: response2.data.customers,
			});
			dispatch({ type: 'SET_CUSTOMERS', payload: response2.data.customers });
		} else {
			console.error('Error adding customer', response.data);
		}
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			console.error('Error adding customer:', err.response);
			alert(`There was an issue adding the customer: ${err.message}`);
		}
	}
};

// DELETE DOCS
//NEEDS TO BE CONVERTED IN AXIOS REQUEST

export const deleteCustomersDocument = async (
	doc: string,
	dispatch: React.Dispatch<CustomerAction>,
) => {
	const parts = doc.split('/');
	const fileName = parts[parts.length - 1];
	const url = `/uploads/customer/${fileName}`;
	console.log('filename', fileName);

	try {
		const response = await fetch(
			`http://localhost:5000/api/admin/customers/delete-document`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fileName }),
			},
		);

		if (response.ok) {
			console.log('Document deleted successfully');
			dispatch({ type: 'DELETE_DOCUMENT', payload: url });
		} else {
			console.error('Failed to delete document');
		}
	} catch (error) {
		console.error('Error:', error);
	}
};
