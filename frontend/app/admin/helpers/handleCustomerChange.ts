import { Customer, CustomerAction } from '../types/customers';

// WITHOUT THIS HELPER FUNCTION PARTNER DETAILS WON'T BE DISPLAYED IN PARTNER DETAILS
export const handleCustomerFormdata = (
	customer: Customer,
	// setPartnerFormData: React.Dispatch<React.SetStateAction<PartnerFormData>>,
	dispatch: React.Dispatch<CustomerAction>,
) => {
	if (customer) {
		dispatch({
			type: 'SET_CUSTOMER_FORM_DATA',
			payload: {
				fullname: customer.fullname,

				contact: {
					address: customer.contact.address,
					telephone: customer.contact.telephone,
					email: customer.contact.email,
					city: customer.contact.city,
					country: customer.contact.country,
					zip: customer.contact.zip,
				},
				documents: customer.documents,

				notes: customer.notes,
				_id: customer._id,
			},
		});
	}
};

export const handleCustomerInputChange = (
	e: React.ChangeEvent<
		HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	>,
	setFile: React.Dispatch<React.SetStateAction<File[]>>,
	dispatch: React.Dispatch<CustomerAction>,
) => {
	const { name, value, files } = e.target as HTMLInputElement;

	if (files && files.length > 0) {
		const filesArray = Array.from(files);
		console.log('filesArr', filesArray);
		// Store files in state (do not upload immediately)

		setFile(filesArray);
	}

	if (name.startsWith('contact.')) {
		// Update nested contact field
		const field = name.split('.')[1];
		dispatch({ type: 'SET_CONTACT_FIELD', payload: { field, value } });
	} else {
		// Flat fields (like idNumber, position)

		dispatch({
			type: 'SET_CUSTOMER_FORM_DATA_INPUT',
			payload: { name, value },
		});
	}
};
