'use client';

import { useGeneral } from '@/app/admin/context/GeneralContext';
import { useTours } from '@/app/admin/context/ToursContext';
import {
	deleteTour,
	displayAllTours,
	updateTour,
} from '@/app/admin/services/toursService';
import Button from '@/app/admin/ui/Button';
import ConfirmDelete from '@/app/admin/ui/ConfirmDelete';
import Form from '@/app/admin/ui/Form';
import Input from '@/app/admin/ui/Input';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditTour() {
	const [validated, setValidated] = useState(false);

	const { state, dispatch } = useTours();
	const { allTours, tour, toursFormData } = state;
	const { state: generalState, dispatch: generalDispatch } = useGeneral();
	const { readOnly } = generalState;
	const { id } = useParams<{ id: string }>();
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);
	const router = useRouter();

	console.log('read only', readOnly);

	console.log('Data', toursFormData);

	useEffect(() => {
		displayAllTours(dispatch);
	}, [dispatch]);

	useEffect(() => {
		if (allTours.length > 0) {
			dispatch({ type: 'SET_TOUR_FORM', payload: id });
		}
	}, [dispatch, id, allTours]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);

		try {
			const formData = new FormData();
			const {
				name,
				location,
				duration: { days, nights },
				minGroupSize,
				minPrice,
				description,
				notes,
			} = toursFormData;
			formData.append('name', name ?? '');
			formData.append('location', location ?? '');
			formData.append('durationDays', days.toString() ?? '');
			formData.append('durationNights', nights.toString() ?? '');
			formData.append('minGroupSize', minGroupSize.toString() ?? '');
			formData.append('minPrice', minPrice.toString() ?? '');
			formData.append('description', description ?? '');
			formData.append('notes', notes ?? '');
			// Debugging: Log FormData entries
			for (const [key, value] of formData.entries()) {
				console.log(key, value);
			}
			await updateTour(formData, id, dispatch);
			generalDispatch({ type: 'SET_READONLY', payload: true });
		} catch (error) {
			console.error('Error in handleSubmit new tour:', error);
		}
	};

	const handleChange = function (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) {
		const { name, value } = e.target as HTMLInputElement;

		if (name.startsWith('duration.')) {
			// Update nested contact field
			const field = name.split('.')[1];
			dispatch({
				type: 'SET_DURATION_FIELD',
				payload: { field, value: Number(value) },
			});
		} else {
			// Flat fields (like idNumber, position)

			dispatch({
				type: 'SET_TOUR_FORM_DATA_INPUT',
				payload: { name, value },
			});
		}
	};

	const handleDelete = function () {
		deleteTour(id);
		dispatch({ type: 'DELETE_TOUR', payload: id });
		router.push('/admin/dashboard/tours');
	};

	if (!tour || toursFormData.name === '') return <LoadingSpinner />;

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='tourTitle'>Tour Title</label>
					<Input
						id='tourTitle'
						name='name'
						required
						type='text'
						placeholder=''
						value={toursFormData.name || ''}
						onChange={handleChange}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='location'>Location</label>
					<Input
						id='location'
						name='location'
						required
						type='text'
						placeholder=''
						value={toursFormData.location || ''}
						onChange={handleChange}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='days'>Days</label>
					<Input
						id='days'
						name='duration.days'
						required
						type='number'
						placeholder=''
						value={toursFormData.duration.days ?? 0}
						onChange={handleChange}
						min={1}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='nights'>Nights</label>
					<Input
						id='nights'
						name='duration.nights'
						required
						type='number'
						placeholder=''
						value={toursFormData.duration.nights ?? 0}
						onChange={handleChange}
						min={0}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='minGroupSize'>Min Group Size</label>
					<Input
						id='minGroupSize'
						name='minGroupSize'
						required
						type='number'
						placeholder=''
						value={toursFormData.minGroupSize}
						onChange={handleChange}
						min={0}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='minPrice'>Min Price</label>
					<Input
						id='minPrice'
						name='minPrice'
						required
						type='number'
						placeholder=''
						value={toursFormData.minPrice}
						onChange={handleChange}
						min={0}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='description'>Description</label>
					<Input
						id='description'
						name='description'
						required
						type='text'
						placeholder=''
						value={toursFormData.description || ''}
						onChange={handleChange}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='notes'>Notes</label>
					<textarea
						id='notes'
						name='notes'
						required
						placeholder=''
						value={toursFormData.notes || ''}
						onChange={handleChange}
						disabled={readOnly}
					/>
				</div>
				<label className='flex items-center justify-between'>
					{readOnly ? (
						<Button
							label='Edit Partner'
							className=''
							type='button'
							onClick={e => {
								e.preventDefault();
								generalDispatch({ type: 'SET_READONLY', payload: false });
							}}
						/>
					) : (
						<Button label='Save Changes' type='submit' className='' />
					)}

					<Button
						label='Delete'
						type='button'
						className=''
						onClick={handleShow}
					/>
				</label>
			</Form>
			<ConfirmDelete
				handleDelete={handleDelete}
				show={showConfirmDelete}
				handleClose={handleClose}
			/>
		</>
	);
}
