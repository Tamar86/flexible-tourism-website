import { Dispatch } from 'react';
import { Partner, PartnersAction } from '../types/partners';

export const handleSubmitPartnerForm = async (
	e: React.FormEvent<HTMLFormElement>,
	setValidated: Dispatch<boolean>,
	partnerFormData: Partner,
	file: File[],
	updatePartner: (
		formData: FormData,
		id: string,
		dispatch: Dispatch<PartnersAction>,
	) => void,
	id: string,
	dispatch: Dispatch<PartnersAction>,
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
		companyName,
		companyRegistrationNumber,
		industry,
		companyRepresentative,
		website,
		socialMedia,
		partnershipStatus,
		partnershipStartDate,
		partnershipEndDate,
		rating,
		legalRepresentative,
		notes,

		contact: { address, telephone, email, city, country, zip },
	} = partnerFormData;

	formData.append('companyName', companyName);
	formData.append('companyRegistrationNumber', companyRegistrationNumber);
	formData.append('industry', industry);
	formData.append('companyRepresentative', companyRepresentative ?? '');
	formData.append('website', website);
	formData.append('socialMedia', socialMedia);
	formData.append('partnershipStatus', partnershipStatus);
	formData.append('notes', notes || '');

	if (partnershipStartDate) {
		formData.append(
			'partnershipStartDate',
			new Date(partnershipStartDate).toISOString(),
		);
	}
	if (partnershipEndDate) {
		formData.append(
			'partnershipEndDate',
			new Date(partnershipEndDate).toISOString(),
		);
	}
	formData.append('rating', rating.toString());
	formData.append('legalRepresentative', legalRepresentative ?? '');

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
		updatePartner(formData, id, dispatch);

		setReadOnly(true);
	} catch (error) {
		console.error('Upload failed:', error);
	}
};
