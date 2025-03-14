import { EditPartnerFormType } from '@/app/admin/types/partners';
import { Button, Form, InputGroup } from 'react-bootstrap';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import { usePartners } from '@/app/admin/context/PartnersContext';

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

	const fileInputRef = useRef<HTMLInputElement>(null);
	const { state } = usePartners();
	const { partner } = state;

	if (partner.companyName === '') return <LoadingSpinner />; //otherwise its giving hydration error

	return (
		<>
			<Form noValidate onSubmit={handleSubmitPartnerForm} validated={validated}>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Company Name</InputGroup.Text>
					<Form.Control
						name='companyName'
						type='text'
						value={partnerFormData.companyName || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter company name.
					</Form.Control.Feedback>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Registration Number</InputGroup.Text>
					<Form.Control
						name='companyRegistrationNumber'
						type='text'
						value={partnerFormData.companyRegistrationNumber || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter registration number.
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className='mb-3'>
					<InputGroup.Text>Industry</InputGroup.Text>
					<Form.Control
						name='industry'
						type='text'
						value={partnerFormData.industry || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter Industry.
					</Form.Control.Feedback>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Company Representative</InputGroup.Text>
					<Form.Control
						name='companyRepresentative'
						type='text'
						value={partnerFormData.companyRepresentative || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter company representative.
					</Form.Control.Feedback>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Contract Documents</InputGroup.Text>
					{readOnly ? (
						<Button
							onClick={() =>
								router.push(`/admin/dashboard/partners/${id}/docs`)
							}
						>
							Documents
						</Button>
					) : (
						<Form.Control
							multiple
							name='contractDocuments'
							type='file'
							onChange={handleChange}
							disabled={readOnly && true}
							accept='.pdf,.jpg,.jpeg,.png'
							ref={fileInputRef}
						/>
					)}
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Partnership Start Date</InputGroup.Text>
					<Form.Control
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
					<Form.Control.Feedback type='invalid'>
						Please enter partnership start date.
					</Form.Control.Feedback>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Partnership End Date</InputGroup.Text>
					<Form.Control
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
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Partnership status</InputGroup.Text>
					<Form.Select
						name='partnershipStatus'
						value={partnerFormData.partnershipStatus || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						aria-label='Partnership status'
					>
						<option value='Active'>Active</option>
						<option value='Pending'>Pending</option>
						<option value='Terminated'>Terminated</option>
					</Form.Select>
				</InputGroup>
				<div>
					<InputGroup className='mb-3'>
						<InputGroup.Text>Rating</InputGroup.Text>
						<Form.Control
							name='rating'
							type='number'
							min={1}
							max={5}
							value={partnerFormData.rating} //needs to be changed into number
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							Please rate the company from 1 to 5 stars.
						</Form.Control.Feedback>
					</InputGroup>
				</div>
				<InputGroup className='mb-3'>
					<div className='flex w-full'>
						<InputGroup.Text>Social media</InputGroup.Text>
						{readOnly ? (
							<InputGroup.Text className='w-full'>
								<a
									href={partnerFormData.socialMedia}
									target='_blank'
									rel='noopener noreferrer'
								>
									{partnerFormData.socialMedia}
								</a>
							</InputGroup.Text>
						) : (
							<Form.Control
								name='socialMedia'
								type='text'
								value={partnerFormData.socialMedia || ''} //needs to be changed into link
								onChange={handleChange}
								disabled={readOnly && true}
							/>
						)}
					</div>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Website</InputGroup.Text>
					<Form.Control
						name='website'
						type='text'
						value={partnerFormData.website || ''} //needs to be changed into link
						onChange={handleChange}
						disabled={readOnly && true}
					/>
				</InputGroup>

				<InputGroup className='mb-3'>
					<InputGroup.Text>Email</InputGroup.Text>
					<Form.Control
						name='contact.email'
						type='text'
						value={partnerFormData.contact.email || ''} //needs to be changed into email
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter email.
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className='mb-3'>
					<InputGroup.Text>Telephone</InputGroup.Text>
					<Form.Control
						name='contact.telephone'
						type='text'
						value={partnerFormData.contact.telephone || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter telephone number.
					</Form.Control.Feedback>
				</InputGroup>

				<InputGroup className='mb-3'>
					<InputGroup.Text>Address</InputGroup.Text>
					<Form.Control
						name='contact.address'
						type='text'
						value={partnerFormData.contact.address || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter address.
					</Form.Control.Feedback>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>city</InputGroup.Text>
					<Form.Control
						name='contact.city'
						type='text'
						value={partnerFormData.contact.city || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter city.
					</Form.Control.Feedback>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Country</InputGroup.Text>
					<Form.Control
						name='contact.country'
						type='text'
						value={partnerFormData.contact.country || ''}
						onChange={handleChange}
						disabled={readOnly && true}
						required
					/>
					<Form.Control.Feedback type='invalid'>
						Please enter country.
					</Form.Control.Feedback>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Post Code</InputGroup.Text>
					<Form.Control
						name='contact.zip'
						type='text'
						value={partnerFormData.contact.zip || ''}
						onChange={handleChange}
						disabled={readOnly && true}
					/>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Legal representative</InputGroup.Text>
					<Form.Control
						name='legalRepresentative'
						type='text'
						value={partnerFormData.legalRepresentative || ''}
						onChange={handleChange}
						disabled={readOnly && true}
					/>
				</InputGroup>
				<InputGroup className='mb-3'>
					<InputGroup.Text>Notes</InputGroup.Text>
					<Form.Control
						name='notes'
						type='text'
						value={partnerFormData.notes || ''}
						onChange={handleChange}
						disabled={readOnly && true}
					/>
				</InputGroup>

				<InputGroup.Text className='flex items-center justify-between'>
					{readOnly ? (
						<Button
							variant='outline-primary'
							onClick={e => {
								e.preventDefault();
								setReadOnly(false);
							}}
						>
							Edit Partner
						</Button>
					) : (
						<Button type='submit' variant='outline-success'>
							Save Changes
						</Button>
					)}

					<Button variant='outline-danger' onClick={handleShow}>
						Delete
					</Button>
				</InputGroup.Text>
			</Form>
		</>
	);
}
