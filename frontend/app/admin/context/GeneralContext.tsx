'use client';

import {
	GeneralAction,
	GeneralContextType,
	GeneralState,
} from '../types/general';
import { createContext, ReactNode, useContext, useReducer } from 'react';

const initialGeneralState: GeneralState = {
	readOnly: true,
	validated: false,
	showConfirmDelete: false,
	error: false,
};

const generalReducer = (state: GeneralState, action: GeneralAction) => {
	switch (action.type) {
		case 'SET_READONLY':
			return { ...state, readOnly: action.payload };
		case 'SET_VALIDATED':
			return { ...state, validate: action.payload };
		case 'SET_SHOW_CONFIRM':
			return { ...state, showConfirmDelete: action.payload };
		case 'SET_ERROR':
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

export const GeneralContext = createContext<GeneralContextType>({
	state: initialGeneralState,
	dispatch: () => {
		throw new Error('dispatch called outside of GeneralProvider');
	},
});

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(generalReducer, initialGeneralState);

	return (
		<GeneralContext.Provider value={{ state, dispatch }}>
			{children}
		</GeneralContext.Provider>
	);
};

export function useGeneral() {
	const context = useContext(GeneralContext);
	if (!context) {
		throw new Error('useGeneral must be used within an GeneralProvider');
	}
	return context;
}
