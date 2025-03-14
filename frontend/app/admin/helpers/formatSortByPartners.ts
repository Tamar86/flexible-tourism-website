import { Partner } from '../types/partners';

export const formatFieldNamePartner = (field: string) => {
	switch (field) {
		case 'companyName':
			return 'Company Name';
		case 'country':
			return 'Country';
		case 'companyRepresentative':
			return 'Representative';
		default:
			return field;
	}
};

export const getFieldValuePartner = (partner: Partner, field: string) => {
	switch (field) {
		case 'companyName':
			return partner.companyName || '';
		case 'country':
			return partner.contact.country || '';
		case 'companyRepresentative':
			return partner.companyRepresentative || '';
		default:
			return '';
	}
};
