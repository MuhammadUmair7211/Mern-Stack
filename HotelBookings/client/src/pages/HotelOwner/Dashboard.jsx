import Title from "../../components/Title";
import { dashboardDummyData } from "../../assets/assets";
import { assets } from "../../assets/assets";
const Dashboard = () => {
	const dashboardDetails = [
		{
			name: "Total Bookings",
			icon: assets.totalBookingIcon,
			quantity: dashboardDummyData.totalBookings,
		},
		{
			name: "Total Revenue",
			icon: assets.totalRevenueIcon,
			quantity: dashboardDummyData.totalRevenue,
		},
	];
	return (
		<div>
			<Title
				title="Dashboard"
				subtitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
				align="left"
			/>
			<div className="flex items-center gap-4">
				{dashboardDetails.map((details, index) => {
					return (
						<div
							key={index}
							className="flex items-center gap-4 w-64 px-4 py-6 border border-gray-200 bg-gray-100/10 rounded"
						>
							<img src={details.icon} alt="revenue-icon" />
							<div>
								<h1 className="text-blue-500 font-semibold">{details.name}</h1>
								<p className="text-gray-400">{details.quantity}</p>
							</div>
						</div>
					);
				})}
			</div>
			<div className="mt-10">
				<h1 className="text-gray-700 text-lg md:text-xl font-semibold mb-4">
					Recent Bookings
				</h1>

				<div className="overflow-x-auto bg-white rounded-lg">
					<table className="w-full max-w-3xl text-sm text-left text-gray-600">
						<thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
							<tr>
								<th className="px-6 py-3">Username</th>
								<th className="px-6 py-3">Room Name</th>
								<th className="px-6 py-3 text-center">Total Amount</th>
								<th className="px-6 py-3 text-right">Payment Status</th>
							</tr>
						</thead>

						<tbody>
							{dashboardDummyData.bookings.length > 0 ? (
								dashboardDummyData.bookings.map((booking, index) => (
									<tr
										key={booking._id}
										className={`hover:bg-gray-50 transition-colors ${
											index !== dashboardDummyData.bookings.length - 1
												? "border-b border-gray-200"
												: ""
										}`}
									>
										<td className="px-6 py-4 font-medium text-gray-900">
											{booking.user.username}
										</td>
										<td className="px-6 py-4">{booking.room.roomType}</td>
										<td className="px-6 py-4 text-center">
											${booking.totalPrice}
										</td>
										<td className="px-6 py-4 text-right">
											{booking.status === "paid" ? (
												<span className="px-4 py-2 bg-green-100 text-green-500 rounded-xl text-sm">
													completed
												</span>
											) : (
												<span className="px-6 py-2 bg-yellow-100 text-yellow-500 rounded-xl text-sm">
													pending
												</span>
											)}
										</td>
									</tr>
								))
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
		</div>
	);
};

export default Dashboard;
