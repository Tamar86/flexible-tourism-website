'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import { useCustomer } from '@/app/admin/context/CustomersContext';
import {
	deleteCustomersDocument,
	displayCustomer,
} from '@/app/admin/services/customersService';

import DisplayDocuments from '@/app/admin/ui/DisplayDocuments';

export default function DisplayCustomerDocuments() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const { state, dispatch } = useCustomer();
	const { customer } = state;

	const [loading, setLoading] = useState(true);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		setLoading(true);

		displayCustomer(dispatch, id);

		setLoading(false);
	}, [dispatch, id]);

	const handleDeleteDocument = (doc: string) => {
		deleteCustomersDocument(doc, dispatch);
		setActiveIndex(null);
	};

	if (customer.documents.length === 0)
		return <div>NO DOCUMENTS TO DISPLAY</div>;

	if (loading) return <LoadingSpinner />;

	console.log('Customer', customer);

	return (
		<DisplayDocuments
			item={customer}
			activeIndex={activeIndex}
			setActiveIndex={setActiveIndex}
			handleDeleteDocument={handleDeleteDocument}
		/>
	);
}
