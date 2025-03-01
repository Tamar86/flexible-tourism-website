import { useState } from 'react';
import { useEmployees } from '@/app/admin/context/EmployeesContext';
import { EmployeeFormProps } from '@/app/admin/types/employees';

///////BOOTSTRAP COMPONENTS ////////
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function EmployeesForm({
	show,
	setShow,
	handleClose,
	addNewEmployee,
}: EmployeeFormProps) {
	const { dispatch } = useEmployees();

	///VALIADATION

	const [validated, setValidated] = useState(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (form.checkValidity() === true) {
			addNewEmployee();
		}

		setValidated(true);
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
						Register Employee
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* FORM **************************************************/}
					<Form noValidate onSubmit={handleSubmit} validated={validated}>
						<Form.Group className='mb-3' controlId='firstName'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Name'
								onChange={e =>
									dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })
								}
								required
							/>

							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>

							<Form.Control.Feedback type='invalid'>
								Please enter first name.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='lastName'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Surname'
								onChange={e =>
									dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })
								}
								required
							/>
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter last name.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='IdNumber'>
							<Form.Label>ID Number</Form.Label>
							<Form.Control
								type='text'
								placeholder='0123456789'
								onChange={e =>
									dispatch({
										type: 'SET_ID_NUMBER',
										payload: e.target.value,
									})
								}
								required
							/>
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter ID number.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='bankAccount'>
							<Form.Label>Bank Account</Form.Label>
							<Form.Control
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
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter bank account.
							</Form.Control.Feedback>
						</Form.Group>

						{/* ************************************************* */}
						<Form.Group controlId='employmentType'>
							<Form.Label>Employment Type</Form.Label>
							<Form.Select
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
							</Form.Select>
							<Form.Control.Feedback type='invalid'>
								Please select an employment type.
							</Form.Control.Feedback>
						</Form.Group>
						{/* *******************************************************************************8 */}
						<Form.Group className='mb-3' controlId='position'>
							<Form.Label>Position</Form.Label>
							<Form.Control
								type='text'
								placeholder='Tour guide'
								onChange={e =>
									dispatch({ type: 'SET_POSITION', payload: e.target.value })
								}
								required
							/>
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter position.
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
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter phone number.
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
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter email.
							</Form.Control.Feedback>
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
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter address.
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
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter city.
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
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter country.
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
							<Form.Control.Feedback type='valid'>
								Correct!
							</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>
								Please enter post code.
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

export default EmployeesForm;
