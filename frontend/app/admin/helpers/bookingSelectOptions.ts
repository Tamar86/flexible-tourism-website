import { Customer, CustomerFormData } from '../types/customers';
import { Employee, EmployeeFormData, Employees } from '../types/employees';
import { Partner, PartnerFormData } from '../types/partners';
import { Tour } from '../types/tours';

export function BookingSelectOptions(
	allEmployees: Employees[],
	allCustomers: CustomerFormData[],
	allPartners: PartnerFormData[],
	allTours: Tour[],
) {
	const bookingTypeOptions = [
		{ value: 'B2B', label: 'B2B' },
		{ value: 'B2C', label: 'B2C' },
	];

	const tourGuideOptions = allEmployees
		.filter(employee => employee.position === 'Tour Guide')
		.map(employee => ({
			value: employee._id,
			label: `${employee.fullname.firstName} ${employee.fullname.lastName}`,
		}));

	const tourOperatorOptions = allEmployees
		.filter(employee => employee.position === 'Tour Operator')
		.map(employee => ({
			value: employee._id,
			label: `${employee.fullname.firstName} ${employee.fullname.lastName}`,
		}));

	const tourDriverOptions = allEmployees
		.filter(employee => employee.position === 'Tour Driver')
		.map(employee => ({
			value: employee._id,
			label: `${employee.fullname.firstName} ${employee.fullname.lastName}`,
		}));

	const customerOptions = allCustomers.map(customer => ({
		value: customer._id,
		label: `${customer.fullname}`,
	}));

	const partnerOptions = allPartners.map(partner => ({
		value: partner._id,
		label: `${partner.companyName}`,
	}));

	const tourOptions = allTours.map(tour => ({
		value: tour._id,
		label: `${tour.name}`,
	}));

	const bookingStatusOptions = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'confirmed', label: 'Confirmed' },
		{ value: 'canceled', label: 'Cancel' },
	];

	return {
		bookingTypeOptions,
		bookingStatusOptions,
		tourOptions,
		partnerOptions,
		customerOptions,
		tourGuideOptions,
		tourDriverOptions,
		tourOperatorOptions,
	};
}
