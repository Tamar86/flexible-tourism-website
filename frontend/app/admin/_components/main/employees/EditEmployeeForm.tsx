import { EditEmployeeFormType } from '@/app/admin/types/employees';
import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';

export default function EditEmployeeForm({
	formData,
	handleChange,
	readOnly,
	setReadOnly,
	handleSubmitForm,
	handleShow,
}: EditEmployeeFormType) {
	const [copied, setCopied] = useState('');

	const handleCopy = (text: string, id: string) => {
		navigator.clipboard.writeText(text);
		setCopied(id);
		setTimeout(() => {
			setCopied('');
		}, 2000);
		console.log('text');
	};

	return (
		<Form>
			<div className='grid grid-cols-2 gap-5'>
				<div>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							First Name
						</InputGroup.Text>
						<Form.Control
							name='fullname.firstName'
							value={formData.fullname.firstName || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Last Name
						</InputGroup.Text>
						<Form.Control
							name='fullname.lastName'
							value={formData.fullname.lastName || ''}
							onChange={handleChange}
							disabled={readOnly && true}
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							ID Number
						</InputGroup.Text>
						<Form.Control
							value={formData.idNumber || ''}
							onChange={handleChange}
							name='idNumber'
							disabled={readOnly && true}
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Bank Account Number
						</InputGroup.Text>
						<Form.Control
							name='bankAccount'
							value={formData.bankAccount || ''}
							onChange={handleChange}
							disabled={readOnly && true}
						/>
						<InputGroup.Text>
							<button
								aria-label='Copy'
								type='button'
								onClick={() =>
									handleCopy(formData.bankAccount, formData.idNumber)
								}
							>
								<MdContentCopy
									size={18}
									className={
										copied === formData.idNumber
											? 'text-green-700 '
											: 'text-gray-500 hover:text-black'
									}
								/>
							</button>
						</InputGroup.Text>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Employment Type
						</InputGroup.Text>
						<Form.Select
							name='employmentType'
							value={formData.employmentType || ''}
							onChange={handleChange}
							disabled={readOnly && true}
						>
							<option value='Freelance'>Freelance</option>
							<option value='Contract'>Contract</option>
							<option value='Full-time'>Full-time</option>
							<option value='Part-time'>Part-time</option>
							<option value='Internship'>Internship</option>
							<option value='Temporary'>Temporary</option>
							<option value='N/A'>N/A</option>
						</Form.Select>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Position
						</InputGroup.Text>
						<Form.Control
							name='position'
							value={formData.position || ''}
							onChange={handleChange}
							disabled={readOnly && true}
						/>
					</InputGroup>
				</div>
				<div>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Email Address
						</InputGroup.Text>
						<Form.Control
							name='contact.email'
							value={formData.contact.email || ''}
							onChange={handleChange}
							type='email'
							disabled={readOnly && true}
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Telephone
						</InputGroup.Text>
						<Form.Control
							name='contact.telephone'
							value={formData.contact.telephone || ''}
							onChange={handleChange}
							type='text'
							disabled={readOnly && true}
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Address
						</InputGroup.Text>
						<Form.Control
							name='contact.address'
							value={formData.contact.address || ''}
							onChange={handleChange}
							disabled={readOnly && true}
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>City</InputGroup.Text>
						<Form.Control
							name='contact.city'
							value={formData.contact.city || ''}
							onChange={handleChange}
							disabled={readOnly && true}
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Country
						</InputGroup.Text>
						<Form.Control
							name='contact.country'
							value={formData.contact.country || ''}
							onChange={handleChange}
							disabled={readOnly && true}
						/>
					</InputGroup>
					<InputGroup className='mb-3'>
						<InputGroup.Text className='editInputLabel'>
							Post code
						</InputGroup.Text>
						<Form.Control
							name='contact.zip'
							value={formData.contact.zip || ''}
							onChange={handleChange}
							disabled={readOnly && true}
						/>
					</InputGroup>
				</div>
			</div>
			<InputGroup className='mb-3'>
				<InputGroup.Text className='editInputLabel'>Notes</InputGroup.Text>
				<Form.Control
					as='textarea'
					name='notes'
					value={formData.notes || ''}
					onChange={handleChange}
					disabled={readOnly && true}
				/>
			</InputGroup>
			<br />
			<InputGroup.Text className='flex items-center justify-between'>
				<div>
					{readOnly ? (
						<Button
							variant='outline-primary'
							onClick={() => setReadOnly(false)}
						>
							Edit Employee
						</Button>
					) : (
						<Button variant='outline-success' onClick={handleSubmitForm}>
							Save Changes
						</Button>
					)}
				</div>
				<div>
					<Button variant='outline-danger' onClick={handleShow}>
						Delete
					</Button>
				</div>
			</InputGroup.Text>
		</Form>
	);
}
