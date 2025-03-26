import { Customer } from '../types/customers';

export const formatFieldNameCustomer = (field: string) => {
	switch (field) {
		case 'fullname':
			return 'Fullname';
		case 'country':
			return 'Country';
		case 'createdAt':
			return 'Most Recent';
		case 'createdAtOldest':
			return 'Oldest';
		default:
			return field;
	}
};

export const getFieldValueCustomer = (customer: Customer, field: string) => {
	switch (field) {
		case 'fullname':
			return customer.fullname || '';
		case 'country':
			return customer.contact.country || '';
		case 'createdAt':
			return customer.createdAt || '';
		case 'createdAtOldest':
			return customer.createdAt || '';
		default:
			return '';
	}
};
