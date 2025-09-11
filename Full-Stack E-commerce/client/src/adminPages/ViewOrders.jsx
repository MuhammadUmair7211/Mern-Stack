import { useApp } from "../context/AppContext";

const formatCurrency = (v) =>
	typeof v === "number" ? v.toFixed(2) : Number(v || 0).toFixed(2);

const ViewOrders = () => {
	const { orders = [], user } = useApp();
	if (!Array.isArray(orders) || orders.length === 0) {
		return (
			<div className="px-4 py-8 text-center text-gray-600">
				No orders found.
			</div>
		);
	}

	return (
		<div className="px-4">
			<h1 className="text-gray-700 my-4 text-lg font-semibold">All Orders</h1>

			<div className="space-y-6">
				{orders.map((order, orderIndex) => {
					console.log(order);

					const orderId = order?.id ?? order?._id ?? orderIndex;
					const orderDate =
						!isNaN(Number(orderId)) && Number(orderId) > 0
							? new Date(Number(orderId)).toLocaleString()
							: "";

					const items = Array.isArray(order?.items) ? order.items : [];

					const orderTotal = items.reduce((acc, it) => {
						const prod = it?.newItem ?? it;
						const price = Number(prod?.price ?? 0);
						const qty = Number(it?.quantity ?? 1);
						return acc + price * qty;
					}, 0);

					return (
						<div
							key={`${orderId}-${orderIndex}`}
							className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
						>
							{/* Customer Info */}
							<div className="mb-4">
								<div className="flex items-center justify-between">
									<h2 className="font-semibold text-gray-800">
										Order #{orderIndex + 1}
									</h2>
									<p>Items: {items.length}</p>
								</div>
								{orderDate && (
									<p className="text-sm text-gray-500">Placed: {orderDate}</p>
								)}

								<div className="mt-2 space-y-1 text-sm text-gray-600">
									<p>
										<span className="font-medium">Name:</span>{" "}
										{user ? user?.firstName + user?.lastName : "N/A"}
									</p>
									<p>
										<span className="font-medium">Email:</span>{" "}
										{user?.emailAddress ?? "N/A"}
									</p>
									<p>
										<span className="font-medium">Phone:</span>{" "}
										{order?.phone ?? "N/A"}
									</p>
									<p>
										<span className="font-medium">Address:</span>{" "}
										{order?.address ?? "N/A"}
									</p>
								</div>
							</div>

							{/* Order Items */}
							<div className="divide-y divide-gray-100">
								{items.map((it, i) => {
									const prod = it?.newItem ?? it;
									const image = Array.isArray(prod?.image)
										? prod.image[0]
										: prod?.image;
									const name = prod?.name ?? "Unknown product";
									const category = prod?.category ?? prod?.subCategory ?? "";
									const price = Number(prod?.price ?? 0);
									const qty = Number(it?.quantity ?? 1);

									return (
										<div
											key={`${prod?._id ?? name}-${i}`}
											className="flex items-center justify-between py-3"
										>
											<div className="flex items-center gap-3">
												<div className="w-12 h-12 rounded overflow-hidden bg-gray-50 flex-shrink-0">
													{image ? (
														<img
															src={image}
															alt={name}
															className="w-full h-full object-cover"
														/>
													) : (
														<div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
															no image
														</div>
													)}
												</div>

												<div>
													<p className="font-medium text-gray-700">{name}</p>
													<p className="text-sm text-gray-500">{category}</p>
													{it?.selectedSize && (
														<p className="text-xs text-gray-500">
															Size: {it.selectedSize}
														</p>
													)}
												</div>
											</div>

											<div className="text-right">
												<p className="font-semibold">
													${formatCurrency(price * qty)}
												</p>
												<p className="text-sm text-gray-500">
													{qty} × ${formatCurrency(price)}
												</p>
											</div>
										</div>
									);
								})}
							</div>

							{/* Order Total */}
							<div className="mt-3 flex justify-end">
								<p className="font-semibold">
									Order total: ${formatCurrency(orderTotal)}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ViewOrders;
