import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";

const ListRoom = () => {
	return (
		<div>
			<Title
				title="Room Listings"
				subtitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
				align="left"
			/>
			<div className="overflow-x-auto bg-white rounded-lg">
				<table className="w-full max-w-3xl text-sm text-left text-gray-600">
					<thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
						<tr>
							<th className="px-6 py-3">Name</th>
							<th className="px-6 py-3">Facility</th>
							<th className="px-6 py-3 text-center">Price / night</th>
							<th className="px-6 py-3 text-right">Actions</th>
						</tr>
					</thead>

					<tbody>
						{roomsDummyData.length > 0 ? (
							roomsDummyData.map((room, index) => {
								console.log(room);
								return (
									<tr key={index}>
										<td className="px-6 py-4">{room.hotel.name}</td>
										<td className="px-6 py-4">{room.amenities.join(", ")}</td>
										<td className="px-6 py-4 text-center">
											${room.pricePerNight}
										</td>
										<td className="px-6 py-4 text-right">
											<button
												className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
													room.isAvailable ? "bg-blue-500" : "bg-gray-300"
												}`}
											>
												<span
													className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
														room.isAvailable ? "translate-x-6" : "translate-x-1"
													}`}
												/>
											</button>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td
									colSpan="4"
									className="px-6 py-4 text-center text-gray-500 italic"
								>
									No bookings found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListRoom;
