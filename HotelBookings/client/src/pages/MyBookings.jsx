import { assets, userBookingsDummyData } from "../assets/assets";
import Title from "../components/Title";
import { FaCircle } from "react-icons/fa";
const MyBookings = () => {
	console.log(userBookingsDummyData);

	return (
		<div className="py-28 md:pb-35 md:pt-20 px-4 md:px-16 lg:px-24 xl:px-32">
			<Title
				title="My Bookings"
				subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
				align="left"
			/>
			<div className="max-w-6xl mt-8 text-gray-800 hidden md:block overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50 text-gray-600 uppercase font-semibold">
						<tr>
							<th className="text-left px-4 py-2">Hotels</th>
							<th className="text-left px-4 py-2">Date & Timings</th>
							<th className="text-left px-4 py-2">Payment</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 font-semibold text-gray-700">
						{userBookingsDummyData.map((bookings) => {
							console.log(bookings);
							return (
								<tr
									key={bookings._id}
									className="hover:bg-gray-50 transition-all duration-200"
								>
									{/* hotel details */}
									<td className="px-4 py-5 whitespace-nowrap">
										<div className="flex flex-wrap items-center gap-6">
											<img
												src={bookings.room.images[0]}
												alt="room-image"
												className="max-w-44 rounded shadow object-cover"
											/>
											<div className="flex flex-col items-start gap-2">
												<div className="flex items-center gap-2">
													<h1 className="text-lg md:text-2xl font-medium">
														{bookings.hotel.name}
													</h1>
													<span className="text-sm font-light">
														({bookings.room.roomType})
													</span>
												</div>
												<div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
													<img src={assets.locationIcon} alt="location-icon" />
													<span>{bookings.hotel.address}</span>
												</div>
												<div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
													<img src={assets.guestsIcon} alt="guest-icon" />
													<span>Guests : {bookings.guests}</span>
												</div>
												<p className="text-gray-800">
													Total : ${bookings.totalPrice}
												</p>
											</div>
										</div>
									</td>
									{/* date & timings */}
									<td className="px-4 py-5 whitespace-nowrap">
										<div className="flex items-center flex-wrap gap-10">
											<div>
												<h1>Check-In:</h1>
												<span className="text-gray-400 font-medium text-xs">
													{new Date(bookings.checkInDate).toLocaleDateString(
														"en-US",
														{
															day: "numeric",
															month: "long",
															year: "numeric",
														}
													)}
												</span>
											</div>
											<div>
												<h1>Check-Out:</h1>
												<span className="text-gray-400 font-medium text-xs">
													{new Date(bookings.checkOutDate).toLocaleDateString(
														"en-US",
														{
															day: "numeric",
															month: "long",
															year: "numeric",
														}
													)}
												</span>
											</div>
										</div>
									</td>
									{/* payment status */}
									<td className="px-4 py-5 whitespace-nowrap font-medium text-sm">
										{bookings.isPaid ? (
											<p className="text-green-500 flex items-center gap-1">
												<FaCircle size={6} />
												<span>Paid</span>
											</p>
										) : (
											<p className="text-red-500 flex items-center gap-1">
												<FaCircle size={6} />
												<span>Unpaid</span>
											</p>
										)}
										{bookings.isPaid ? (
											""
										) : (
											<button className="border px-4 text-xs font-light py-2 rounded-full mt-2 cursor-pointer hover:bg-gray-300 hover:text-white duration-300">
												Pay Now
											</button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="grid gap-4 md:hidden">
				{userBookingsDummyData.map((bookings) => (
					<div key={bookings._id} className="border rounded-lg p-4 shadow-sm">
						<img
							src={bookings.room.images[0]}
							alt="room"
							className="w-full rounded mb-3"
						/>
						<h1 className="text-xl mt-1 font-semibold">
							{bookings.hotel.name}
						</h1>
						<p className="text-sm text-gray-500 mt-1">
							{bookings.hotel.address}
						</p>
						<p className="text-sm  text-gray-500">Guests: {bookings.guests}</p>
						<p className="text-sm text-gray-500">
							Check-In:{" "}
							{new Date(bookings.checkInDate).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
						<p className="text-sm text-gray-500">
							Check-Out:{" "}
							{new Date(bookings.checkOutDate).toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
						<div className="flex items-center justify-between mt-2">
							{bookings.isPaid ? (
								<p className="text-green-500 flex items-center gap-1">
									<FaCircle size={6} />
									<span>Paid</span>
								</p>
							) : (
								<p className="text-red-500 flex items-center gap-1">
									<FaCircle size={6} />
									<span>Unpaid</span>
								</p>
							)}
							{bookings.isPaid ? (
								""
							) : (
								<button className="border border-gray-500 text-xs px-3 py-1 rounded-full mt-2 cursor-pointer hover:bg-gray-200 duration-300">
									Pay Now
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyBookings;
