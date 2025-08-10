import { assets, dummyMyBookingsData } from "../assets/assets";

const MyBookings = () => {
	return (
		<div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
			<h1 className="text-3xl md:text-4xl font-bold mt-2">My Bookings</h1>
			<p className="text-md text-gray-500">
				View and manage your all car bookings
			</p>
			<div>
				{dummyMyBookingsData.map((myBookings, index) => {
					console.log(myBookings);
					return (
						<div
							key={myBookings._id}
							className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
						>
							<div className="md:col-span-1">
								<div className="rounded-md overflow-hidden mb-3">
									<img
										src={myBookings.car.image}
										alt="car"
										className="w-full h-auto object-cover aspect-video"
									/>
									<h1 className="text-xl mt-5">
										{myBookings.car.brand} - {myBookings.car.model}
									</h1>
									<p className="text-gray-500">
										{myBookings.car.year} - {myBookings.car.category} -{" "}
										{myBookings.car.location}
									</p>
								</div>
							</div>
							<div className="md:col-span-2">
								<div className="flex flex-col md:flex-row items-center gap-2">
									<p className="bg-light px-3 py-1.5 rounded-lg text-sm">
										Booking # {index + 1}
									</p>
									<p
										className={`${
											myBookings.status === "pending"
												? "bg-red-200 text-red-600"
												: "bg-green-200 text-green-600"
										} px-3 py-1.5 rounded-full text-sm`}
									>
										{myBookings.status}
									</p>
								</div>
								<div className="mt-2">
									<div className="flex items-center gap-4">
										<img src={assets.calendar_icon_colored} alt="calendar" />
										<div>
											<p className="text-gray-500">Rental Period</p>
											<p>2025-07-07 To 2025-07-08</p>
										</div>
									</div>
									<div className="flex items-center gap-4 mt-3">
										<img src={assets.location_icon_colored} alt="location" />
										<div>
											<p className="text-gray-500">Pickup Location</p>
											<p>Chicago</p>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col items-end">
								<h2 className="text-gray-500 text-sm">Total Price</h2>
								<h1 className="text-xl md:text-2xl text-primary font-medium">
									${myBookings.price}
								</h1>
								<p className="text-gray-500 text-sm">
									Booked on {new Date().toISOString().split("T")[0]}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MyBookings;
