import { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { assets, dummyCarData } from "../../assets/assets";

const ManageCars = () => {
	const [cars, setCars] = useState([]);

	const fetchedData = async () => {
		setCars(dummyCarData);
	};
	useEffect(() => {
		fetchedData();
	}, []);
	return (
		<div className="px-4 pt-8 md:px-10 flex-1">
			<Title
				title="Manage Cars"
				subtitle="View all listed cars, update their details, or remove them from the booking platform."
			/>
			<div className="max-w-3xl border border-borderColor mt-6 text-left rounded-md overflow-hidden">
				<table className="border-collapse text-left text-sm w-full text-gary-600">
					<thead className="text-gray-500">
						<tr>
							<th className="p-3 font-medium">Car</th>
							<th className="p-3 font-medium max-md:hidden">Category</th>
							<th className="p-3 font-medium">Price</th>
							<th className="p-3 font-medium max-md:hidden">Status</th>
							<th className="p-3 font-medium">Actions</th>
						</tr>
					</thead>
					<tbody>
						{cars.map((car, index) => {
							return (
								<tr key={index} className="border-t border-borderColor">
									<td className="p-3 flex items-center gap-3">
										<img
											src={car.image}
											alt=""
											className="h-12 w-12 aspect-square rounded-md object-cover"
										/>
										<div className="max-md:hidden">
											<p className="font-medium">
												{car.brand} - {car.model}
											</p>
											<p className="text-xs text-gray-500">
												{car.seating_capacity} - {car.transmission}
											</p>
										</div>
									</td>
									<td className="p-3 max-md:hidden">{car.category}</td>
									<td className="p-3">${car.pricePerDay} /day</td>
									<td className="p-3 max-md:hidden">
										<span
											className={`${
												car.isAvailable
													? "bg-green-100 text-green-700"
													: "bg-red-100 text-red-700"
											} px-3 py-1 rounded-full text-xs`}
										>
											{car.isAvailable ? "Available" : "Unavailable"}
										</span>
									</td>
									<td className="flex items-center p-3">
										<img
											src={
												car.isAvailable
													? assets.eye_close_icon
													: assets.eye_icon
											}
											alt="eye-icon"
											className="cursor-pointer"
										/>
										<img
											src={assets.delete_icon}
											alt=""
											className="cursor-pointer"
										/>
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

export default ManageCars;
