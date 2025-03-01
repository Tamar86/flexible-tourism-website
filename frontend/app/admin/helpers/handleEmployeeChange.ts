import { Employee, EmployeeFormData } from '../types/employees';

export const handleEditEmployeeForm = function (
	e: React.ChangeEvent<
		HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	>,
	setFormData: React.Dispatch<React.SetStateAction<EmployeeFormData>>,
) {
	const { name, value } = e.target;
	if (name.startsWith('fullname.')) {
		// Update nested fullname field
		const field = name.split('.')[1]; // e.g., fullname.firstName -> firstName
		setFormData(prev => ({
			...prev,
			fullname: {
				...prev.fullname,
				[field]: value,
			},
		}));
	} else if (name.startsWith('contact.')) {
		// Update nested contact field
		const field = name.split('.')[1];
		setFormData(prev => ({
			...prev,
			contact: {
				...prev.contact,
				[field]: value,
			},
		}));
	} else {
		// Flat fields (like idNumber, position)
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	}
};

export const handleFormdata = function (
	employee: Employee | null,
	setFormData: React.Dispatch<React.SetStateAction<EmployeeFormData>>,
) {
	if (employee) {
		setFormData({
			fullname: {
				firstName: employee.fullname.firstName,
				lastName: employee.fullname.lastName,
			},
			contact: {
				address: employee.contact.address,
				telephone: employee.contact.telephone,
				email: employee.contact.email,
				city: employee.contact.city,
				country: employee.contact.country,
				zip: employee.contact.zip,
			},
			idNumber: employee.idNumber,
			bankAccount: employee.bankAccount,
			employmentType: employee.employmentType,
			position: employee.position,
			notes: employee.notes,
		});
	}
};
