import React, { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const shippingFee = 10.0;
	// Calculate totals
	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const totalQuantity = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	// Form state
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		address: "",
		city: "",
		zip: "",
		paymentMethod: "cod", // default: Cash on Delivery
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Order Submitted:", { formData, cartItems });
		alert("✅ Order placed successfully!");
	};

	return (
		<div className="px-4 md:px-8 lg:px-18 py-10">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout 🛍️</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left: Shipping & Payment Form */}
				<div className="lg:col-span-2 bg-white shadow-md rounded-2xl p-6">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Shipping Information
					</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<input
								type="text"
								name="fullName"
								value={formData.fullName}
								onChange={handleChange}
								placeholder="Full Name"
								required
								className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
							/>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email Address"
								required
								className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
							/>
						</div>

						<input
							type="text"
							name="address"
							value={formData.address}
							onChange={handleChange}
							placeholder="Street Address"
							required
							className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
						/>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<input
								type="text"
								name="city"
								value={formData.city}
								onChange={handleChange}
								placeholder="City"
								required
								className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
							/>
							<input
								type="text"
								name="zip"
								value={formData.zip}
								onChange={handleChange}
								placeholder="ZIP / Postal Code"
								required
								className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
							/>
						</div>

						<h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
							Payment Method
						</h2>

						<div className="space-y-2">
							<label className="flex items-center gap-3">
								<input
									type="radio"
									name="paymentMethod"
									value="cod"
									checked={formData.paymentMethod === "cod"}
									onChange={handleChange}
								/>
								Cash on Delivery
							</label>

							<label className="flex items-center gap-3">
								<input
									type="radio"
									name="paymentMethod"
									value="card"
									checked={formData.paymentMethod === "card"}
									onChange={handleChange}
								/>
								Credit / Debit Card
							</label>

							<label className="flex items-center gap-3">
								<input
									type="radio"
									name="paymentMethod"
									value="paypal"
									checked={formData.paymentMethod === "paypal"}
									onChange={handleChange}
								/>
								PayPal
							</label>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all mt-6"
						>
							Place Order
						</button>
					</form>
				</div>

				{/* Right: Order Summary */}
				<div className="sticky top-6 bg-white shadow-md rounded-2xl p-6 h-fit">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Order Summary
					</h2>

					{cartItems.map((item) => (
						<div
							key={item._id}
							className="flex justify-between items-center mb-3"
						>
							<div>
								<p className="text-sm font-medium">{item.title}</p>
								<p className="text-xs text-gray-500">Qty: {item.quantity}</p>
							</div>
							<p className="text-sm font-semibold text-gray-700">
								Rs {item.price * item.quantity}
							</p>
						</div>
					))}

					<hr className="my-4" />

					<div className="flex justify-between text-gray-700 mb-2">
						<p className="text-sm">Total Items</p>
						<p className="text-sm">{totalQuantity}</p>
					</div>
					<div className="flex justify-between text-gray-700 mb-2">
						<p className="text-sm">Delivery Fee</p>
						<p className="text-sm">{shippingFee}</p>
					</div>

					<div className="flex justify-between text-gray-700 mb-2">
						<p className="text-sm">Total Price</p>
						<p className="font-semibold text-green-600">
							Rs {totalPrice.toFixed(2)}
						</p>
					</div>
					<div className="flex justify-between text-gray-700">
						<p className="text-sm">Grand Total</p>
						<p className="font-semibold text-green-600">
							Rs {(totalPrice + Number(shippingFee)).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
