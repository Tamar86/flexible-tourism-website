import { BookingSelectOptions } from '@/app/admin/helpers/bookingSelectOptions';
import { Booking, BookingsAction } from '@/app/admin/types/bookings';
import { Customer } from '@/app/admin/types/customers';
import { Employees } from '@/app/admin/types/employees';
import { Partner } from '@/app/admin/types/partners';
import { Tour } from '@/app/admin/types/tours';
import { useRouter } from 'next/navigation';

import { Dispatch, MouseEventHandler } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import Button from '@/app/admin/ui/Button';

interface UpdateBookingFormProps {
	allEmployees: Employees[];
	allCustomers: Customer[];
	allPartners: Partner[];
	allTours: Tour[];
	handleSubmitCustomerForm: (event: React.FormEvent<HTMLFormElement>) => void;
	validated: boolean;
	bookingFormData: Booking;
	dispatch: Dispatch<BookingsAction>;
	readOnly: boolean;
	setReadOnly: Dispatch<boolean>;
	handleShow: MouseEventHandler<HTMLButtonElement>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id: string;
}

export default function EditBookingForm({
	allEmployees,
	allCustomers,
	allPartners,
	allTours,
	handleSubmitCustomerForm,
	validated,
	bookingFormData,
	dispatch,
	readOnly,
	setReadOnly,
	handleShow,
	handleChange,
	id,
}: UpdateBookingFormProps) {
	const {
		bookingStatusOptions,
		tourOptions,
		partnerOptions,
		customerOptions,
		tourGuideOptions,
		tourDriverOptions,
		tourOperatorOptions,
	} = BookingSelectOptions(allEmployees, allCustomers, allPartners, allTours);

	const router = useRouter();
	return (
		<form
			onSubmit={handleSubmitCustomerForm}
			className='form-edit bg-white border-slate-300 border-5 w-2/3 rounded-lg p-5'
		>
			<div className='flex items-center justify-center gap-5 py-3 bg-slate-800 text-slate-50 rounded-lg'>
				<h1 className='text-xl'>
					Booking Type - {bookingFormData.bookingType}
				</h1>
			</div>

			{bookingFormData.customer && (
				<div>
					<div>
						<label>Customer</label>
						<Select
							name='customer'
							options={customerOptions}
							onChange={selectedOption => {
								dispatch({
									type: 'SET_CUSTOMER',
									payload: selectedOption ? selectedOption.value : '',
								});
								return null;
							}}
							required
							isDisabled={readOnly}
							value={
								bookingFormData.customer
									? customerOptions.find(
											option => option.value === bookingFormData.customer,
									  ) || null
									: null
							}
						/>
					</div>
				</div>
			)}
			{bookingFormData.partner && (
				<div>
					<label>Partner</label>
					<Select
						name='partner'
						options={partnerOptions}
						onChange={selectedOption => {
							dispatch({
								type: 'SET_PARTNER',
								payload: selectedOption ? selectedOption.value : '',
							});
							return null;
						}}
						required
						isDisabled={readOnly}
						value={
							bookingFormData.partner
								? partnerOptions.find(
										option => option.value === bookingFormData.partner,
								  ) || null
								: null
						}
					/>
				</div>
			)}
			<div>
				<label>Tour</label>
				<Select
					name='tour'
					options={tourOptions}
					onChange={selectedOption => {
						dispatch({
							type: 'SET_TOUR',
							payload: selectedOption ? selectedOption.value : '',
						});
						return null;
					}}
					required
					isDisabled={readOnly}
					value={
						bookingFormData.tour
							? tourOptions.find(
									option => option.value === bookingFormData.tour,
							  ) || null
							: null
					}
				/>
			</div>
			<div>
				<label>Tour Operator</label>
				<Select
					name='tourOperator'
					options={tourOperatorOptions}
					onChange={selectedOption => {
						dispatch({
							type: 'SET_TOUR_OPERATOR',
							payload: selectedOption ? selectedOption.value : '',
						});
						return null;
					}}
					required
					isDisabled={readOnly}
					value={
						bookingFormData.tourOperator
							? tourOperatorOptions.find(
									option => option.value === bookingFormData.tourOperator,
							  ) || null
							: null
					}
				/>
			</div>
			<div>
				<label>Tour Guide(s)</label>
				<Select
					name='tourGuide'
					options={tourGuideOptions}
					onChange={selectedOptions => {
						dispatch({
							type: 'SET_TOUR_GUIDE',
							payload: selectedOptions.map(option => option.value),
						});
						return null;
					}}
					isMulti
					required
					isDisabled={readOnly}
					value={
						bookingFormData.tourGuide
							? tourGuideOptions.filter(option =>
									bookingFormData.tourGuide.includes(option.value),
							  )
							: []
					}
				/>
			</div>
			<div>
				<label>Tour Driver(s)</label>
				<Select
					name='driver'
					isMulti
					options={tourDriverOptions}
					onChange={selectedOptions => {
						dispatch({
							type: 'SET_TOUR_DRIVER',
							payload: selectedOptions.map(option => option.value),
						});
						return null;
					}}
					required
					isDisabled={readOnly}
					value={
						bookingFormData.driver
							? tourDriverOptions.filter(option =>
									bookingFormData.driver.includes(option.value),
							  )
							: []
					}
				/>
			</div>
			<div>
				<label>Accommodations</label>
				<CreatableSelect
					isMulti
					name='accommodations'
					value={
						bookingFormData.accommodations
							? bookingFormData.accommodations.map(accommodation => ({
									value: accommodation,
									label: accommodation,
							  }))
							: []
					}
					onChange={selectedOptions => {
						dispatch({
							type: 'SET_ACCOMMODATIONS',
							payload: selectedOptions.map(option => option.value),
						});
						return null;
					}}
					isDisabled={readOnly}
					required
				/>
			</div>
			<div>
				<label>Booking Status</label>
				<Select
					name='status'
					options={bookingStatusOptions}
					onChange={selectedOption => {
						dispatch({
							type: 'SET_STATUS',
							payload: selectedOption ? selectedOption.value : '',
						});
						return null;
					}}
					value={
						bookingFormData.status
							? bookingStatusOptions.find(
									option => option.value === bookingFormData.status,
							  ) || null
							: null
					}
					isDisabled={readOnly}
					required
				/>
			</div>

			<div className='inputs-edit'>
				<div>
					<label>Booked On</label>
					<input
						title='Booking date'
						name='bookingDate'
						type='date'
						value={
							bookingFormData.bookingDate
								? new Date(bookingFormData.bookingDate)
										.toISOString()
										.split('T')[0]
								: ''
						}
						onChange={e =>
							dispatch({
								type: 'SET_BOOKING_DATE',
								payload: new Date(e.target.value),
							})
						}
						disabled={readOnly}
						required
					/>
				</div>
				<div>
					<label>Tour Start date</label>
					<input
						title='Tour start date'
						name='tourStartDate'
						type='date'
						value={
							bookingFormData.tourStartDate
								? new Date(bookingFormData.tourStartDate)
										.toISOString()
										.split('T')[0]
								: ''
						}
						onChange={e =>
							dispatch({
								type: 'SET_TOUR_START_DATE',
								payload: new Date(e.target.value),
							})
						}
						disabled={readOnly}
						required
					/>
				</div>
				<div>
					<label>Tour End Date</label>
					<input
						title='Tour end date'
						name='tourEndDate'
						type='date'
						value={
							bookingFormData.tourEndDate
								? new Date(bookingFormData.tourEndDate)
										.toISOString()
										.split('T')[0]
								: ''
						}
						onChange={e =>
							dispatch({
								type: 'SET_TOUR_END_DATE',
								payload: new Date(e.target.value),
							})
						}
						disabled={readOnly}
						required
					/>
				</div>
				<div>
					<label>Group Size</label>
					<input
						title='Group Size'
						name='groupSize'
						type='number'
						value={bookingFormData.groupSize || 1}
						onChange={e =>
							dispatch({
								type: 'SET_GROUP_SIZE',
								payload: Number(e.target.value),
							})
						}
						disabled={readOnly}
						required
					/>
				</div>
				<div>
					{readOnly ? (
						<Button
							type='button'
							className='bg-slate-600 hover:bg-slate-700 text-white w-fit py-2 px-6 rounded-lg'
							label='View Documents'
							onClick={() =>
								router.push(`/admin/dashboard/bookings/${id}/docs`)
							}
						/>
					) : (
						<div>
							<label>Upload Documents</label>
							<input
								title='Document upload'
								multiple
								name='documents'
								type='file'
								onChange={handleChange}
								disabled={readOnly}
								accept='.pdf,.jpg,.jpeg,.png'
							/>
						</div>
					)}
				</div>
				<div>
					<label>Price</label>
					<input
						title='Price'
						name='price'
						type='number'
						value={bookingFormData.price || 0}
						onChange={e =>
							dispatch({
								type: 'SET_PRICE',
								payload: Number(e.target.value),
							})
						}
						disabled={readOnly}
						required
					/>
				</div>
				<div>
					<label>Extra Income</label>
					<input
						title='Extra Income'
						name='extraIncome'
						type='number'
						value={bookingFormData.extraIncome || 0}
						onChange={e =>
							dispatch({
								type: 'SET_EXTRA_INCOME',
								payload: Number(e.target.value),
							})
						}
						disabled={readOnly}
						required
					/>
				</div>
				<div className=''>
					<label htmlFor='isPaid'>Payment Status</label>
					<div className='flex flex-row items-center justify-center gap-3 p-2 rounded-lg  w-fit'>
						<input
							className=''
							id='isPaid'
							title='Paid'
							name='isPaid'
							type='checkbox'
							onChange={e =>
								dispatch({
									type: 'SET_IS_PAID',
									payload: e.target.checked,
								})
							}
							disabled={readOnly}
							checked={bookingFormData.isPaid}
						/>

						<span className=''>
							{bookingFormData.isPaid ? 'Paid' : 'Not paid'}
						</span>
					</div>
				</div>

				<div>
					<label>Notes</label>
					<textarea
						className='border-slate-300 border-2 rounded-md p-2'
						title='Notes'
						name='notes'
						rows={5}
						cols={50}
						value={bookingFormData.notes || ''}
						onChange={e =>
							dispatch({
								type: 'SET_NOTES',
								payload: e.target.value,
							})
						}
						disabled={readOnly}
					/>
				</div>
			</div>
			<br />
			<div className='flex items-center justify-between'>
				{readOnly ? (
					<Button
						type='button'
						className=''
						label='Edit Customer'
						onClick={e => {
							e.preventDefault();
							setReadOnly(false);
						}}
					/>
				) : (
					<Button type='submit' label='Save Changes' className='' />
				)}
				<Button
					onClick={handleShow}
					type='button'
					label='Delete'
					className=''
				/>
			</div>
		</form>
	);
}
