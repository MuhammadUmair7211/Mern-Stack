import { useEffect, useState } from "react";

const OrderDetails = () => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/orders");
				const data = await response.json();
				const ordersWithStatus = data.map((order) => ({
					...order,
					completed: false,
				}));
				setOrders(ordersWithStatus);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};

		fetchOrders();
	}, []);
	const toggleCompleted = (id) => {
		setOrders((prevOrders) =>
			prevOrders.map((order) =>
				order._id === id ? { ...order, completed: true } : order
			)
		);
	};
	const handleCompletedOrder = async (id) => {
		if (!window.confirm("Are you sure this order is completed?")) {
			return setOrders((prev) =>
				prev.map((order) =>
					order._id === id ? { ...order, completed: !order.completed } : order
				)
			);
		}
		try {
			const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (res.ok && data.success) {
				setOrders((prev) => prev.filter((p) => p._id !== id));
				alert("Product deleted successfully");
			} else {
				alert(data.message || "failed to delete");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="p-6 min-h-screen bg-gray-50">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">
				📦 All Customer Orders
			</h1>
			{orders.length === 0 ? (
				<p className="p-6">No orders found.</p>
			) : (
				<div className="space-y-4">
					{orders.map((order) => (
						<div
							key={order._id}
							className={`rounded-lg shadow-md p-5 border border-gray-200 relative ${
								order.completed ? "bg-red-400" : ""
							}`}
						>
							<p className={`${order.completed ? "line-through" : ""}`}>
								<strong>Name:</strong> {order.customerName}
							</p>
							<p className={`${order.completed ? "line-through" : ""}`}>
								<strong>Email:</strong> {order.customerEmail}
							</p>
							<p className={`${order.completed ? "line-through" : ""}`}>
								<strong>Phone:</strong> {order.customerNumber}
							</p>
							<p className={`${order.completed ? "line-through" : ""}`}>
								<strong>Address:</strong> {order.customerAddress}
							</p>
							<p className={`${order.completed ? "line-through" : ""}`}>
								<strong>Total Amount:</strong> Rs{" "}
								{order.totalAmount?.toFixed(2)}
							</p>
							<p className={`${order.completed ? "line-through" : ""}`}>
								<strong>Date:</strong>{" "}
								{new Date(order.createdAt).toLocaleString()}
							</p>
							<button
								onClick={() => toggleCompleted(order._id)}
								className={`mt-2 px-4 py-2 rounded absolute cursor-pointer top-0 right-2 ${
									order.completed
										? "bg-red-500 hover:bg-red-600 duration-300"
										: "bg-green-500  hover:bg-green-600 duration-300"
								} text-white`}
							>
								{order.completed ? "Mark as Incomplete" : "Mark as Completed"}
							</button>
							<button
								onClick={() => handleCompletedOrder(order._id)}
								className="absolute bottom-4 right-4 cursor-pointer text-2xl"
							>
								{order.completed ? "🗑️" : ""}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default OrderDetails;
