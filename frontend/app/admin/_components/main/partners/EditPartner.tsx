'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePartners } from '@/app/admin/context/PartnersContext';

import {
	deletePartner,
	displayPartner,
	updatePartner,
} from '@/app/admin/services/partnersService';

import DeletePartnerConfirm from './DeletePartnerConfirm';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

import {
	handlePartnerFormdata,
	handlePartnerInputChange,
} from '@/app/admin/helpers/handlePartnerChange';
import EditPartnerForm from './EditPartnerForm';

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

	const handleSubmitPartnerForm = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (!form.checkValidity()) {
			e.stopPropagation();
			setValidated(true);
			return;
		}

		const formData = new FormData();
		const {
			companyName,
			companyRegistrationNumber,
			industry,
			companyRepresentative,
			website,
			socialMedia,
			partnershipStatus,
			partnershipStartDate,
			partnershipEndDate,
			rating,
			legalRepresentative,
			notes,
			// deletedDocuments,

			contact: { address, telephone, email, city, country, zip },
		} = partnerFormData;

		formData.append('companyName', companyName);
		formData.append('companyRegistrationNumber', companyRegistrationNumber);
		formData.append('industry', industry);
		formData.append('companyRepresentative', companyRepresentative ?? '');
		formData.append('website', website);
		formData.append('socialMedia', socialMedia);
		formData.append('partnershipStatus', partnershipStatus);
		formData.append('notes', notes || '');

		if (partnershipStartDate) {
			formData.append(
				'partnershipStartDate',
				new Date(partnershipStartDate).toISOString(),
			);
		}
		if (partnershipEndDate) {
			formData.append(
				'partnershipEndDate',
				new Date(partnershipEndDate).toISOString(),
			);
		}
		formData.append('rating', rating.toString());
		formData.append('legalRepresentative', legalRepresentative ?? '');

		formData.append('contactAddress', address ?? '');
		formData.append('contactTelephone', telephone ?? '');
		formData.append('contactEmail', email ?? '');
		formData.append('contactCity', city ?? '');
		formData.append('contactCountry', country ?? '');
		formData.append('contactZip', zip ?? '');

		//✅ Append files

		if (file && file.length > 0) {
			file.forEach(el => {
				formData.append('contractDocuments', el);
			});
		} else {
			console.warn('FILE is not an array or is empty', file);
		}

		// if (deletedDocuments && deletedDocuments.length > 0) {
		// formData.append('deletedDocuments', JSON.stringify(deletedDocuments));
		// }

		for (const [key, value] of formData.entries()) {
			console.log(`${key}:`, value);
		}

		try {
			await updatePartner(formData, id, dispatch);

			setReadOnly(true);
		} catch (error) {
			console.error('Upload failed:', error);
		}
	};

	const handleDelete = async function () {
		await deletePartner(id);
		router.push('/admin/dashboard/partners');
	};

	if (!partner) return <LoadingSpinner />;
	return (
		<div>
			<DeletePartnerConfirm
				id={id}
				handleDelete={handleDelete}
				show={showConfirmDelete}
				handleClose={handleClose}
			/>
			<EditPartnerForm
				partnerFormData={partnerFormData}
				handleChange={handleChange}
				readOnly={readOnly}
				setReadOnly={setReadOnly}
				handleSubmitPartnerForm={handleSubmitPartnerForm}
				handleShow={handleShow}
				id={id}
				validated={validated}
			/>
		</div>
	);
}
