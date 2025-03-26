import { Partner, PartnersAction } from '../types/partners';

// WITHOUT THIS HELPER FUNCTION PARTNER DETAILS WON'T BE DISPLAYED IN PARTNER DETAILS
export const handlePartnerFormdata = (
	partner: Partner,
	// setPartnerFormData: React.Dispatch<React.SetStateAction<PartnerFormData>>,
	dispatch: React.Dispatch<PartnersAction>,
) => {
	if (partner) {
		dispatch({
			type: 'SET_PARTNER_FORM_DATA',
			payload: {
				companyName: partner?.companyName,
				companyRegistrationNumber: partner.companyRegistrationNumber,
				industry: partner.industry,
				companyRepresentative: partner?.companyRepresentative,
				contact: {
					address: partner.contact.address,
					telephone: partner.contact.telephone,
					email: partner.contact.email,
					city: partner.contact.city,
					country: partner.contact.country,
					zip: partner.contact.zip,
				},
				website: partner.website,
				socialMedia: partner.socialMedia,
				partnershipStatus: partner.partnershipStatus,
				partnershipStartDate: partner.partnershipStartDate,
				partnershipEndDate: partner.partnershipEndDate,
				rating: partner.rating,
				documents: partner?.documents,

				legalRepresentative: partner.legalRepresentative,
				notes: partner.notes,
				_id: partner._id,
			},
		});
	}
};

export const handlePartnerInputChange = (
	e: React.ChangeEvent<
		HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	>,
	setFile: React.Dispatch<React.SetStateAction<File[]>>,
	dispatch: React.Dispatch<PartnersAction>,
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

		dispatch({ type: 'SET_PARTNER_FORM_DATA_INPUT', payload: { name, value } });
	}
};
