import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../hooks/useAuth";
const Cart = () => {
	const navigate = useNavigate();
	const user = useAuth();
	const { cartItems, removeFromCart } = useCart();

	const getTotal = () =>
		cartItems
			.reduce((sum, item) => sum + item.price * item.quantity, 0)
			.toFixed(2);

	if (cartItems.length === 0) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<h2 className="text-2xl font-semibold text-gray-700">
					🛒 Your cart is empty.
				</h2>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 pt-20">
			<h2 className="text-3xl font-bold mb-6">Your Cart</h2>
			<div className="space-y-4">
				{cartItems.map((item) => (
					<div
						key={item._id}
						className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-white p-6 rounded-lg shadow-[0_0_5px_0]"
					>
						<div className="flex flex-col md:flex-row gap-4 items-center">
							<div>
								<img
									src={`http://localhost:3000/uploads/${item.image}`}
									alt={item.title}
									className="w-50 h-auto object-center"
								/>
							</div>
							<div className="flex items-start flex-col md:flex-row gap-10">
								<div>
									<h1 className="text-xl font-semibold">{item.title}</h1>
									<p className="text-gray-600"></p>
									<p className="text-sm text-gray-600">
										{item.availabilityStatus}
									</p>
									<p className="text-sm">⭐ {item.rating}</p>
								</div>
								<div>
									<p className="text-sm text-red-500">{item.returnPolicy}</p>
									<p className="text-green-500 text-sm">stock: {item.stock}</p>
									<p className="text-sm text-zinc-500">
										{item.warrantyInformation}
									</p>
									<p className="text-lg font-semibold">
										${item.price} * {item.quantity}
									</p>
									<div className="text-sm text-slate-800">
										<p>{item.description}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col items-center gap-5">
							<span className="text-lg font-semibold">
								${(item.price * item.quantity).toFixed(2)}
							</span>
							<button
								onClick={() => removeFromCart(item)}
								className="text-white cursor-pointer hover:bg-red-600 bg-red-500 px-4 py-2 rounded-full duration-300"
							>
								Remove
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="mt-8 flex justify-between items-center">
				<h3 className="text-xl font-bold">Total: ${getTotal()}</h3>
				<button
					onClick={() => {
						user ? navigate("/check-out") : navigate("/login");
					}}
					className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 cursor-pointer duration-300"
				>
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
};

export default Cart;
