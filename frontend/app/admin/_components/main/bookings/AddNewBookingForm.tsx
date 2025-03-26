import { useEffect, useState } from 'react';

import { useRef } from 'react';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';

import { BookingFormProps } from '@/app/admin/types/bookings';
import { useBookings } from '@/app/admin/context/BookingsContext';
import { displayAllBookings } from '@/app/admin/services/bookingsService';
import { useCustomer } from '@/app/admin/context/CustomersContext';
import { usePartners } from '@/app/admin/context/PartnersContext';
import { useTours } from '@/app/admin/context/ToursContext';
import { useEmployees } from '@/app/admin/context/EmployeesContext';
import { displayAllCustomers } from '@/app/admin/services/customersService';
import { displayAllPartners } from '@/app/admin/services/partnersService';
import { displayAllTours } from '@/app/admin/services/toursService';
import { displayAllEmployees } from '@/app/admin/services/employeesService';
import CreatableSelect from 'react-select/creatable';

import { handleSubmitBookingForm } from '@/app/admin/utils/appendBookingFormData';
import { BookingSelectOptions } from '@/app/admin/helpers/bookingSelectOptions';
import Modal from '@/app/admin/ui/Modal';
import Button from '@/app/admin/ui/Button';
import Form from '@/app/admin/ui/Form';
import Input from '@/app/admin/ui/Input';

type AccommodationOption = { value: string; label: string };

