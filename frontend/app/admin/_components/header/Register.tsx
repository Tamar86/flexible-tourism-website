'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/admin/context/AuthContext';
import { useRouter } from 'next/navigation';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

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
		<Form onSubmit={handleSubmit}>
			<label htmlFor='email'>Email</label>
			<Input
				id='email'
				type='email'
				placeholder='Enter email'
				value={email}
				onChange={e => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
				required
			/>

			<label htmlFor='password'>Password</label>
			<Input
				id='password'
				type='password'
				placeholder='Enter password'
				value={password}
				onChange={e =>
					dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
				}
				required
			/>

			<label htmlFor='confirmPassword'>Confirm Password</label>
			<Input
				id='confirmPassword'
				type='password'
				placeholder='Confirm password'
				value={confirmPassword}
				onChange={e =>
					dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: e.target.value })
				}
				required
			/>

			<Button
				label='Sign Up'
				type='submit'
				className='py-3 rounded-md bg-purple-900 hover:bg-purple-950 text-purple-50'
			/>

			{error && (
				<div>
					<p>Oh snap! You got an error!</p>
					<p>{error}</p>
				</div>
			)}
			{success && (
				<div>
					<p>Success</p>
					<p>{success}</p>
				</div>
			)}
		</Form>
	);
}
