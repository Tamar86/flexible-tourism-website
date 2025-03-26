import { useEmployees } from '@/app/admin/context/EmployeesContext';
import { useGeneral } from '@/app/admin/context/GeneralContext';
import { displayAllEmployees } from '@/app/admin/services/employeesService';
import { EditEmployeeFormType } from '@/app/admin/types/employees';
import Form from '@/app/admin/ui/Form';

import { useEffect, useState } from 'react';

import { MdContentCopy } from 'react-icons/md';
import Button from '@/app/admin/ui/Button';
import Input from '@/app/admin/ui/Input';

export default function EditEmployeeForm({
	formData,
	handleChange,
	handleSubmitForm,
	handleShow,
	validated,
}: EditEmployeeFormType) {
	const [copied, setCopied] = useState('');

	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(text);
		setTimeout(() => {
			setCopied('');
		}, 2000);
	};

	const { state, dispatch } = useEmployees();
	const { allEmployees } = state;
	const { state: generalState, dispatch: generalDispatch } = useGeneral();
	const { readOnly } = generalState;

	useEffect(() => {
		displayAllEmployees(dispatch);
	}, [dispatch]);

	const handleIdNumberChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		generalDispatch({ type: 'SET_READONLY', payload: false });

		if (allEmployees.length > 0) {
			const ids = allEmployees.map(empl => empl.idNumber);
			dispatch({ type: 'SET_ID_NUMBERS', payload: ids });
		}
	};

	return (
		// NEEDS TO BE IMPROVED its reloading after editing
		<Form onSubmit={handleSubmitForm}>
			<div className='grid grid-cols-2 gap-5'>
				<div>
					<div>
						<label htmlFor='firstName'>First Name</label>
						<Input
							type='text'
							id='firstName'
							name='fullname.firstName'
							value={formData.fullname.firstName || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</div>
					<div>
						<label htmlFor='lastName'>Last Name</label>
						<Input
							type='text'
							id='lastName'
							name='fullname.lastName'
							value={formData.fullname.lastName || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</div>
					<div>
						<label htmlFor='idNumber'>ID Number</label>
						<Input
							type='text'
							id='idNumber'
							value={formData.idNumber || ''}
							onChange={handleChange}
							name='idNumber'
							disabled={readOnly && true}
							required
						/>
					</div>

					<div>
						<label htmlFor='bankAccount'>Bank Account Number</label>
						<Input
							type='text'
							id='bankAccount'
							name='bankAccount'
							value={formData.bankAccount || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>

						<button
							title='copy'
							type='button'
							onClick={() => handleCopy(formData.bankAccount)}
						>
							<MdContentCopy
								size={18}
								className={
									copied === formData.bankAccount
										? 'text-green-700 '
										: 'text-gray-500 hover:text-black'
								}
							/>
						</button>
					</div>
					<div>
						<label htmlFor='employmentType'>Employment Type</label>
						<select
							id='employmentType'
							name='employmentType'
							value={formData.employmentType || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						>
							<option value='Freelance'>Freelance</option>
							<option value='Contract'>Contract</option>
							<option value='Full-time'>Full-time</option>
							<option value='Part-time'>Part-time</option>
							<option value='Internship'>Internship</option>
							<option value='Temporary'>Temporary</option>
							<option value='N/A'>N/A</option>
						</select>
					</div>
					<div>
						<label htmlFor='position'>Position</label>
						<Input
							type='text'
							id='position'
							name='position'
							value={formData.position || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</div>
				</div>
				<div>
					<div>
						<label htmlFor='email'>Email Address</label>
						<Input
							id='email'
							name='contact.email'
							value={formData.contact.email || ''}
							onChange={handleChange}
							type='email'
							disabled={readOnly && true}
							required
						/>
					</div>
					<div>
						<label htmlFor='telephone'>Telephone</label>
						<Input
							id='telephone'
							name='contact.telephone'
							value={formData.contact.telephone || ''}
							onChange={handleChange}
							type='text'
							disabled={readOnly && true}
							required
						/>
					</div>
					<div>
						<label htmlFor='address'>Address</label>
						<Input
							type='text'
							id='address'
							name='contact.address'
							value={formData.contact.address || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</div>
					<div>
						<label htmlFor='city'>City</label>
						<Input
							type='text'
							id='city'
							name='contact.city'
							value={formData.contact.city || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</div>
					<div>
						<label htmlFor='country'>Country</label>
						<Input
							type='text'
							id='country'
							name='contact.country'
							value={formData.contact.country || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</div>
					<div>
						<label htmlFor='postCode'>Post code</label>
						<Input
							type='text'
							id='postCode'
							name='contact.zip'
							value={formData.contact.zip || ''}
							onChange={handleChange}
							disabled={readOnly && true}
							required
						/>
					</div>
				</div>
			</div>
			<div>
				<label htmlFor='notes'>Notes</label>
				<textarea
					id='notes'
					name='notes'
					value={formData.notes || ''}
					onChange={handleChange}
					disabled={readOnly && true}
				/>
			</div>
			<br />
			<div className='flex items-center justify-between'>
				<div>
					{readOnly ? (
						<Button
							label='Edit Employee'
							className=''
							type='button'
							onClick={handleIdNumberChange}
						/>
					) : (
						<Button label='	Save Changes' className='' type='submit' />
					)}
				</div>
				<div>
					<Button
						label='Delete'
						className=''
						type='button'
						onClick={handleShow}
					/>
				</div>
			</div>
		</Form>
	);
}
