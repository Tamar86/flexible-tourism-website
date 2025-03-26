'use client';

import { createContext, useContext, useReducer } from 'react';
import {
	PartnersAction,
	PartnersContextType,
	PartnersProvidersProps,
	PartnersState,
} from '../types/partners';
import { getFieldValuePartner } from '../helpers/formatSortByPartners';

const emptyPartner = {
	companyName: '',
	companyRegistrationNumber: '',
	industry: '',
	companyRepresentative: '',
	website: '',
	socialMedia: '',
	partnershipStatus: 'Pending',
	partnershipStartDate: null,
	partnershipEndDate: null,
	rating: 0,
	documents: [],

	legalRepresentative: '',
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
};

const initialPartnersState: PartnersState = {
	allPartners: [],
	partners: [],
	partner: emptyPartner,
	partnerFormData: emptyPartner,
};

const partnersReducer = (state: PartnersState, action: PartnersAction) => {
	switch (action.type) {
		case 'SET_ALL_PARTNERS':
			return { ...state, allPartners: action.payload };
		case 'SET_PARTNERS':
			return {
				...state,
				partners: action.payload,
			};
		case 'SET_PARTNER':
			return { ...state, partner: action.payload };
		case 'SET_COMPANY_NAME':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					companyName: action.payload,
				},
			};

		case 'SET_COMPANY_REGISTRATION_NUMBER':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					companyRegistrationNumber: action.payload,
				},
			};
		case 'SET_PARTNER_FORM_DATA':
			return {
				...state,
				partnerFormData: action.payload,
			};

		case 'SET_PARTNER_FORM_DATA_INPUT': {
			const { name, value } = action.payload;
			return {
				...state,
				partnerFormData: { ...state.partnerFormData, [name]: value },
			};
		}
		case 'SET_INDUSTRY':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					industry: action.payload,
				},
			};

		case 'SET_CONTACT_FIELD': {
			const { field, value } = action.payload;
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					contact: { ...state.partnerFormData.contact, [field]: value },
				},
			};
		}

		case 'SET_CONTRACT_DOCUMENT':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					documents: action.payload,
				},
			};

		case 'DELETE_CONTRACT_DOCUMENT': {
			const document = action.payload;
			return {
				...state,
				partner: {
					...state.partner,
					documents: state.partner?.documents.filter(item => item !== document),
				},
			};
		}

		case 'SET_COMPANY_REPRESENTATIVE':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					companyRepresentative: action.payload,
				},
			};
		case 'SET_WEBSITE':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					website: action.payload,
				},
			};
		case 'SET_SOCIAL_MEDIA':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					socialMedia: action.payload,
				},
			};
		case 'SET_PARTNERSHIP_STATUS':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					partnershipStatus: action.payload,
				},
			};
		case 'SET_PARTNERSHIP_START_DATE':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					partnershipStartDate: action.payload
						? new Date(action.payload)
						: null,
				},
			};
		case 'SET_PARTNERSHIP_END_DATE':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					partnershipEndDate: action.payload ? new Date(action.payload) : null,
				},
			};

		case 'SET_RATING':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					rating: action.payload,
				},
			};
		case 'SET_LEGAL_REPRESENTATIVE':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					legalRepresentative: action.payload,
				},
			};
		case 'SET_NOTES':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					notes: action.payload,
				},
			};

		case 'SET_ADDRESS':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData, // Preserve the rest of the partnerFormData
					contact: {
						...state.partnerFormData.contact, // Preserve other contact fields
						address: action.payload,
					},
				},
			};

		case 'SET_EMAIL':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					contact: {
						...state.partnerFormData.contact,
						email: action.payload,
					},
				},
			};
		case 'SET_TELEPHONE':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					contact: {
						...state.partnerFormData.contact,
						telephone: action.payload,
					},
				},
			};
		case 'SET_CITY':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					contact: {
						...state.partnerFormData.contact,
						city: action.payload,
					},
				},
			};
		case 'SET_COUNTRY':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					contact: {
						...state.partnerFormData.contact,
						country: action.payload,
					},
				},
			};
		case 'SET_ZIP':
			return {
				...state,
				partnerFormData: {
					...state.partnerFormData,
					contact: {
						...state.partnerFormData.contact,
						zip: action.payload,
					},
				},
			};

		case 'DELETE_PARTNER':
			return {
				...state,
				allPartners: state.allPartners.filter(
					emp => emp._id !== action.payload,
				),
			};
		case 'SEARCH_BY_NAME': {
			const searchTerm = action.payload.toLowerCase();
			const filteredPartners = state.partners.filter(partner =>
				partner.companyName.toLowerCase().startsWith(searchTerm),
			);
			return { ...state, allPartners: filteredPartners };
		}
		case 'SORT_PARTNERS': {
			const field = action.payload;
			console.log(field);
			const sortedPartners = [...state.allPartners].sort((a, b) => {
				const valueA = getFieldValuePartner(a, field);
				const valueB = getFieldValuePartner(b, field);

				return valueA.localeCompare(valueB); // Always A-Z
			});

			return { ...state, allPartners: sortedPartners };
		}
		case 'RESET_PARTNER_STATE':
			return { ...initialPartnersState };

		default:
			return state;
	}
};

export const PartnersContext = createContext<PartnersContextType>({
	state: initialPartnersState,
	dispatch: () => {
		throw new Error('dispatch called outside of PartnersProvider');
	},
});

export const PartnersProvider = ({ children }: PartnersProvidersProps) => {
	const [state, dispatch] = useReducer(partnersReducer, initialPartnersState);

	return (
		<PartnersContext.Provider value={{ state, dispatch }}>
			{children}
		</PartnersContext.Provider>
	);
};

export function usePartners() {
	const context = useContext(PartnersContext);
	if (!context) {
		throw new Error('usePartners must be used within an PartnersProvider');
	}
	return context;
}
