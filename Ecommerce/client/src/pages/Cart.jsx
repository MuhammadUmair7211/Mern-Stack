import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromCart } from "../store/features/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	return (
		<div className="px-4 md:px-8 lg:px-18 py-2 flex flex-col space-y-20">
			<h2 className="text-xl font-bold mb-2 text-gray-800">🛒 Your Cart</h2>

			{cartItems.length === 0 ? (
				<p className="text-gray-500 text-lg">Your cart is empty.</p>
			) : (
				<div>
					{/* Cart Items */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
						{cartItems.map((item) => (
							<div
								key={item._id || item.id}
								className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow max-w-sm"
							>
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-48 object-contain"
								/>

								<div className="p-4 flex flex-col justify-between h-[280px]">
									<div>
										<div className="flex justify-between items-center mb-2">
											<h3 className="text-lg font-semibold text-gray-800">
												{item.title}
											</h3>
											{item.flashSale && (
												<span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
													Flash Sale
												</span>
											)}
										</div>

										<p className="text-sm text-gray-500 mb-2">
											Category: {item.category}
										</p>

										<p className="text-sm text-gray-600 mb-2">
											{item.description}
										</p>

										<div className="flex justify-between text-sm text-gray-600">
											<p>⭐ {item.rating}</p>
											<p>Stock: {item.stock}</p>
										</div>

										<div className="mt-3 flex justify-between items-center">
											<p className="text-xl font-bold text-green-600">
												Rs {item.price}
											</p>
											<p className="text-sm text-gray-600">
												{item.boughtWithRatio}/10 bought
											</p>
										</div>
									</div>

									{/* Quantity */}
									<div className="flex items-center justify-between mt-4">
										<p className="text-sm font-medium text-black">
											Quantity: {item.quantity}
										</p>
										<button
											onClick={() => dispatch(removeItemsFromCart(item._id))}
											className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
										>
											Remove
										</button>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Checkout Summary */}
					<div className="fixed bottom-0 right-0 bg-black/70 text-white text-sm shadow-md mt-10 p-6 max-w-md w-full ml-auto">
						<h3 className="text-2xl font-bold mb-4">Order Summary</h3>
						<div className="flex items-center justify-between mb-2">
							<p className="">Total Items:</p>
							<p>
								{cartItems.reduce((total, item) => total + item.quantity, 0)}
							</p>
						</div>
						<div className="flex justify-between mb-4">
							<p>Total Price:</p>
							<p className="font-semibold text-green-600">
								Rs {Math.round(totalPrice)}
							</p>
						</div>

						<button
							className="w-full bg-green-600 py-3 rounded-xl font-semibold hover:bg-green-700 duration-300 cursor-pointer"
							onClick={() => navigate("/checkout")}
						>
							Proceed to Checkout →
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
