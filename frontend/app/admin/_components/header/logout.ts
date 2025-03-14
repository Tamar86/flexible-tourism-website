import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export function useLogout() {
	const { dispatch } = useAuth();
	const router = useRouter();

	const logout = () => {
		localStorage.removeItem('authToken');
		dispatch({ type: 'LOGOUT' });
		router.push('/admin');
	};

	return logout;
}
