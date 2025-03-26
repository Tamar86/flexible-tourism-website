import { useTours } from '@/app/admin/context/ToursContext';

import { addNewTour } from '@/app/admin/services/toursService';
import Button from '@/app/admin/ui/Button';
import Form from '@/app/admin/ui/Form';
import Input from '@/app/admin/ui/Input';
import Modal from '@/app/admin/ui/Modal';

export interface ToursFormProps {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	handleClose: () => void;
}

export default function AddNewTourForm({
	show,
	setShow,
	handleClose,
}: ToursFormProps) {
	const { state, dispatch } = useTours();
	const { toursFormData, tour } = state;

	console.log('toursDormData', toursFormData);
	console.log('tour', tour);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (!form.checkValidity()) {
			event.stopPropagation();

			return;
		}

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

			await addNewTour(formData, dispatch, handleClose);
		} catch (error) {
			console.error('Error in handleSubmit new tour:', error);
		}
	};

	return (
		<>
			<Modal
				isOpen={show}
				onClose={() => setShow(false)}
				title='Register new tour'
			>
				{/* FORM **************************************************/}
				<Form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='tourName'>Tour Name</label>
						<Input
							id='tourName'
							type='text'
							placeholder='Title'
							onChange={e =>
								dispatch({ type: 'SET_TOUR_NAME', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='location'>Location</label>
						<Input
							id='location'
							type='text'
							placeholder='Location'
							onChange={e =>
								dispatch({
									type: 'SET_TOUR_LOCATION',
									payload: e.target.value,
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='durationDays'>Duration - Days</label>
						<Input
							id='durationDays'
							type='number'
							placeholder='Days'
							min={0}
							onChange={e =>
								dispatch({
									type: 'SET_DURATION_DAYS',
									payload: Number(e.target.value),
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='durationNights'>Duration - Nights</label>
						<Input
							id='durationNights'
							type='number'
							placeholder='Nights'
							min={0}
							onChange={e =>
								dispatch({
									type: 'SET_DURATION_NIGHTS',
									payload: Number(e.target.value),
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='minGroupSize'>Min Group Size</label>
						<Input
							id='minGroupSize'
							type='number'
							placeholder='Min group size'
							min={1}
							onChange={e =>
								dispatch({
									type: 'SET_MIN_GROUP_SIZE',
									payload: Number(e.target.value),
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='minPrice'>Min Price</label>
						<Input
							id='minPrice'
							type='number'
							placeholder=''
							min={0}
							onChange={e =>
								dispatch({
									type: 'SET_MIN_PRICE',
									payload: Number(e.target.value),
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='description'>Description</label>
						<Input
							id='description'
							type='text'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_TOUR_DESCRIPTION',
									payload: e.target.value,
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='notes'>Notes</label>
						<textarea
							id='notes'
							title='Notes'
							placeholder=''
							onChange={e =>
								dispatch({ type: 'SET_NOTES', payload: e.target.value })
							}
							required
						/>
					</div>
					<div className='flex items-center gap-2 justify-end'>
						<Button
							label='Cancel'
							className=''
							type='button'
							onClick={handleClose}
						/>

						<Button label='Save' className='' type='submit' />
					</div>
				</Form>
				{/* ******************************************* */}
			</Modal>
		</>
	);
}
