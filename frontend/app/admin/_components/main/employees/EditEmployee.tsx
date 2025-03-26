'use client';

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

import EditEmployeeForm from './EditEmployeeForm';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import ConfirmDelete from '@/app/admin/ui/ConfirmDelete';
import { editEmployeeFormData } from '@/constants/employeeFormData';

export default function EditEmployee() {
	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const { dispatch, state } = useEmployees();
	const { employee, idNumbers } = state;

	const [validated, setValidated] = useState(false);

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

	const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		const idNumberInput = form.querySelector<HTMLInputElement>('#IdNumber');
		if (idNumberInput) {
			console.log('11111', idNumberInput.value);
			console.log('22222', employee?.idNumber);
			if (
				idNumbers.includes(idNumberInput.value) &&
				(!employee || idNumberInput.value !== employee?.idNumber)
			) {
				idNumberInput.setCustomValidity('ID Number must be unique.');
			} else {
				idNumberInput.setCustomValidity('');
			}
		}
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		if (form.checkValidity() === true) {
			await updateEmployee(formData, id);
		}
		setValidated(true);
	};

	//HANDLE CHANGE

	const handleChange = function (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) {
		e.preventDefault();

		handleEditEmployeeForm(e, setFormData);
	};

	const handleDelete = async function () {
		await deleteEmployee(id);
		dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
		router.push('/admin/dashboard/employees');
	};

	if (!employee) return <LoadingSpinner />;
	return (
		<>
			<ConfirmDelete
				handleDelete={handleDelete}
				handleClose={handleClose}
				show={showConfirmDelete}
			/>

			<EditEmployeeForm
				formData={formData}
				handleChange={handleChange}
				handleSubmitForm={handleSubmitForm}
				handleShow={handleShow}
				validated={validated}
			/>
		</>
	);
}
