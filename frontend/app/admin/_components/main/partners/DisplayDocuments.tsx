'use client';

import { useEffect, useState } from 'react';
import { usePartners } from '@/app/admin/context/PartnersContext';
import {
	deletePartnersDocument,
	displayPartner,
} from '@/app/admin/services/partnersService';
import { Alert, Button, Image } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

export default function DisplayDocuments() {
	const [activeAlertIndex, setActiveAlertIndex] = useState<number | null>(null);

	const { state, dispatch } = usePartners();
	const { partner } = state;
	const [loading, setLoading] = useState(true);
	const { id } = useParams<{ id: string }>();

	console.log('id', id);

	const BASE_URL = 'http://localhost:5000'; //NEEDS TO BE GOING TO ENV

	useEffect(() => {
		setLoading(true);

		displayPartner(dispatch, id);

		setLoading(false);
	}, [dispatch, id]);

	const handleDeleteDocument = (doc: string) => {
		deletePartnersDocument(doc, dispatch);
		setActiveAlertIndex(null);
	};

	if (partner?.contractDocuments.length === 0)
		return <div>NO DOCUMENTS TO DISPLAY</div>;

	if (loading) return <LoadingSpinner />;

	console.log('Partner', partner);
	return (
		<ul>
			{partner?.contractDocuments.map((doc, index) => {
				let fileUrl = '';
				// Check if doc is a File object or a URL string
				if (doc instanceof File) {
					// Create a temporary URL for the File object
					fileUrl = URL.createObjectURL(doc);
				} else {
					// Otherwise, it's a string (URL)
					fileUrl = `${BASE_URL}${doc}`;
				}
				const fullUrl = `${BASE_URL}${doc}`; // Convert relative path to full URL
				const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileUrl);
				const isPDF = /\.pdf$/i.test(fileUrl);

				return (
					<li key={index}>
						{isImage ? (
							<Image src={fullUrl} alt={`Document ${index + 1}`} fluid />
						) : isPDF ? (
							<iframe title='pdf' src={fullUrl} width='100%' height='500px' />
						) : (
							<a href={fullUrl} download>
								Download {fileUrl.split('/').pop()}
							</a>
						)}

						<Alert show={activeAlertIndex === index} variant='success'>
							<Alert.Heading>Warning!</Alert.Heading>
							<p>Want to delete document?</p>
							<hr />
							<div className='d-flex justify-content-end gap-3'>
								<Button
									onClick={() => setActiveAlertIndex(null)}
									variant='outline-success'
								>
									Cancel
								</Button>

								<Button
									onClick={() => handleDeleteDocument(fullUrl)}
									variant='outline-danger'
								>
									Delete
								</Button>
							</div>
						</Alert>

						{activeAlertIndex === null && (
							<Button
								key={index}
								variant='danger'
								onClick={() => setActiveAlertIndex(index)}
							>
								Delete Document
							</Button>
						)}
					</li>
				);
			})}
		</ul>
	);
}
