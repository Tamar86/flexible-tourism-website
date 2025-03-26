import { useState } from 'react';
import { useEmployees } from '@/app/admin/context/EmployeesContext';

import { EmployeeFormProps } from '@/app/admin/types/employees';

import { submitEmployeeForm } from '@/app/admin/utils/submitEmployeeForm';
import { useGeneral } from '@/app/admin/context/GeneralContext';
import Modal from '@/app/admin/ui/Modal';
import Form from '@/app/admin/ui/Form';
import Input from '@/app/admin/ui/Input';
import Button from '@/app/admin/ui/Button';

function EmployeesForm({ show, setShow, handleClose }: EmployeeFormProps) {
	const { state, dispatch } = useEmployees();
	const { state: generalState, dispatch: generalDispatch } = useGeneral();
	const { idNumbers } = state;
	const { error } = generalState;

	const [validated, setValidated] = useState(false);

	///VALIADATION

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		submitEmployeeForm(
			event,
			idNumbers,
			error,
			state,
			setShow,
			dispatch,
			setValidated,
		);
	};

	return (
		<>
			<Modal
				isOpen={show}
				onClose={() => setShow(false)}
				title='Register new employee'
			>
				{/* FORM **************************************************/}
				<Form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='firstName'>First Name</label>
						<Input
							id='firstName'
							type='text'
							placeholder='Name'
							onChange={e =>
								dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='lastName'>Last Name</label>
						<Input
							id='lastName'
							type='text'
							placeholder='Surname'
							onChange={e =>
								dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor='idNumber'>ID Number</label>
						<Input
							id='idNumber'
							type='text'
							placeholder='0123456789'
							onChange={e => {
								const inputId = e.target.value;
								if (idNumbers.includes(inputId)) {
									generalDispatch({ type: 'SET_ERROR', payload: true });
									// setError(true);
									console.log('id number must be unique');
								} else {
									// setError(false);
									generalDispatch({ type: 'SET_ERROR', payload: false });
									dispatch({
										type: 'SET_ID_NUMBER',
										payload: inputId,
									});
								}
							}}
							required
						/>
					</div>

					<div>
						<label htmlFor='bankAccount'>Bank Account</label>
						<Input
							id='bankAccount'
							type='text'
							placeholder='9876543210'
							onChange={e =>
								dispatch({
									type: 'SET_BANK_ACCOUNT',
									payload: e.target.value,
								})
							}
							required
						/>
					</div>

					{/* ************************************************* */}
					<div>
						<label htmlFor='employmentType'>Employment Type</label>
						<select
							id='employmentType'
							defaultValue=''
							onChange={e =>
								dispatch({
									type: 'SET_EMPLOYMENT_TYPE',
									payload: e.target.value,
								})
							}
							required
						>
							<option value='' disabled>
								Select Type
							</option>
							<option value='Freelance'>Freelance</option>
							<option value='Contract'>Contract</option>
							<option value='Full-time'>Full-time</option>
							<option value='Part-time'>Part-time</option>
							<option value='Internship'>Internship</option>
							<option value='Temporary'>Temporary</option>
							<option value='N/A'>N/A</option>
						</select>
					</div>
					{/* *******************************************************************************8 */}
					<div>
						<label htmlFor='position'>Position</label>

						<select
							id='position'
							aria-label='Select customer'
							onChange={e =>
								dispatch({ type: 'SET_POSITION', payload: e.target.value })
							}
							required
						>
							<option value='Tour Guide'>Tour Guide</option>
							<option value='Tour Operator'>Tour Operator</option>
							<option value='Tour Driver'>Tour Driver</option>
							<option value='Manager'>Manager</option>
							<option value='Accountant'>Accountant</option>
							<option value='N/A'>N/A</option>
						</select>
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
							type='text'
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
							id='notes'
							title='Notes'
							placeholder=''
							rows={3}
							onChange={e =>
								dispatch({ type: 'SET_NOTES', payload: e.target.value })
							}
						/>
					</div>
					<div className='flex items-center gap-2 justify-end'>
						<Button
							label='Cancel'
							type='button'
							className=''
							onClick={handleClose}
						/>

						<Button className='' label='Save' type='submit' />
					</div>
				</Form>
				{/* ******************************************* */}
			</Modal>
		</>
	);
}

export default EmployeesForm;
