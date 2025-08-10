import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { useState } from "react";

const CheckOut = () => {
	const { cartItems, setCartItems } = useCart();
	const navigate = useNavigate();

	const totalAmount = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const [form, setForm] = useState({
		fullname: "",
		email: "",
		address: "",
		contact: "",
	});
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3000/api/orders", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					customerName: form.fullname,
					customerEmail: form.email,
					customerAddress: form.address,
					customerNumber: form.contact,
					totalAmount,
					cartItems: cartItems.map((item) => {
						return {
							title: item.title,
							quantity: item.quantity,
						};
					}),
				}),
			});
			const data = await response.json();

			console.log("✅ Order Placed:", data);
			setCartItems([]);
			alert(`Your order of $${totalAmount.toFixed(2)} is placed!`);
			navigate("/thank-you", {
				state: {
					user: form,
					cart: cartItems,
					total: totalAmount,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
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
		<div className="max-w-6xl mx-auto p-6 pt-20">
			<h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
			<div className="flex flex-col md:flex-row justify-evenly gap-8">
				{/* Cart Summary */}
				<div className="bg-white p-6 max-w-lg w-full shadow-[0_0_5px_0] rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Order Summary</h3>
					<ul className="divide-y">
						{cartItems.map((item) => (
							<li key={item._id} className="py-4 flex justify-between">
								<div>
									<p className="font-medium">{item.title}</p>
									<p className="text-sm text-gray-500">
										Quantity: {item.quantity}
									</p>
								</div>
								<p className="font-semibold">${item.price * item.quantity}</p>
							</li>
						))}
					</ul>
					<div className="border-t pt-2 flex justify-between text-lg font-bold">
						<span>Total:</span>
						<span>${totalAmount.toFixed(2)}</span>
					</div>
				</div>

				{/* Billing Form */}
				<div className="bg-white max-w-lg w-full p-6 shadow-[0_0_5px_0] rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Billing Information</h3>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<label className="block mb-2 font-medium">Full Name</label>
							<input
								type="text"
								className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
								required
								onChange={(e) => setForm({ ...form, fullname: e.target.value })}
								placeholder="enter your full name"
							/>
						</div>
						<div>
							<label className="block mb-1 font-medium">Email</label>
							<input
								type="email"
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
								placeholder="enter your email"
								required
							/>
						</div>
						<div>
							<label className="block mb-1 font-medium">Address</label>
							<input
								type="text"
								onChange={(e) => setForm({ ...form, address: e.target.value })}
								className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
								required
								placeholder="enter your address"
							/>
						</div>
						<div>
							<label className="block mb-1 font-medium">Contact Number</label>
							<input
								type="text"
								onChange={(e) => setForm({ ...form, contact: e.target.value })}
								placeholder="+92-3XX-XXXXXXX"
								className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300 cursor-pointer mt-2"
						>
							Place Order
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CheckOut;
