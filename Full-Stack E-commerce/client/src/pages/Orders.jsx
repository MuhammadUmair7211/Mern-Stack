import { assets } from "../assets/frontend_assets/assets";
import { useApp } from "../context/AppContext";

const Orders = () => {
	const { orders } = useApp();
	console.log(orders);

	if (orders.length === 0) {
		return (
			<div className="min-h-[calc(100vh-375px)] flex items-center justify-center">
				<h2 className="text-center mt-10 text-gray-500">No orders yet</h2>
			</div>
		);
	}

	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[calc(100vh-375px)]">
			{/* Heading */}
			<div className="flex flex-col items-start border-t border-gray-300 py-6">
				<p className="flex items-center gap-2 text-2xl">
					<span className="text-gray-500">MY</span>
					<span className="text-gray-600 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-medium flex items-center gap-2">
						ORDERS
					</span>
				</p>
			</div>

			{/* Orders List */}
			<div>
				{orders.map((order, orderIndex) => (
					<div key={orderIndex} className="mb-6">
						{/* Loop through all items inside this order */}
						{order.items.map((cartItem, index) => {
							return (
								<div
									key={index}
									className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-b border-gray-300 px-4 py-2"
								>
									{/* Product Info */}
									<div className="flex items-center gap-4">
										<img
											src={cartItem.newItem.images[0]}
											alt="product-image"
											className="w-20"
										/>
										<div>
											<p className="text-gray-800 text-md md:text-lg">
												{cartItem.newItem.name}
											</p>
											<div className="flex items-center gap-4">
												<p className="text-sm text-gray-600">
													${cartItem.newItem.price}
												</p>
												<p className="text-sm text-gray-600">
													Quantity: {cartItem.quantity}
												</p>
												<p className="text-sm text-gray-600">Size: M</p>
											</div>
											<p className="text-sm text-gray-800">
												Date:{" "}
												{new Date(order.date || Date.now()).toDateString()}
											</p>
											<p className="text-sm text-gray-800">
												Total: ${cartItem.newItem.price * cartItem.quantity}
											</p>
											<p className="text-sm text-gray-800">Payment: COD</p>
										</div>
									</div>

									{/* Order Status */}
									<div className="flex items-center justify-between max-w-2xl w-full">
										<div className="flex items-center">
											<img
												src={assets.order_confirm_icon}
												alt="confirm-icon"
												className="w-10"
											/>
											<p className="text-sm text-gray-500 font-light">
												order placed
											</p>
										</div>
										<div className="flex items-center gap-6">
											<button className="px-6 py-2 bg-black text-white cursor-pointer">
												Track Order
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
};

export default Orders;
