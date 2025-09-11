import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { useApp } from "../context/AppContext";

const Cart = () => {
	const { cartItems, removeFromCart, setCartItems, user } = useApp();
	console.log(user);

	if (!cartItems || cartItems.length === 0) {
		return (
			<div className="flex items-center justify-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[calc(100vh-370px)]">
				<div className="flex flex-col items-center gap-4">
					<img
						src={assets.abandoned_cart_icon}
						alt="empty-cart"
						className="w-84"
					/>
					<h2 className="text-red-500">Your Cart is Empty</h2>
				</div>
			</div>
		);
	}

	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[calc(100vh-370px)]">
			<div className="flex flex-col items-start border-t border-gray-300 pt-6">
				<p className="flex items-center gap-2 text-xl md:text-2xl">
					<span className="text-gray-500">YOUR</span>
					<span className="text-gary-700 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-semibold flex items-center gap-2">
						CART
					</span>
				</p>
			</div>
			<div className="mt-4">
				{cartItems.length > 0 &&
					cartItems.map((cartItem, index) => {
						return (
							<div
								key={index}
								className="flex items-center justify-between gap-4 mt-4 border-t border-b border-gray-300 px-4 py-2"
							>
								<div className="flex items-center gap-4">
									<img
										src={cartItem.newItem.images[0]}
										alt="product-image"
										className="w-20"
									/>
									<div>
										<p className="text-gray-700 text-md md:text-xl">
											{cartItem.newItem.name}
										</p>
										<div className="flex items-center gap-4 mt-2">
											<p className="text-sm text-gray-700">
												${cartItem.newItem.price}
											</p>
											<p className="w-10 h-8 bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500">
												{cartItem.newItem.selectedSize}
											</p>
										</div>
									</div>
								</div>
								<div className="flex items-center justify-between max-w-2xl w-full">
									<input
										type="number"
										min="1"
										value={cartItem.quantity}
										onChange={(e) => {
											const newQuantity = parseInt(e.target.value) || 1;
											setCartItems((prev) =>
												prev.map((item) =>
													item.newItem._id === cartItem.newItem._id
														? { ...item, quantity: newQuantity }
														: item
												)
											);
										}}
										className="w-12 md:w-16 outline-none border border-gray-300 py-1 text-center rounded"
									/>

									<img
										onClick={() => removeFromCart(cartItem)}
										src={assets.bin_icon}
										alt="delete-icon"
										className="w-5 cursor-pointer hover:scale-110 duration-300"
									/>
								</div>
							</div>
						);
					})}

				<CartTotal />
			</div>
		</div>
	);
};

export default Cart;
