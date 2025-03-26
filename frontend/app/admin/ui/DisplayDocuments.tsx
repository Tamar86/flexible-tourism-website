'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import Button from './Button';
import { Booking } from '../types/bookings';

import { Partner } from '../types/partners';
import { Customer } from '../types/customers';

interface DisplayDocumentsProps {
	item: Booking | Customer | Partner;
	activeIndex: number | null;
	setActiveIndex: Dispatch<SetStateAction<number | null>>;
	handleDeleteDocument: (doc: string) => void;
}

export default function DisplayDocuments({
	item,
	activeIndex,
	setActiveIndex,
	handleDeleteDocument,
}: DisplayDocumentsProps) {
	const BASE_URL = 'http://localhost:5000'; //NEEDS TO BE GOING TO ENV

	if (item?.documents.length === 0) return <div>NO DOCUMENTS TO DISPLAY</div>;

	return (
		<ul>
			{item?.documents.map((doc, index) => {
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
							<Image
								width={500}
								height={500}
								src={fullUrl}
								alt={`Document ${index + 1}`}
							/>
						) : isPDF ? (
							<iframe title='pdf' src={fullUrl} width='100%' height='500px' />
						) : (
							<a href={fullUrl} download>
								Download {fileUrl.split('/').pop()}
							</a>
						)}

						{activeIndex === index && (
							<div>
								<h2>Want to delete document?</h2>
								<Button
									type='button'
									label='Cancel'
									onClick={() => setActiveIndex(null)}
									className=''
								/>
								<Button
									type='button'
									label='Delete'
									onClick={() => handleDeleteDocument(fullUrl)}
									className=''
								/>
							</div>
						)}

						{activeIndex === null && (
							<Button
								type='button'
								label='Delete Document'
								key={index}
								onClick={() => setActiveIndex(index)}
								className=''
							/>
						)}
					</li>
				);
			})}
		</ul>
	);
}
