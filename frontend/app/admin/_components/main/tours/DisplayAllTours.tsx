'use client';

import { useTours } from '@/app/admin/context/ToursContext';
import { deleteTour, displayAllTours } from '@/app/admin/services/toursService';
import DropdownMenu from '@/app/admin/ui/DropDownMenu';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';

export default function DisplayAllTours() {
	const { dispatch, state } = useTours();
	const { allTours } = state;

	useEffect(() => {
		displayAllTours(dispatch);
	}, [dispatch]);
	console.log('all Tours', allTours);

	const handleDelete = async function (id: string) {
		await deleteTour(id);
		dispatch({ type: 'DELETE_TOUR', payload: id });
	};

	if (allTours.length === 0) return <LoadingSpinner />;
	return (
		<Table striped bordered hover size='sm'>
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Location</th>
					<th>Days</th>
					<th>Nights</th>
					<th>Minimum price</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{allTours?.map((tour, index) => (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{tour.name}</td>
						<td>{tour.location}</td>
						<td>{tour.duration.days}</td>
						<td>{tour.duration.nights}</td>
						<td>{tour.minPrice}</td>
						<td>{tour.description}</td>
						<td>
							<DropdownMenu
								id={tour._id}
								pathTitle='tours'
								handleDelete={handleDelete}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
