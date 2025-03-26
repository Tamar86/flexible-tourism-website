'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePartners } from '@/app/admin/context/PartnersContext';

import {
	deletePartner,
	displayPartner,
	updatePartner,
} from '@/app/admin/services/partnersService';

import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

import {
	handlePartnerFormdata,
	handlePartnerInputChange,
} from '@/app/admin/helpers/handlePartnerChange';
import EditPartnerForm from './EditPartnerForm';
import ConfirmDelete from '@/app/admin/ui/ConfirmDelete';
import { handleSubmitPartnerForm } from '@/app/admin/utils/appendPartnerFormData';

export default function EditPartner() {
	const { id } = useParams<{ id: string }>();
	const { dispatch, state } = usePartners();
	const { partner, partnerFormData } = state;

	const [readOnly, setReadOnly] = useState(true);
	const router = useRouter();
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [file, setFile] = useState<File[]>([]);

	const [validated, setValidated] = useState(false);

	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);

	useEffect(() => {
		displayPartner(dispatch, id);
	}, [dispatch, id]);

	useEffect(() => {
		if (partner) {
			handlePartnerFormdata(partner, dispatch);
		}
	}, [partner, dispatch]);
	//
	const handleChange = function (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) {
		handlePartnerInputChange(e, setFile, dispatch);
	};

	const handleSubmitPartner = (e: React.FormEvent<HTMLFormElement>) => {
		handleSubmitPartnerForm(
			e,
			setValidated,
			partnerFormData,
			file,
			updatePartner,
			id,
			dispatch,
			setReadOnly,
		);
	};

	const handleDelete = async function () {
		await deletePartner(id);
		dispatch({ type: 'DELETE_PARTNER', payload: id });
		router.push('/admin/dashboard/partners');
	};

	if (!partner) return <LoadingSpinner />;
	return (
		<div>
			<ConfirmDelete
				handleDelete={handleDelete}
				show={showConfirmDelete}
				handleClose={handleClose}
			/>

			<EditPartnerForm
				partnerFormData={partnerFormData}
				handleChange={handleChange}
				readOnly={readOnly}
				setReadOnly={setReadOnly}
				handleSubmitPartnerForm={handleSubmitPartner}
				handleShow={handleShow}
				id={id}
				validated={validated}
			/>
		</div>
	);
}
