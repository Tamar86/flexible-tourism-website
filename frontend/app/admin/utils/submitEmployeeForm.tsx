import { Dispatch } from 'react';
import { addNewEmployee } from '../services/employeesService';
import {
	EmployeesAction,
	EmployeesState,
	SetBooleanState,
} from '../types/employees';

export function submitEmployeeForm(
	event: React.FormEvent<HTMLFormElement>,
	idNumbers: string[],
	error: boolean,
	state: EmployeesState,
	setShow: SetBooleanState,
	dispatch: Dispatch<EmployeesAction>,
	setValidated: SetBooleanState,
) {
	const form = event.currentTarget;

	const idNumberInput = form.querySelector<HTMLInputElement>('#IdNumber');

	if (idNumberInput) {
		if (idNumbers.includes(idNumberInput.value)) {
			idNumberInput.setCustomValidity('ID Number must be unique.');
		} else {
			idNumberInput.setCustomValidity('');
		}
	}

	if (form.checkValidity() === false) {
		event.preventDefault();
		event.stopPropagation();
		setValidated(true);
	}

	if (form.checkValidity() === true) {
		addNewEmployee(state, setShow, dispatch);
		setValidated(true);
	}
}
