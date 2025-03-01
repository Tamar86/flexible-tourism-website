'use client';

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from 'react';

// Define the shape of the auth state
interface AuthState {
	loggedIn: boolean;
	email: string;
	password: string;
	confirmPassword: string;
	error: string;
	success: string;
	token: string;
	isPageActive: string;
}

// Define the possible actions

type AuthAction =
	| { type: 'LOGGED_IN'; payload: boolean }
	| { type: 'SET_EMAIL'; payload: string }
	| { type: 'SET_PASSWORD'; payload: string }
	| { type: 'SET_CONFIRM_PASSWORD'; payload: string }
	| { type: 'SET_ERROR'; payload: string }
	| { type: 'SET_SUCCESS'; payload: string }
	| { type: 'SET_TOKEN'; payload: string }
	| { type: 'PAGE_ACTIVE'; payload: string }
	| { type: 'RESET_FORM' }
	| { type: 'LOGOUT' };

// Define the initial state
const initialAuthState: AuthState = {
	loggedIn: false,
	email: '',
	password: '',
	confirmPassword: '',
	error: '',
	success: '',
	token: '',
	isPageActive: '',
};

// Define the reducer function

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
	switch (action.type) {
		case 'LOGGED_IN':
			return { ...state, loggedIn: action.payload };
		case 'SET_EMAIL':
			return { ...state, email: action.payload };
		case 'SET_PASSWORD':
			return { ...state, password: action.payload };
		case 'SET_CONFIRM_PASSWORD':
			return { ...state, confirmPassword: action.payload };
		case 'SET_ERROR':
			return { ...state, error: action.payload, success: '' };
		case 'SET_SUCCESS':
			return { ...state, success: action.payload, error: '' };
		case 'SET_TOKEN':
			return { ...state, token: action.payload };
		case 'PAGE_ACTIVE':
			return { ...state, isPageActive: action.payload };
		case 'LOGOUT':
			return { ...initialAuthState }; // Reset state
		case 'RESET_FORM':
			return {
				...state,
				email: '',
				password: '',
				confirmPassword: '',
			};
		default:
			return state;
	}
};

// Create context with an undefined default value
export const AuthContext = createContext<
	{ state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined
>(undefined);

// Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	// Load authToken from localStorage on initial mount
	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			dispatch({ type: 'SET_TOKEN', payload: token });
			dispatch({ type: 'LOGGED_IN', payload: true });
		}
	}, []);

	const [state, dispatch] = useReducer(authReducer, initialAuthState);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context; // Returns { state, dispatch }
}