export default function AddNewBookingForm({
	show,
	setShow,
	handleClose,
}: BookingFormProps) {
	//  VALIDATION

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [validated, setValidated] = useState(false);
	const [selectedAccommodations, setSelectedAccommodations] = useState<
		AccommodationOption[]
	>([]);
	/////////////////////////////////////////////////////////////////////////////////////

	const { state, dispatch } = useBookings();
	const { state: customerState, dispatch: customerDispatch } = useCustomer();
	const { state: partnerState, dispatch: partnerDispatch } = usePartners();
	const { state: tourState, dispatch: tourDispatch } = useTours();
	const { state: employeeState, dispatch: employeeDispatch } = useEmployees();
	const { allPartners } = partnerState;
	const { allTours } = tourState;
	const { allEmployees } = employeeState;
	const { allCustomers } = customerState;
	const { bookingFormData } = state;

	useEffect(() => {
		displayAllBookings(dispatch);
		displayAllCustomers(customerDispatch);
		displayAllPartners(partnerDispatch);
		displayAllTours(tourDispatch);
		displayAllEmployees(employeeDispatch);
	}, [
		dispatch,
		customerDispatch,
		partnerDispatch,
		tourDispatch,
		employeeDispatch,
	]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		handleSubmitBookingForm(
			event,
			setValidated,
			bookingFormData,
			setShow,
			dispatch,
		);
	};

	// ✅ Fixed handleChangeFiles function
	const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const fileArray = Array.from(files);

			dispatch({
				type: 'SET_DOCUMENTS',
				payload: fileArray, // Store all files at once
			});
		}
	};

	const {
		bookingTypeOptions,
		bookingStatusOptions,
		tourOptions,
		partnerOptions,
		customerOptions,
		tourGuideOptions,
		tourDriverOptions,
		tourOperatorOptions,
	} = BookingSelectOptions(allEmployees, allCustomers, allPartners, allTours);

	console.log('customer', bookingFormData.customer);

	return (
		<>
			<Modal
				isOpen={show}
				onClose={() => setShow(false)}
				title='Register new booking'
			>
				<Form onSubmit={handleSubmit}>
					<div>
						<label>Booking Type</label>
						<Select
							options={bookingTypeOptions}
							onChange={selectedOption =>
								dispatch({
									type: 'SET_BOOKING_TYPE',
									payload: selectedOption ? selectedOption.value : '',
								})
							}
							placeholder='Select Booking Type'
							required
						/>
					</div>
					<div>
						<label>Client</label>
						<Select
							options={
								bookingFormData.bookingType === 'B2C'
									? customerOptions
									: partnerOptions
							}
							onChange={selectedOption => {
								if (bookingFormData.bookingType === 'B2C') {
									dispatch({
										type: 'SET_CUSTOMER',
										payload: selectedOption ? selectedOption.value : '',
									});
								} else if (bookingFormData.bookingType === 'B2B') {
									dispatch({
										type: 'SET_PARTNER',
										payload: selectedOption ? selectedOption.value : '',
									});
								}
								return null;
							}}
							placeholder='Select Booking Type'
							required
						/>
					</div>

					<div>
						<label>Tour</label>

						<Select
							options={tourOptions}
							onChange={selectedOption =>
								dispatch({
									type: 'SET_TOUR',
									payload: selectedOption ? selectedOption.value : '',
								})
							}
							required
							placeholder='Select Tour'
						/>
					</div>

					<div>
						<label>Tour Operator</label>

						<Select
							options={tourOperatorOptions}
							onChange={selectedOption =>
								dispatch({
									type: 'SET_TOUR_OPERATOR',
									payload: selectedOption ? selectedOption.value : '',
								})
							}
							required
							placeholder='Select Tour Operator'
						/>
					</div>

					<div>
						<label>Tour Guide</label>
						<Select
							isMulti
							options={tourGuideOptions}
							onChange={selectedOptions => {
								dispatch({
									type: 'SET_TOUR_GUIDE',
									payload: selectedOptions.map(option => option.value),
								});
							}}
							placeholder='Select Tour Guide'
						/>
					</div>

					<div>
						<label>Tour Driver</label>
						<Select
							isMulti
							options={tourDriverOptions}
							onChange={selectedOptions => {
								dispatch({
									type: 'SET_TOUR_DRIVER',
									payload: selectedOptions.map(option => option.value),
								});
							}}
							placeholder='Select Tour Guide'
						/>
					</div>

					<div>
						<label>Accommodations</label>

						<CreatableSelect
							isMulti
							placeholder='Enter or select accommodations'
							value={selectedAccommodations}
							onChange={selectedOptions => {
								// Convert selectedOptions to an array of unique values
								const uniqueOptions = selectedOptions.filter(
									(option, index, self) =>
										index === self.findIndex(o => o.value === option.value), // Keep only the first occurrence
								);

								setSelectedAccommodations(
									uniqueOptions as AccommodationOption[],
								); // Update local state
								dispatch({
									type: 'SET_ACCOMMODATIONS',
									payload: selectedOptions.map(option => option.value),
								});
							}}
						/>
					</div>
					<div>
						<label htmlFor='documents'> Documents</label>
						<Input
							id='documents'
							title='Upload documents'
							multiple
							name='documents'
							type='file'
							accept='.pdf,.jpg,.jpeg,.png'
							onChange={handleChangeFiles}
						/>
					</div>

					<div>
						<label>Tour Start Date</label>
						<Input
							id='TourStartDate'
							title='Tour start date'
							type='date'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_TOUR_START_DATE',
									payload: new Date(e.target.value),
								})
							}
							required
						/>
					</div>
					<div>
						<label htmlFor='tourEndDate'>Tour End Date</label>
						<Input
							id='tourEndDate'
							title='Tour end date'
							type='date'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_TOUR_END_DATE',
									payload: new Date(e.target.value),
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='bookingDate'>Booking Date</label>
						<Input
							id='bookingDate'
							title='Enter booking date'
							type='date'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_BOOKING_DATE',
									payload: new Date(e.target.value),
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='groupSize'>Group Size</label>
						<Input
							id='groupSize'
							title='Enter group size'
							type='number'
							min={1}
							onChange={e =>
								dispatch({
									type: 'SET_GROUP_SIZE',
									payload: Number(e.target.value),
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='price'>Price</label>
						<Input
							id='price'
							title='Enter price'
							type='number'
							min={0}
							onChange={e =>
								dispatch({
									type: 'SET_PRICE',
									payload: Number(e.target.value),
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='extraIncome'>Extra Income</label>
						<Input
							id='extraIncome'
							title='Enter extra income'
							type='number'
							min={0}
							onChange={e =>
								dispatch({
									type: 'SET_EXTRA_INCOME',
									payload: Number(e.target.value),
								})
							}
						/>
					</div>

					<div>
						<Input
							title='Check if paid'
							type='checkbox'
							id='isPaid'
							onChange={e =>
								dispatch({
									type: 'SET_IS_PAID',
									payload: e.target.checked,
								})
							}
						/>
						<label htmlFor='isPaid'>Paid</label>
					</div>

					<div>
						<label>Booking Status</label>
						<Select
							options={bookingStatusOptions}
							onChange={bookingOption =>
								dispatch({
									type: 'SET_STATUS',
									payload: bookingOption ? bookingOption.value : 'pending',
								})
							}
							required
							placeholder='Select booking status'
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label>Notes</label>
						<textarea
							title='Write notes'
							rows={5}
							cols={50}
							onChange={e =>
								dispatch({ type: 'SET_NOTES', payload: e.target.value })
							}
						/>
					</div>

					<div className='flex items-center gap-2 justify-end'>
						<Button
							onClick={handleClose}
							label='Cancel'
							className=''
							type='button'
						/>

						<button type='submit'>Save</button>
					</div>
				</Form>
				{/* </Modal.Body> */}
			</Modal>
		</>
	);
}
