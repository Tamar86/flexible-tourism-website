'use client';

import { useEffect, useState } from 'react';
import { useTours } from '@/app/admin/context/ToursContext';
import { displayAllTours } from '@/app/admin/services/toursService';

import ToursTable from './ToursTable';
import AddNewTourForm from './AddNewTourForm';

import FormSearch from '@/app/admin/ui/FormSearch';
import DropDownSort from '@/app/admin/ui/DropDownSort';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Button from '@/app/admin/ui/Button';

export default function DisplayAllTours() {
	const { dispatch, state } = useTours();
	const { allTours } = state;

	const [title, setTitle] = useState('Sort Tours By');
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(() => {
		displayAllTours(dispatch);
	}, [dispatch]);
	console.log('all Tours', allTours);

	const handleSort = (field: string | null) => {
		if (!field) return;
		console.log('Sorting by:', field);
		setTitle(`Sorted`);
		dispatch({ type: 'SORT_TOURS', payload: field });
	};
	const handleUnsortTours = () => {
		displayAllTours(dispatch);
	};
	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { value } = e.target;
		dispatch({ type: 'SEARCH_BY_NAME', payload: value });
	};

	return (
		<div>
			<div className='mb-3 flex items-center justify-between'>
				<DropDownSort
					onClick={handleUnsortTours}
					icons={{
						iconDown: <ChevronDown className='w-4' />,
						iconUp: <ChevronUp className='w-4' />,
					}}
					label={title}
					options={[
						{ label: 'Minimum Price', value: 'minPrice' },
						{ label: 'Representative', value: 'minGroupSize' },
						{ label: 'Duration', value: 'duration' },
					]}
					onSelect={handleSort}
				/>

				<FormSearch
					type='search'
					placeholder='Search by tour name'
					onChange={handleChangeSearch}
				/>

				<Button
					label='Add New Tour'
					className=''
					type='button'
					onClick={handleShow}
				/>
			</div>
			<ToursTable />
			<AddNewTourForm show={show} setShow={setShow} handleClose={handleClose} />
		</div>
	);
}
