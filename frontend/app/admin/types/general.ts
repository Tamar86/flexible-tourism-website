export interface GeneralContextType {
	state: GeneralState;
	dispatch: React.Dispatch<GeneralAction>;
}

export interface GeneralState {
	readOnly: boolean;
	validated: boolean;
	showConfirmDelete: boolean;
	error: boolean;
}

export type GeneralAction =
	| { type: 'SET_READONLY'; payload: boolean }
	| { type: 'SET_VALIDATED'; payload: boolean }
	| { type: 'SET_SHOW_CONFIRM'; payload: boolean }
	| { type: 'SET_ERROR'; payload: boolean };
