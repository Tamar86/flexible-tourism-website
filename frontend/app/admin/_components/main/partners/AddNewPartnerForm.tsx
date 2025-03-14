import { usePartners } from '@/app/admin/context/PartnersContext';
import { PartnerFormProps } from '@/app/admin/types/partners';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRef } from 'react';
import { addNewPartner } from '@/app/admin/services/partnersService';

export default function AddNewPartnerForm({
	show,
	setShow,
	handleClose,
}: PartnerFormProps) {
	//  VALIDATION

	const { state, dispatch } = usePartners();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [validated, setValidated] = useState(false);
	/////////////////////////////////////////////////////////////////

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (!form.checkValidity()) {
			event.stopPropagation();
			setValidated(true);
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
				contractDocuments,

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
			// formData.append('contractDocumentUrls', contractDocumentsUrls);
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

			if (contractDocuments && contractDocuments.length > 0) {
				contractDocuments.forEach(file => {
					formData.append('contractDocuments', file); // Corrected file append
					// formData.append('contractDocumentsUrls', file);
				});
			}

			// Debugging: Log FormData entries
			for (const [key, value] of formData.entries()) {
				console.log(key, value);
			}

			// Submit the form
			await addNewPartner(formData, setShow, dispatch);

			setValidated(true);
		} catch (err) {
			console.error('Error in handleSubmit:', err);
		}
	};

	// ✅ Fixed handleChangeFiles function
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
				show={show}
				onHide={() => setShow(false)}
				dialogClassName='modal-90w'
				size='lg'
				scrollable={true}
				aria-labelledby='Form-modal'
			>
				<Modal.Header closeButton onClick={() => setShow(false)}>
					<Modal.Title id='example-custom-modal-styling-title'>
						Register Partner
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* FORM **************************************************/}
					<Form noValidate onSubmit={handleSubmit} validated={validated}>
						<Form.Group className='mb-3' controlId='companyName'>
							<Form.Label>Company Name</Form.Label>
							<Form.Control
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

							<Form.Control.Feedback type='invalid'>
								Please enter company name!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='registrationNumber'>
							<Form.Label>Registration Number</Form.Label>
							<Form.Control
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

							<Form.Control.Feedback type='invalid'>
								Please enter registration number!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='IdNumber'>
							<Form.Label>Industry</Form.Label>
							<Form.Control
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

							<Form.Control.Feedback type='invalid'>
								Please enter industry!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='bankAccount'>
							<Form.Label>Company Representative</Form.Label>
							<Form.Control
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

							<Form.Control.Feedback type='invalid'>
								Please enter company representative!
							</Form.Control.Feedback>
						</Form.Group>

						{/* ************************************************* */}
						<Form.Group controlId='partnershipType'>
							<Form.Select
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
							</Form.Select>

							<Form.Control.Feedback type='invalid'>
								Please select an employment type!
							</Form.Control.Feedback>
						</Form.Group>
						{/* *******************************************************************************8 */}
						<Form.Group className='mb-3' controlId='contractDocuments'>
							<Form.Label>Contract Documents</Form.Label>
							<Form.Control
								multiple
								name='contractDocuments'
								type='file'
								ref={fileInputRef}
								accept='.pdf,.jpg,.jpeg,.png'
								onChange={handleChangeFiles}
								// required
							/>

							<Form.Control.Feedback type='invalid'>
								Please upload documents!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='telephone'>
							<Form.Label>Telephone</Form.Label>
							<Form.Control
								type='text'
								placeholder='+123456789'
								onChange={e =>
									dispatch({ type: 'SET_TELEPHONE', payload: e.target.value })
								}
								required
							/>

							<Form.Control.Feedback type='invalid'>
								Please enter phone number!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='email'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='name@example.com'
								onChange={e =>
									dispatch({ type: 'SET_EMAIL', payload: e.target.value })
								}
								required
							/>

							<Form.Control.Feedback type='invalid'>
								Please enter email address!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='email'>
							<Form.Label>Partnership Start Date</Form.Label>
							<Form.Control
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

							<Form.Control.Feedback type='invalid'>
								Please enter partnership start date!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='email'>
							<Form.Label>Partnership End Date</Form.Label>
							<Form.Control
								type='date'
								placeholder=''
								onChange={e =>
									dispatch({
										type: 'SET_PARTNERSHIP_END_DATE',
										payload: new Date(e.target.value),
									})
								}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='email'>
							<Form.Label>Social Media</Form.Label>
							<Form.Control
								type='text'
								placeholder=''
								onChange={e =>
									dispatch({
										type: 'SET_SOCIAL_MEDIA',
										payload: e.target.value,
									})
								}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='email'>
							<Form.Label>Website</Form.Label>
							<Form.Control
								type='text'
								placeholder=''
								onChange={e =>
									dispatch({
										type: 'SET_WEBSITE',
										payload: e.target.value,
									})
								}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='rating'>
							<Form.Label>Rating</Form.Label>
							<Form.Control
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
						</Form.Group>

						<Form.Group className='mb-3' controlId='email'>
							<Form.Label>legal Representative</Form.Label>
							<Form.Control
								type='text'
								placeholder=''
								onChange={e =>
									dispatch({
										type: 'SET_LEGAL_REPRESENTATIVE',
										payload: e.target.value,
									})
								}
							/>
						</Form.Group>

						<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
							<Form.Label>Address</Form.Label>
							<Form.Control
								type='text'
								placeholder='123 Main St'
								onChange={e =>
									dispatch({ type: 'SET_ADDRESS', payload: e.target.value })
								}
								required
							/>

							<Form.Control.Feedback type='invalid'>
								Please enter address!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='city'>
							<Form.Label>City</Form.Label>
							<Form.Control
								type='text'
								placeholder='Any city'
								onChange={e =>
									dispatch({ type: 'SET_CITY', payload: e.target.value })
								}
								required
							/>

							<Form.Control.Feedback type='invalid'>
								Please enter city!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='Country'>
							<Form.Label>Country</Form.Label>
							<Form.Control
								type='text'
								placeholder='Any Country'
								onChange={e =>
									dispatch({ type: 'SET_COUNTRY', payload: e.target.value })
								}
								required
							/>

							<Form.Control.Feedback type='invalid'>
								Please enter country!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='postcode'>
							<Form.Label>Post Code</Form.Label>
							<Form.Control
								type='text'
								placeholder='10001'
								onChange={e =>
									dispatch({ type: 'SET_ZIP', payload: e.target.value })
								}
								required
							/>

							<Form.Control.Feedback type='invalid'>
								Please enter post code!
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='notes'>
							<Form.Label>Notes</Form.Label>
							<Form.Control
								as='textarea'
								rows={3}
								onChange={e =>
									dispatch({ type: 'SET_NOTES', payload: e.target.value })
								}
							/>
						</Form.Group>
						<div className='flex items-center gap-2 justify-end'>
							<Button variant='secondary' onClick={handleClose}>
								Cancel
							</Button>
							<Button variant='primary' type='submit'>
								Save
							</Button>
						</div>
					</Form>
					{/* ******************************************* */}
				</Modal.Body>
			</Modal>
		</>
	);
}
