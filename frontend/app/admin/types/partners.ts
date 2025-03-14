//  TYPES

import { Dispatch, ReactNode } from 'react';

interface PartnersContact {
	address: string;
	telephone: string;
	email: string;
	city: string;
	country: string;
	zip: string;
}

// Define the shape of each partner

export interface Partner {
	_id: string;
	companyName: string;
	companyRegistrationNumber: string;
	industry: string;
	companyRepresentative: string;
	contact: PartnersContact;
	website: string;
	socialMedia: string;
	partnershipStatus: string;
	partnershipStartDate: Date | null;
	partnershipEndDate: Date | null;
	rating: number;
	contractDocuments: (File | string)[];
	contractDocumentsUrls: string[];
	legalRepresentative: string;
	// deletedDocuments: string[];
	notes?: string;
}

export interface PartnersState {
	allPartners: Partner[];
	partners: Partner[];
	partner: Partner;
	partnerFormData: PartnerFormData;
}

// Define action types

export type PartnersAction =
	| { type: 'SET_ALL_PARTNERS'; payload: Partner[] }
	| { type: 'SET_PARTNERS'; payload: Partner[] }
	| { type: 'SET_PARTNER'; payload: Partner }
	| {
			type: 'SET_PARTNER_FORM_DATA';
			payload: PartnerFormData;
	  }
	| {
			type: 'SET_PARTNER_FORM_DATA_INPUT';
			payload: { name: string; value: string | number };
	  }
	| { type: 'SEARCH_BY_NAME'; payload: string }
	| {
			type: 'SET_CONTACT_FIELD';
			payload: { field: string; value: string };
	  }
	| { type: 'SORT_PARTNERS'; payload: string }
	| { type: 'DELETE_PARTNER'; payload: string }
	| { type: 'SET_COMPANY_NAME'; payload: string }
	| { type: 'SET_COMPANY_REGISTRATION_NUMBER'; payload: string }
	| { type: 'SET_INDUSTRY'; payload: string }
	| { type: 'DELETE_CONTRACT_DOCUMENT'; payload: string }
	| { type: 'SET_CONTRACT_DOCUMENT'; payload: (File | string)[] }
	| { type: 'SET_CONTRACT_DOCUMENT_URLS'; payload: string[] }
	| { type: 'SET_COMPANY_REPRESENTATIVE'; payload: string }
	| { type: 'SET_WEBSITE'; payload: string }
	| { type: 'SET_SOCIAL_MEDIA'; payload: string }
	| { type: 'SET_PARTNERSHIP_STATUS'; payload: string }
	| { type: 'SET_PARTNERSHIP_START_DATE'; payload: Date | null }
	| { type: 'SET_PARTNERSHIP_END_DATE'; payload: Date | null }
	| { type: 'SET_RATING'; payload: number }
	| { type: 'SET_LEGAL_REPRESENTATIVE'; payload: string }
	| { type: 'SET_NOTES'; payload: string }
	| { type: 'SET_ADDRESS'; payload: string }
	| { type: 'SET_EMAIL'; payload: string }
	| { type: 'SET_TELEPHONE'; payload: string }
	| { type: 'SET_CITY'; payload: string }
	| { type: 'SET_COUNTRY'; payload: string }
	| { type: 'SET_ZIP'; payload: string }
	| { type: 'RESET_PARTNER_STATE' };

// Define the shape of context value

export interface PartnersContextType {
	state: PartnersState;
	dispatch: Dispatch<PartnersAction>;
}

// Provider component props type
export interface PartnersProvidersProps {
	children: ReactNode;
}

export type PartnerFormData = {
	companyName: string;
	companyRegistrationNumber: string;
	industry: string;
	companyRepresentative: string;
	contact: PartnersContact;
	website: string;
	socialMedia: string;
	partnershipStatus: string;
	partnershipStartDate: Date | null;
	partnershipEndDate: Date | null;
	rating: number;
	contractDocuments: (File | string)[];
	contractDocumentsUrls: string[];
	legalRepresentative: string;
	notes?: string;
	// deletedDocuments: string[];
	_id: string;
};

import { SetBooleanState } from './employees';

export interface DeletePartner {
	id: string;
	show: boolean;
	handleDelete: () => void;
	handleClose: () => void;
}

export interface EditPartnerFormType {
	partnerFormData: PartnerFormData;
	id: string;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => void;
	readOnly: boolean;
	setReadOnly: SetBooleanState;
	handleSubmitPartnerForm: (e: React.FormEvent<HTMLFormElement>) => void;
	handleShow: () => void;
	validated: boolean;
}

export interface PartnerFormProps {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	handleClose: () => void;
}
