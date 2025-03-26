import { EditPartnerFormType } from '@/app/admin/types/partners';

import { useRouter } from 'next/navigation';

import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import { usePartners } from '@/app/admin/context/PartnersContext';
import Form from '@/app/admin/ui/Form';
import Input from '@/app/admin/ui/Input';
import Button from '@/app/admin/ui/Button';

export default function EditPartnerForm({
	id,
	partnerFormData,
	handleChange,
	readOnly,
	setReadOnly,
	handleSubmitPartnerForm,
	handleShow,
	validated,
}: EditPartnerFormType) {
	const router = useRouter();

	const { state } = usePartners();
	const { partner } = state;

	if (partner.companyName === '') return <LoadingSpinner />; //otherwise its giving hydration error

	return (
		<>
			<Form onSubmit={handleSubmitPartnerForm}>
				<div>
					<label htmlFor='companyName'>Company Name</label>
					<Input
						id='companyName'
						name='companyName'
						type='text'
						value={partnerFormData.companyName || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
				</div>
				<div>
					<label htmlFor='companyRegistrationNumber'>Registration Number</label>
					<Input
						id='companyRegistrationNumber'
						name='companyRegistrationNumber'
						type='text'
						value={partnerFormData.companyRegistrationNumber || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
				</div>

				<div>
					<label htmlFor='industry'>Industry</label>
					<Input
						id='industry'
						name='industry'
						type='text'
						value={partnerFormData.industry || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
				</div>
				<div>
					<label htmlFor='companyRepresentative'>Company Representative</label>
					<Input
						id='companyRepresentative'
						name='companyRepresentative'
						type='text'
						value={partnerFormData.companyRepresentative || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
				</div>
				<div>
					<label htmlFor='documents'>Contract Documents</label>
					{readOnly ? (
						<Button
							label='Documents'
							className=''
							type='button'
							onClick={() =>
								router.push(`/admin/dashboard/partners/${id}/docs`)
							}
						/>
					) : (
						<Input
							id='documents'
							multiple
							name='documents'
							type='file'
							onChange={handleChange}
							disabled={readOnly && true}
							accept='.pdf,.jpg,.jpeg,.png'
						/>
					)}
				</div>
				<div>
					<label htmlFor='partnershipStartDate'>Partnership Start Date</label>
					<Input
						id='partnershipStartDate'
						name='partnershipStartDate'
						type='date'
						value={
							partnerFormData.partnershipStartDate
								? new Date(partnerFormData.partnershipStartDate)
										.toISOString()
										.split('T')[0]
								: ''
						} // needs to be changed in to dates
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
				</div>
				<div>
					<label htmlFor='partnershipEndDate'>Partnership End Date</label>
					<Input
						id='partnershipEndDate'
						name='partnershipEndDate'
						type='date'
						value={
							partnerFormData.partnershipEndDate
								? new Date(partnerFormData.partnershipEndDate)
										.toISOString()
										.split('T')[0]
								: ''
						}
						onChange={handleChange}
						disabled={readOnly && true}
					/>
				</div>
				<div>
					<label htmlFor='partnershipStatus'>Partnership status</label>
					<select
						id='partnershipStatus'
						name='partnershipStatus'
						value={partnerFormData.partnershipStatus || ''}
						onChange={handleChange}
						disabled={readOnly}
						aria-label='Partnership status'
					>
						<option value='Active'>Active</option>
						<option value='Pending'>Pending</option>
						<option value='Terminated'>Terminated</option>
					</select>
				</div>
				<div>
					<div>
						<label htmlFor='rating'>Rating</label>
						<Input
							id='rating'
							name='rating'
							type='number'
							min={1}
							max={5}
							value={partnerFormData.rating} //needs to be changed into number
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</div>
				</div>
				<div>
					<div className='flex w-full'>
						<label>Social media</label>
						{readOnly ? (
							<label htmlFor='socialMedia' className='w-full'>
								<a
									href={partnerFormData.socialMedia}
									target='_blank'
									rel='noopener noreferrer'
								>
									{partnerFormData.socialMedia}
								</a>
							</label>
						) : (
							<Input
								id='socialMedia'
								name='socialMedia'
								type='text'
								value={partnerFormData.socialMedia || ''} //needs to be changed into link
								onChange={handleChange}
								disabled={readOnly && true}
							/>
						)}
					</div>
				</div>
				<div>
					<label htmlFor='website'>Website</label>
					<Input
						id='website'
						name='website'
						type='text'
						value={partnerFormData.website || ''} //needs to be changed into link
						onChange={handleChange}
						disabled={readOnly}
					/>
				</div>

				<div>
					<label htmlFor='email'>Email</label>
					<Input
						id='email'
						name='contact.email'
						type='text'
						value={partnerFormData.contact.email || ''} //needs to be changed into email
						onChange={handleChange}
						disabled={readOnly}
						required
					/>
				</div>

				<div>
					<label htmlFor='telephone'>Telephone</label>
					<Input
						id='telephone'
						name='contact.telephone'
						type='text'
						value={partnerFormData.contact.telephone || ''}
						onChange={handleChange}
						disabled={readOnly}
						required
					/>
				</div>

				<div>
					<label htmlFor='address'>Address</label>
					<Input
						id='address'
						name='contact.address'
						type='text'
						value={partnerFormData.contact.address || ''}
						onChange={handleChange}
						disabled={readOnly}
						required
					/>
				</div>
				<div>
					<label htmlFor='city'>city</label>
					<Input
						id='city'
						name='contact.city'
						type='text'
						value={partnerFormData.contact.city || ''}
						onChange={handleChange}
						disabled={readOnly}
						required
					/>
				</div>
				<div>
					<label htmlFor='country'>Country</label>
					<Input
						id='country'
						name='contact.country'
						type='text'
						value={partnerFormData.contact.country || ''}
						onChange={handleChange}
						disabled={readOnly}
						required
					/>
				</div>
				<div>
					<label htmlFor='postCode'>Post Code</label>
					<Input
						id='postCode'
						name='contact.zip'
						type='text'
						value={partnerFormData.contact.zip || ''}
						onChange={handleChange}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='legalRepresentative'>Legal representative</label>
					<Input
						id='legalRepresentative'
						name='legalRepresentative'
						type='text'
						value={partnerFormData.legalRepresentative || ''}
						onChange={handleChange}
						disabled={readOnly}
					/>
				</div>
				<div>
					<label htmlFor='notes'>Notes</label>
					<Input
						id='notes'
						name='notes'
						type='text'
						value={partnerFormData.notes || ''}
						onChange={handleChange}
						disabled={readOnly}
					/>
				</div>

				<label className='flex items-center justify-between'>
					{readOnly ? (
						<Button
							label='Edit Partner'
							type='button'
							className=''
							onClick={e => {
								e.preventDefault();
								setReadOnly(false);
							}}
						/>
					) : (
						<Button label='Save Changes' className='' type='submit' />
					)}

					<Button
						label='Delete'
						type='button'
						className=''
						onClick={handleShow}
					/>
				</label>
			</Form>
		</>
	);
}
