import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
	const [adminDashboardTitle] = useState([
		{
			title: "Upload Product",
			link: "/product-form-upload",
			icon: "📤",
			description: "Add new products to your store",
		},
		{
			title: "Remove Product",
			link: "/product-remove",
			icon: "❌",
			description: "Remove listed products from store",
		},
		{
			title: "Order Details",
			link: "/order-details",
			icon: "📋",
			description: "See a list of orders from customers",
		},
	]);
	const navigate = useNavigate();
	return (
		<>
			<h1 className="text-center pt-10 text-xl md:text-3xl md:font-bold">
				🛠️ Admin Dashboard
			</h1>
			<div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
				{adminDashboardTitle.map((dashboard, index) => {
					return (
						<div
							key={index}
							className="max-w-lg border border-gray-200 p-4 rounded-lg"
						>
							<div className="flex items-center space-x-4">
								<div className="text-3xl">{dashboard.icon}</div>
								<div>
									<h2 className="text-lg font-semibold">{dashboard.title}</h2>
									<p className="text-sm text-gray-500">
										{dashboard.description}
									</p>
								</div>
							</div>
							<button
								onClick={() => navigate(dashboard.link)}
								className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium duration-300 cursor-pointer"
							>
								{dashboard.title}
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default AdminDashboard;
