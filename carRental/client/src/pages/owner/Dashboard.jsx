import { useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
const Dashboard = () => {
	const [data, setData] = useState({
		totalCars: 12,
		totalBookings: 34,
		pendingBookings: 5,
		completedBookings: 29,
		monthlyRevenue: 4200,
		recentBookings: [
			{
				car: { brand: "Toyota", model: "Corolla" },
				createdAt: "2025-06-28T14:23:00.000Z",
				price: 120,
				status: "confirmed",
			},
			{
				car: { brand: "Honda", model: "Civic" },
				createdAt: "2025-06-27T10:15:00.000Z",
				price: 95,
				status: "pending",
			},
			{
				car: { brand: "Ford", model: "Focus" },
				createdAt: "2025-06-25T09:00:00.000Z",
				price: 110,
				status: "completed",
			},
			{
				car: { brand: "BMW", model: "X3" },
				createdAt: "2025-06-24T16:45:00.000Z",
				price: 200,
				status: "cancelled",
			},
		],
	});

	const dashboardCards = [
		{
			title: "Total Cars",
			value: dummyDashboardData.totalCars,
			icon: assets.carIconColored,
		},
		{
			title: "Total Bookings",
			value: dummyDashboardData.totalBookings,
			icon: assets.listIconColored,
		},
		{
			title: "Pending",
			value: dummyDashboardData.pendingBookings,
			icon: assets.cautionIconColored,
		},
		{
			title: "Confirmed",
			value: dummyDashboardData.completedBookings,
			icon: assets.listIconColored,
		},
	];

	return (
		<div className="px-4 pt-8 md:px-10 flex-1">
			<Title
				title="Admin Dashboard"
				subtitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
			/>
			<div className="grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
				{dashboardCards.map((card, index) => {
					return (
						<div
							key={index}
							className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor"
						>
							<div>
								<h1 className="text-xs text-gray-500">{card.title}</h1>
								<p className="text-lg font-semibold">{card.value}</p>
							</div>
							<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
								<img src={card.icon} alt="" className="h-4 w-4" />
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex flex-wrap items-start gap-6 mb-8 w-full">
				{/* recent bookings */}
				<div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
					<h1 className="font-medium text-lg">Recent Bookings</h1>
					<p className="text-gray-500 text-md">Latest customer bookings</p>
					{data.recentBookings.map((booking, index) => {
						return (
							<div
								key={index}
								className="mt-4 flex items-center justify-between"
							>
								<div className="flex items-center gap-2">
									<div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
										<img
											src={assets.listIconColored}
											alt="car"
											className="w-5 h-5"
										/>
									</div>
									<div>
										<p>
											{booking.car.brand} {booking.car.model}
										</p>
										<p className="text-sm text-gray-500">
											{booking.createdAt.split("T")[0]}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2 font-medium">
									<p className="text-sm text-gray-500">${booking.price}</p>
									<p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
										{booking.status}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				{/* monthly revenue */}
				<div className="p-4 md:p-6 border border-borderColor rounded-md max-w-xs w-full">
					<h1 className="text-lg font-medium">Monthly Revenue</h1>
					<p className="text-gray-500">Revenue for current month</p>
					<div className="mt-6">
						<h1 className="text-2xl md:text-3xl text-primary font-semibold">
							${data.monthlyRevenue}
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
