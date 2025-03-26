import { useTours } from '@/app/admin/context/ToursContext';
import { deleteTour } from '@/app/admin/services/toursService';
import DropdownMenu from '@/app/admin/ui/DropDownMenu';
import LoadingSpinner from '@/app/admin/ui/LoadingSpinner';

export default function ToursTable() {
	const { state, dispatch } = useTours();
	const { allTours } = state;
	const handleDelete = async function (id: string) {
		await deleteTour(id);
		dispatch({ type: 'DELETE_TOUR', payload: id });
	};
	if (allTours.length === 0) return <LoadingSpinner />;
	return (
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Title</th>
					<th>Location</th>
					<th>Days</th>
					<th>Nights</th>
					<th>Minimum price</th>
					<th>Min Group Size</th>
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
						<td>{tour.minGroupSize}</td>
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
		</table>
	);
}
