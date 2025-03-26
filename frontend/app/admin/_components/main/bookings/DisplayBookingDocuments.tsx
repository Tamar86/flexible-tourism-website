'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import { useBookings } from '@/app/admin/context/BookingsContext';
import {
	deleteBookingsDocument,
	displayBooking,
} from '@/app/admin/services/bookingsService';
import DisplayDocuments from '@/app/admin/ui/DisplayDocuments';

export default function DisplayBookingDocuments() {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const { state, dispatch } = useBookings();
	const { booking } = state;

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		setLoading(true);

		displayBooking(dispatch, id);

		setLoading(false);
	}, [dispatch, id]);

	const handleDeleteDocument = (doc: string) => {
		deleteBookingsDocument(doc, dispatch);
		setActiveIndex(null);
	};
	if (loading) return <LoadingSpinner />;
	console.log('booking', booking);
	return (
		<DisplayDocuments
			item={booking}
			activeIndex={activeIndex}
			setActiveIndex={setActiveIndex}
			handleDeleteDocument={handleDeleteDocument}
		/>
	);
}
