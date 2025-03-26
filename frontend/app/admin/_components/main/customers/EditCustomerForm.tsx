import { useRouter } from 'next/navigation';

import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

import { EditCustomersFormType } from '@/app/admin/types/customers';
import { useCustomer } from '@/app/admin/context/CustomersContext';
import Form from '@/app/admin/ui/Form';
import Button from '@/app/admin/ui/Button';
import Input from '@/app/admin/ui/Input';

export default function EditCustomerForm({
	id,
	customerFormData,
	handleChange,
	readOnly,
	setReadOnly,
	handleSubmitCustomerForm,
	handleShow,
	validated,
}: EditCustomersFormType) {
	const router = useRouter();

	const { state } = useCustomer();
	const { customer } = state;

	if (customer.fullname === '') return <LoadingSpinner />;

	return (
		<>
			<Form onSubmit={handleSubmitCustomerForm}>
				<label htmlFor='fullname'>Fullname</label>
				<Input
					id='fullname'
					name='fullname'
					type='text'
					value={customerFormData.fullname || ''}
					onChange={handleChange}
					disabled={readOnly && true}
					required
				/>
				<label htmlFor='documents'>Contract Documents</label>
				{readOnly ? (
					<Button
						type='button'
						label='View	Documents'
						className=''
						onClick={() => router.push(`/admin/dashboard/customers/${id}/docs`)}
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

				<label htmlFor='email'>Email</label>
				<Input
					id='email'
					name='contact.email'
					type='text'
					value={customerFormData.contact.email || ''} //needs to be changed into email
					onChange={handleChange}
					disabled={readOnly && true}
					required
				/>

				<label htmlFor='telephone'>Telephone</label>
				<Input
					id='telephone'
					name='contact.telephone'
					type='text'
					value={customerFormData.contact.telephone || ''}
					onChange={handleChange}
					disabled={readOnly && true}
					required
				/>

				<label htmlFor='address'>Address</label>
				<Input
					id='address'
					name='contact.address'
					type='text'
					value={customerFormData.contact.address || ''}
					onChange={handleChange}
					disabled={readOnly && true}
					required
				/>

				<label htmlFor='city'>city</label>
				<Input
					id='city'
					name='contact.city'
					type='text'
					value={customerFormData.contact.city || ''}
					onChange={handleChange}
					disabled={readOnly && true}
					required
				/>

				<label htmlFor='country'>Country</label>
				<Input
					id='country'
					name='contact.country'
					type='text'
					value={customerFormData.contact.country || ''}
					onChange={handleChange}
					disabled={readOnly && true}
					required
				/>

				<label htmlFor='postCode'>Post Code</label>
				<Input
					id='postCode'
					name='contact.zip'
					type='text'
					value={customerFormData.contact.zip || ''}
					onChange={handleChange}
					disabled={readOnly && true}
				/>

				<label htmlFor='notes'>Notes</label>
				<Input
					id='notes'
					name='notes'
					type='text'
					value={customerFormData.notes || ''}
					onChange={handleChange}
					disabled={readOnly && true}
				/>

				<div>
					{readOnly ? (
						<Button
							type='button'
							label='Edit Customer'
							className=''
							onClick={e => {
								e.preventDefault();
								setReadOnly(false);
							}}
						/>
					) : (
						<Button type='submit' label='Save Changes' className='' />
					)}

					<Button
						type='button'
						label='Delete'
						className=''
						onClick={handleShow}
					/>
				</div>
			</Form>
		</>
	);
}
