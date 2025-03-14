import axios, { AxiosError } from 'axios';

import { SetBooleanState } from '../types/employees';
import { PartnersAction } from '../types/partners';

// DISPLAY ALL PARTNERS

export const displayAllPartners = async (
	dispatch: React.Dispatch<PartnersAction>,
) => {
	try {
		const response = await axios.get(
			'http://localhost:5000/api/admin/partners/all',
		);

		dispatch({ type: 'SET_ALL_PARTNERS', payload: response.data.partners });
		dispatch({ type: 'SET_PARTNERS', payload: response.data.partners });
	} catch (err) {
		console.log(err);
	}
};

// DISPLAY SINGLE PARTNER

export const displayPartner = async (
	dispatch: React.Dispatch<PartnersAction>,
	id: string,
) => {
	try {
		const response = await axios.get(
			`http://localhost:5000/api/admin/partners/partner/${id}`,
		);

		dispatch({ type: 'SET_PARTNER', payload: response.data.partner });
	} catch (err) {
		console.log(err);
	}
};

//UPDATE

export const updatePartner = async function (
	formData: FormData,
	id: string,
	dispatch: React.Dispatch<PartnersAction>,
) {
	try {
		const response = await axios.patch(
			`http://localhost:5000/api/admin/partners/update/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data', // Ensures FormData is sent correctly
				},
			},
		);
		if (response.status === 200) {
			const resContractDocs = response.data.partner.contractDocuments;

			dispatch({
				type: 'SET_CONTRACT_DOCUMENT_URLS',
				payload: resContractDocs,
			});
		}
		console.log('docres', response);
	} catch (err) {
		console.log(err);
	}
};

// DELETE EMPLOYEE

export const deletePartner = async function (id: string) {
	try {
		await axios.delete(`http://localhost:5000/api/admin/partners/delete/${id}`);
	} catch (err) {
		console.log(err);
	}
};

// CREATE NEW EMPLOYEE

export const addNewPartner = async (
	formData: FormData,
	setShow: SetBooleanState,
	dispatch: React.Dispatch<PartnersAction>,
): Promise<void> => {
	console.log('formdata', formData);
	try {
		const response = await axios.post(
			'http://localhost:5000/api/admin/partners/new',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		const response2 = await axios.get(
			'http://localhost:5000/api/admin/partners/all',
		);

		if (response.status === 201) {
			setShow(false);
			dispatch({ type: 'SET_ALL_PARTNERS', payload: response2.data.partners });
			dispatch({ type: 'SET_PARTNERS', payload: response2.data.partners });
			// dispatch({ type:'RESET_PARTNER_STATE' });
		} else {
			console.error('Error adding partner', response.data);
		}
	} catch (err: unknown) {
		if (err instanceof AxiosError) {
			console.error('Error adding partner:', err.response);
			alert(`There was an issue adding the partner: ${err.message}`);
		}
	}
};

// DELETE DOCS
//NEEDS TO BE CONVERTED IN AXIOS REQUEST

export const deletePartnersDocument = async (
	doc: string,
	dispatch: React.Dispatch<PartnersAction>,
	// setDocs: React.Dispatch<React.SetStateAction<(File | string)[]>>,
) => {
	const parts = doc.split('/');
	const fileName = parts[parts.length - 1];
	const url = `/uploads/partner/${fileName}`;
	console.log('filename', fileName);

	try {
		const response = await fetch(
			`http://localhost:5000/api/admin/partners/delete-document`,
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
			dispatch({ type: 'DELETE_CONTRACT_DOCUMENT', payload: url });
		} else {
			console.error('Failed to delete document');
		}
	} catch (error) {
		console.error('Error:', error);
	}
};
