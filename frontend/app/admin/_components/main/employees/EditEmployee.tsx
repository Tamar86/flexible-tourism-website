'use client';

const editEmployeeFormData = {
	fullname: {
		firstName: '',
		lastName: '',
	},
	contact: {
		address: '',
		telephone: '',
		email: '',
		city: '',
		country: '',
		zip: '',
	},
	idNumber: '',
	bankAccount: '',
	employmentType: '',
	position: '',
	notes: '',
};

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEmployees } from '@/app/admin/context/EmployeesContext';
import {
	deleteEmployee,
	displayEmployee,
	updateEmployee,
} from '@/app/admin/services/employeesService';
import {
	handleEditEmployeeForm,
	handleFormdata,
} from '@/app/admin/helpers/handleEmployeeChange';

// COMPONENTS
import DeleteEmployeeConfirm from './DeleteEmployeeConfirm';
import EditEmployeeForm from './EditEmployeeForm';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

export default function EditEmployee() {
	const router = useRouter();
	const { id } = useParams<{ id: string }>();

	const { dispatch, state } = useEmployees();
	const { employee } = state;
	const [readOnly, setReadOnly] = useState(true);
	const [formData, setFormData] = useState(editEmployeeFormData);

	//////////////////////////
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);

	useEffect(() => {
		handleFormdata(employee, setFormData);
	}, [employee]);

	useEffect(() => {
		displayEmployee(dispatch, id);
	}, [id, dispatch]);

	const handleSubmitForm = async (e: React.FormEvent) => {
		e.preventDefault();

		await updateEmployee(formData, id);

		setReadOnly(true);
	};

	//HANDLE CHANGE

	const handleChange = function (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) {
		handleEditEmployeeForm(e, setFormData);
	};

	const handleDelete = async function () {
		await deleteEmployee(id);
		router.push('/admin/dashboard/employees');
	};

	if (!employee) return <LoadingSpinner />;
	return (
		<>
			<DeleteEmployeeConfirm
				id=''
				handleDelete={handleDelete}
				show={showConfirmDelete}
				handleClose={handleClose}
			/>

			<EditEmployeeForm
				formData={formData}
				readOnly={readOnly}
				handleChange={handleChange}
				setReadOnly={setReadOnly}
				handleSubmitForm={handleSubmitForm}
				handleShow={handleShow}
			/>
		</>
	);
}
