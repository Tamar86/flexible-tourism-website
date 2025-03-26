'use client';

import { useEffect, useState } from 'react';
import { usePartners } from '@/app/admin/context/PartnersContext';
import {
	deletePartnersDocument,
	displayPartner,
} from '@/app/admin/services/partnersService';

import { useParams } from 'next/navigation';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import DisplayDocuments from '@/app/admin/ui/DisplayDocuments';

export default function DisplayPartnerDocuments() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const { state, dispatch } = usePartners();
	const { partner } = state;
	const [loading, setLoading] = useState(true);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		setLoading(true);

		displayPartner(dispatch, id);

		setLoading(false);
	}, [dispatch, id]);

	const handleDeleteDocument = (doc: string) => {
		deletePartnersDocument(doc, dispatch);
		setActiveIndex(null);
	};

	if (partner?.documents.length === 0)
		return <div>NO DOCUMENTS TO DISPLAY</div>;

	if (loading) return <LoadingSpinner />;

	console.log('Partner', partner);

	return (
		<DisplayDocuments
			item={partner}
			activeIndex={activeIndex}
			setActiveIndex={setActiveIndex}
			handleDeleteDocument={handleDeleteDocument}
		/>
	);
}
