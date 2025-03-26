import { useState } from 'react';

import { CustomerFormProps } from '@/app/admin/types/customers';
import { useCustomer } from '@/app/admin/context/CustomersContext';
import { addNewCustomer } from '@/app/admin/services/customersService';
import Modal from '@/app/admin/ui/Modal';
import Button from '@/app/admin/ui/Button';
import Form from '@/app/admin/ui/Form';
import Input from '@/app/admin/ui/Input';

export default function AddNewCustomerForm({
	show,
	setShow,
	handleClose,
}: CustomerFormProps) {
	//  VALIDATION

	const { state, dispatch } = useCustomer();

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
			const { customerFormData } = state;

			const formData = new FormData();

			const {
				fullname,
				notes,
				documents,

				contact: { address, telephone, email, city, country, zip },
			} = customerFormData;

			formData.append('fullname', fullname ?? '');
			formData.append('contactAddress', address ?? '');
			formData.append('contactTelephone', telephone ?? '');
			formData.append('contactEmail', email ?? '');
			formData.append('contactCity', city ?? '');
			formData.append('contactCountry', country ?? '');
			formData.append('contactZip', zip ?? '');
			formData.append('notes', notes ?? '');
			// formData.append('contractDocumentUrls', contractDocumentsUrls);

			// Append contract documents

			if (documents && documents.length > 0) {
				documents.forEach(file => {
					formData.append('documents', file); // Corrected file append
					// formData.append('contractDocumentsUrls', file);
				});
			}

			// Debugging: Log FormData entries
			for (const [key, value] of formData.entries()) {
				console.log(key, value);
			}

			// Submit the form
			await addNewCustomer(formData, setShow, dispatch);

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
				type: 'SET_DOCUMENT',
				payload: fileArray, // Store all files at once
			});
		}
	};

	return (
		<div>
			<Modal
				isOpen={show}
				onClose={() => setShow(false)}
				title='Register new customer'
			>
				{/* FORM **************************************************/}
				<Form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='fullname'>Fullname</label>
						<Input
							id='fullname'
							title='Fullname'
							type='text'
							placeholder=''
							onChange={e =>
								dispatch({
									type: 'SET_FULLNAME',
									payload: e.target.value,
								})
							}
							required
						/>
					</div>
					<div>
						<label htmlFor='document'>Upload Documents</label>
						<Input
							id='document'
							title='Upload Documents'
							multiple
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
							title='Telephone'
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
							title='Email address'
							type='email'
							placeholder='name@example.com'
							onChange={e =>
								dispatch({ type: 'SET_EMAIL', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='address'>Address</label>
						<Input
							id='address'
							title='Address'
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
							title='City'
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
							title='Country'
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
							title='Post Code'
							type='text'
							placeholder='10001'
							onChange={e =>
								dispatch({ type: 'SET_ZIP', payload: e.target.value })
							}
							required
						/>
					</div>
					<div>
						<label>Notes</label>
						<textarea
							title='Notes'
							rows={3}
							onChange={e =>
								dispatch({ type: 'SET_NOTES', payload: e.target.value })
							}
						/>
					</div>

					<div className='flex items-center gap-2 justify-end'>
						<Button
							type='button'
							className=''
							label='Cancel'
							onClick={handleClose}
						/>

						<Button type='submit' label='Save' className='' />
					</div>
				</Form>
				{/* ******************************************* */}
			</Modal>
		</div>
	);
}
