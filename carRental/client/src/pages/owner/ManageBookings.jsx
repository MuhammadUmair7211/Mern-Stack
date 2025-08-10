import { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageBookings = () => {
	const [bookings, setBookings] = useState([]);

	const fetchedData = async () => {
		setBookings(dummyMyBookingsData);
	};
	useEffect(() => {
		fetchedData();
	}, []);
	return (
		<div className="px-4 pt-8 md:px-10 flex-1">
			<Title
				title="Manage Bookings"
				subtitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
			/>
			<div className="max-w-3xl border border-borderColor mt-6 text-left rounded-md overflow-hidden">
				<table className="border-collapse text-left text-sm w-full text-gary-600">
					<thead className="text-gray-500">
						<tr>
							<th className="p-3 font-medium">Car</th>
							<th className="p-3 font-medium max-md:hidden">Date Range</th>
							<th className="p-3 font-medium">Total</th>
							<th className="p-3 font-medium max-md:hidden">Payment</th>
							<th className="p-3 font-medium">Actions</th>
						</tr>
					</thead>
					<tbody className="text-gray-500">
						{bookings.map((car, index) => {
							console.log(car);
							return (
								<tr
									key={index}
									className="border-t border-borderColor cursor-pointer"
								>
									<td className="p-3 flex items-center gap-3">
										<img
											src={car.car.image}
											alt=""
											className="h-12 w-12 aspect-square rounded-md object-cover"
										/>
										<div className="max-md:hidden">
											<p className="font-medium">
												{car.car.brand} - {car.car.model}
											</p>
											<p className="text-xs text-gray-500">
												{car.car.seating_capacity} - {car.car.transmission}
											</p>
										</div>
									</td>
									<td className="p-3 max-md:hidden">
										{car.pickupDate.split("T")[0]} To{" "}
										{car.returnDate.split("T")[0]}
									</td>
									<td className="p-3">${car.price}</td>
									<td className="p-3">
										<p className="px-3 py-1.5 bg-light rounded-full text-sm text-gray-500">
											{car.payment}
										</p>
									</td>
									<td className="flex items-center p-3">
										<td className="p-3">
											{car.status === "pending" ? (
												<select
													name=""
													id=""
													value={car.status}
													className="px-2 py-1.5 mt-1 text-gray-500 cursor-pointer border  border-borderColor rounded-md outline-none"
												>
													<option value="pending">Pending</option>
													<option value="cancelled">Cancelled</option>
													<option value="confirmed">Confirmed</option>
												</select>
											) : (
												<span
													className={`${
														car.status === "confirmed"
															? "bg-green-100 text-green-700"
															: "bg-orange-100 text-orange-700"
													} px-3 py-1.5 rounded-full`}
												>
													{car.status}
												</span>
											)}
										</td>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageBookings;
