'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/admin/context/AuthContext';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

export default function Login() {
	const [isClient, setIsClient] = useState<boolean>(false);
	const { state, dispatch } = useAuth();
	const { email, password, error } = state;

	const router = useRouter();

	useEffect(() => {
		setIsClient(true); // Set to true after client-side render
	}, []);

	if (!isClient) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log(email, password);

		try {
			const response = await axios.post(
				'http://localhost:5000/api/admin/login',
				{ email, password },
			);
			// Store the JWT token in localStorage
			const token = response.data.token;
			localStorage.setItem('authToken', token);
			dispatch({ type: 'SET_TOKEN', payload: token });
			dispatch({ type: 'LOGGED_IN', payload: true });

			// Redirect to the dashboard page after successful login
			router.push('/admin/dashboard');

			console.log('Login Success', response.data);
		} catch (err: unknown) {
			if (err instanceof Error) {
				dispatch({ type: 'SET_ERROR', payload: `${err.message}` });
			} else {
				dispatch({ type: 'SET_ERROR', payload: `An unknown error occurred` });
			}
		}

		dispatch({ type: 'RESET_FORM' });
	};
	return (
		<Form onSubmit={handleSubmit}>
			<label htmlFor='email'>Email Address</label>
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

			<Button
				label='Sign In'
				type='submit'
				className='py-3 rounded-md bg-purple-900 hover:bg-purple-950 text-purple-50'
			/>

			{error && <p>{error}</p>}
		</Form>
	);
}
