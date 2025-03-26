'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

import ConfirmDelete from '@/app/admin/ui/ConfirmDelete';

import { useCustomer } from '@/app/admin/context/CustomersContext';
import {
	deleteCustomer,
	displayCustomer,
	updateCustomer,
} from '@/app/admin/services/customersService';
import {
	handleCustomerFormdata,
	handleCustomerInputChange,
} from '@/app/admin/helpers/handleCustomerChange';

import { handleSubmitCustomerForm } from '@/app/admin/utils/appendCustomerFormData';
import EditCustomerForm from './EditCustomerForm';

export default function EditCustomer() {
	const router = useRouter();
	const { id } = useParams<{ id: string }>();
	const { dispatch, state } = useCustomer();
	const { customer, customerFormData } = state;

	const [readOnly, setReadOnly] = useState(true);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [file, setFile] = useState<File[]>([]);
	const [validated, setValidated] = useState(false);

	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);

	useEffect(() => {
		displayCustomer(dispatch, id);
	}, [dispatch, id]);

	useEffect(() => {
		if (customer) {
			handleCustomerFormdata(customer, dispatch);
		}
	}, [customer, dispatch]);

	const handleChange = function (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) {
		handleCustomerInputChange(e, setFile, dispatch);
	};

	const handleSubmitCustomer = (e: React.FormEvent<HTMLFormElement>) => {
		handleSubmitCustomerForm(
			e,
			setValidated,
			customerFormData,
			file,
			updateCustomer,
			id,
			dispatch,
			setReadOnly,
		);
	};

	const handleDelete = async function () {
		await deleteCustomer(id);
		dispatch({ type: 'DELETE_CUSTOMER', payload: id });
		router.push('/admin/dashboard/customers');
	};

	if (!customer) return <LoadingSpinner />;
	return (
		<div>
			<ConfirmDelete
				handleDelete={handleDelete}
				show={showConfirmDelete}
				handleClose={handleClose}
			/>

			<EditCustomerForm
				customerFormData={customerFormData}
				handleChange={handleChange}
				readOnly={readOnly}
				setReadOnly={setReadOnly}
				handleSubmitCustomerForm={handleSubmitCustomer}
				handleShow={handleShow}
				id={id}
				validated={validated}
			/>
		</div>
	);
}
