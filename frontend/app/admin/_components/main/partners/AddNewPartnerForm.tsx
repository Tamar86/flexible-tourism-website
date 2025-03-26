import { usePartners } from '@/app/admin/context/PartnersContext';
import { PartnerFormProps } from '@/app/admin/types/partners';
import { addNewPartner } from '@/app/admin/services/partnersService';

import Modal from '@/app/admin/ui/Modal';
import Form from '@/app/admin/ui/Form';
import Input from '@/app/admin/ui/Input';
import Button from '@/app/admin/ui/Button';

export default function AddNewPartnerForm({
	show,
	setShow,
	handleClose,
}: PartnerFormProps) {
	//  VALIDATION

	const { state, dispatch } = usePartners();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (!form.checkValidity()) {
			event.stopPropagation();

			return;
		}

		try {
			// Prepare FormData for submission
			const { partnerFormData } = state;

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
				documents,

				contact: { address, telephone, email, city, country, zip },
			} = partnerFormData;

			formData.append('companyName', companyName);
			formData.append('companyRegistrationNumber', companyRegistrationNumber);
			formData.append('industry', industry);
			formData.append('companyRepresentative', companyRepresentative);
			formData.append('website', website);
			formData.append('socialMedia', socialMedia);
			formData.append('partnershipStatus', partnershipStatus);
			formData.append('rating', rating.toString());
			formData.append('legalRepresentative', legalRepresentative ?? '');
			formData.append('contactAddress', address ?? '');
			formData.append('contactTelephone', telephone ?? '');
			formData.append('contactEmail', email ?? '');
			formData.append('contactCity', city ?? '');
			formData.append('contactCountry', country ?? '');
			formData.append('contactZip', zip ?? '');
			formData.append('notes', notes ?? '');

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

			// Append contract documents

			if (documents && documents.length > 0) {
				documents.forEach(file => {
					formData.append('documents', file); // Corrected file append
				});
			}

			// Debugging: Log FormData entries
			for (const [key, value] of formData.entries()) {
				console.log(key, value);
			}

			// Submit the form
			await addNewPartner(formData, setShow, dispatch);
		} catch (err) {
			console.error('Error in handleSubmit:', err);
		}
	};

	// ✅ Fixed handleChangeFiles function select
	const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const fileArray = Array.from(files);

			dispatch({
				type: 'SET_CONTRACT_DOCUMENT',
				payload: fileArray, // Store all files at once
			});
		}
	};

	return (
		<>
			<Modal
				isOpen={show}
				onClose={() => setShow(false)}
				title='Register new partner'
			>
				{/* FORM **************************************************/}
				<Form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='companyName'>Company Name</label>
						<Input
							id='companyName'
							type='text'
							placeholder='Name'
							onChange={e =>
								dispatch({
									type: 'SET_COMPANY_NAME',
									payload: e.target.value,
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='registrationNumber'>Registration Number</label>
						<Input
							id='registrationNumber'
							type='text'
							placeholder='Company ID'
							onChange={e =>
								dispatch({
									type: 'SET_COMPANY_REGISTRATION_NUMBER',
									payload: e.target.value,
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='idNumber'>Industry</label>
						<Input
							id='idNumber'
							type='text'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_INDUSTRY',
									payload: e.target.value,
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='bankAccount'>Company Representative</label>
						<Input
							id='bankAccount'
							type='text'
							placeholder='9876543210'
							onChange={e =>
								dispatch({
									type: 'SET_COMPANY_REPRESENTATIVE',
									payload: e.target.value,
								})
							}
							required
						/>
					</div>

					{/* ************************************************* */}
					<div>
						<select
							id='partnershipType'
							aria-label='Select partnership status'
							defaultValue=''
							onChange={e =>
								dispatch({
									type: 'SET_PARTNERSHIP_STATUS',
									payload: e.target.value,
								})
							}
							required
						>
							<option value='' disabled>
								Select Partnership Status
							</option>
							<option value='Active'>Active</option>
							<option value='Pending'>Pending</option>
							<option value='Terminated'>Terminated</option>
						</select>
					</div>
					{/* *******************************************************************************8 */}
					<div>
						<label htmlFor='documents'>Documents</label>
						<Input
							id='documents'
							multiple
							name='documents'
							type='file'
							accept='.pdf,.jpg,.jpeg,.png'
							onChange={handleChangeFiles}
							// required
						/>
					</div>

					<div>
						<label htmlFor='telephone'>Telephone</label>
						<Input
							id='telephone'
							type='text'
							placeholder='+123456789'
							onChange={e =>
								dispatch({ type: 'SET_TELEPHONE', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='email'>Email address</label>
						<Input
							id='email'
							type='email'
							placeholder='name@example.com'
							onChange={e =>
								dispatch({ type: 'SET_EMAIL', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='PartnershipStartDate'>Partnership Start Date</label>
						<Input
							id='PartnershipStartDate'
							type='date'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_PARTNERSHIP_START_DATE',
									payload: new Date(e.target.value),
								})
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='PartnershipEndDate'>Partnership End Date</label>
						<Input
							id='PartnershipEndDate'
							type='date'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_PARTNERSHIP_END_DATE',
									payload: new Date(e.target.value),
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='socialMedia'>Social Media</label>
						<Input
							id='socialMedia'
							type='text'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_SOCIAL_MEDIA',
									payload: e.target.value,
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='website'>Website</label>
						<Input
							id='website'
							type='text'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_WEBSITE',
									payload: e.target.value,
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='rating'>Rating</label>
						<Input
							id='rating'
							type='number'
							min={1}
							max={5}
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_RATING',
									payload: Number(e.target.value),
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='legalRepresentative'>legal Representative</label>
						<Input
							id='legalRepresentative'
							type='text'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_LEGAL_REPRESENTATIVE',
									payload: e.target.value,
								})
							}
						/>
					</div>

					<div>
						<label htmlFor='address'>Address</label>
						<Input
							id='address'
							type='text'
							placeholder='123 Main St'
							onChange={e =>
								dispatch({ type: 'SET_ADDRESS', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='city'>City</label>
						<Input
							id='city'
							type='text'
							placeholder='Any city'
							onChange={e =>
								dispatch({ type: 'SET_CITY', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='country'>Country</label>
						<Input
							id='country'
							type='text'
							placeholder='Any Country'
							onChange={e =>
								dispatch({ type: 'SET_COUNTRY', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='postCode'>Post Code</label>
						<Input
							id='postCode'
							type='text'
							placeholder='10001'
							onChange={e =>
								dispatch({ type: 'SET_ZIP', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='notes'>Notes</label>
						<textarea
							title='Notes'
							id='notes'
							rows={3}
							onChange={e =>
								dispatch({ type: 'SET_NOTES', payload: e.target.value })
							}
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
