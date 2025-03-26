import { Dispatch } from 'react';
import { CustomerAction, CustomerFormData } from '../types/customers';

export const handleSubmitCustomerForm = async (
	e: React.FormEvent<HTMLFormElement>,
	setValidated: Dispatch<boolean>,
	customerFormData: CustomerFormData,
	file: File[],
	updateCustomer: (
		formData: FormData,
		id: string,
		dispatch: Dispatch<CustomerAction>,
	) => void,
	id: string,
	dispatch: Dispatch<CustomerAction>,
	setReadOnly: Dispatch<boolean>,
) => {
	e.preventDefault();
	const form = e.currentTarget;
	if (!form.checkValidity()) {
		e.stopPropagation();
		setValidated(true);
		return;
	}

	const formData = new FormData();
	const {
		fullname,
		notes,
		documents,
		contact: { address, telephone, email, city, country, zip },
	} = customerFormData;

	formData.append('fullname', fullname);
	formData.append('notes', notes || '');

	formData.append('contactAddress', address ?? '');
	formData.append('contactTelephone', telephone ?? '');
	formData.append('contactEmail', email ?? '');
	formData.append('contactCity', city ?? '');
	formData.append('contactCountry', country ?? '');
	formData.append('contactZip', zip ?? '');

	//✅ Append files

	if (file && file.length > 0) {
		file.forEach(el => {
			formData.append('documents', el);
		});
	} else {
		console.warn('FILE is not an array or is empty', file);
	}

	for (const [key, value] of formData.entries()) {
		console.log(`${key}:`, value);
	}

	try {
		updateCustomer(formData, id, dispatch);

		setReadOnly(true);
	} catch (error) {
		console.error('Upload failed:', error);
	}
};
