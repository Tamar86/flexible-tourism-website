'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/admin/context/AuthContext';
import { useRouter } from 'next/navigation';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export default function Register() {
	const { state, dispatch } = useAuth();
	const { email, password, confirmPassword, error, success } = state;
	const [isClient, setIsClient] = useState<boolean>(false);
	const router = useRouter();

	console.log('succ', success);

	useEffect(() => {
		setIsClient(true); // Set to true after client-side render
	}, []);

	if (!isClient) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log(email, password, confirmPassword);
		if (password !== confirmPassword) {
			dispatch({ type: 'SET_ERROR', payload: `Passwords don't match` });
			return;
		}

		try {
			const response = await axios.post(
				'http://localhost:5000/api/admin/register',
				{ email, password },
			);

			router.push('/admin');

			if (response.data.email) {
			}
			console.log('Register Success', response.data);
			console.log('Register Success', response.data);
			console.log('Success', success);
		} catch (error: unknown) {
			if (error instanceof Error) {
				// Error handling
				console.log('err', error.message);

				dispatch({ type: 'SET_ERROR', payload: `${error.message}` });
			} else {
				dispatch({ type: 'SET_ERROR', payload: `An unknown error occurred` });
			}
		}

		dispatch({ type: 'RESET_FORM' });
	};
	return (
		<Form onSubmit={handleSubmit} className='flex flex-col w-[25rem] gap-3'>
			<FloatingLabel controlId='floatingInput' label='Email address'>
				<Form.Control
					type='email'
					placeholder='Enter email'
					value={email}
					onChange={e =>
						dispatch({ type: 'SET_EMAIL', payload: e.target.value })
					}
					required
				/>
			</FloatingLabel>
			<FloatingLabel controlId='floatingPassword' label='Password'>
				<Form.Control
					type='password'
					placeholder='Enter password'
					value={password}
					onChange={e =>
						dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
					}
					required
				/>
			</FloatingLabel>
			<FloatingLabel controlId='floatingPassword' label='Confirm password'>
				<Form.Control
					type='password'
					placeholder='Confirm password'
					value={confirmPassword}
					onChange={e =>
						dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })
					}
					required
				/>
			</FloatingLabel>
			<button
				type='submit'
				className='py-3 rounded-md bg-purple-900 hover:bg-purple-950 text-purple-50'
			>
				Sign Up
			</button>

			{error && (
				<Alert variant='danger' dismissible>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>{error}</p>
				</Alert>
			)}
			{success && (
				<Alert variant='success'>
					<Alert.Heading>Success</Alert.Heading>
					<p>{success}</p>
				</Alert>
			)}
		</Form>
	);
}
