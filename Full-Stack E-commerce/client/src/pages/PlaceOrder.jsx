import { useState } from "react";
import CartTotal from "../components/CartTotal";
import { useApp } from "../context/AppContext";

const PlaceOrder = () => {
	const { user } = useApp();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		emailAddress: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		country: "",
		phone: "",
	});

	const { cartItems, handleCartReset, buttonText } = useApp();

	const Total = cartItems.reduce(
		(sum, item) => sum + item.newItem.price * item.quantity,
		0
	);
	const shippingFee = 10.0;
	const payment = [
		{ name: "Subtotal", price: parseFloat(Total).toFixed(2) },
		{ name: "Shipping Fee", price: shippingFee.toFixed(2) },
		{ name: "Total", price: (parseFloat(Total) + shippingFee).toFixed(2) },
	];
	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		handleCartReset();
	};
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-[calc(100vh-375px)]">
			<div className="flex flex-col items-start border-t border-gray-300 py-6">
				<p className="flex items-center gap-2 text-2xl">
					<span className="text-gray-500">DELIVERY</span>
					<span className="text-gary-600 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-medium flex items-center gap-2">
						INFORMATION
					</span>
				</p>
			</div>
			<form
				onSubmit={handleFormSubmit}
				className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-10"
			>
				{/* LEFT SIDE: Delivery form fields */}
				<div className="flex flex-col gap-4 max-w-xl w-full">
					<div className="flex items-center flex-wrap gap-4">
						<input
							type="text"
							placeholder="First name"
							required
							value={user?.firstName}
							onChange={(e) =>
								setFormData({ ...formData, firstName: e.target.value })
							}
							className="flex-1 border border-gray-300 p-2 outline-none text-gray-600"
						/>
						<input
							type="text"
							placeholder="Last name"
							required
							value={user?.lastName}
							onChange={(e) =>
								setFormData({ ...formData, lastName: e.target.value })
							}
							className="flex-1 border border-gray-300 p-2 outline-none text-gray-600"
						/>
					</div>

					<input
						type="email"
						placeholder="Email address"
						required
						value={user?.emailAddress}
						onChange={(e) =>
							setFormData({ ...formData, emailAddress: e.target.value })
						}
						className="w-full border border-gray-300 p-2 outline-none text-gray-600"
					/>

					<input
						type="text"
						placeholder="Street"
						required
						value={formData.street}
						onChange={(e) =>
							setFormData({ ...formData, street: e.target.value })
						}
						className="w-full border border-gray-300 p-2 outline-none text-gray-600"
					/>

					<div className="flex items-center flex-wrap gap-4">
						<input
							type="text"
							placeholder="City"
							required
							value={formData.city}
							onChange={(e) =>
								setFormData({ ...formData, city: e.target.value })
							}
							className="flex-1 border border-gray-300 p-2 outline-none text-gray-600"
						/>
						<input
							type="text"
							placeholder="State"
							required
							value={formData.state}
							onChange={(e) =>
								setFormData({ ...formData, state: e.target.value })
							}
							className="flex-1 border border-gray-300 p-2 outline-none text-gray-600"
						/>
					</div>

					<div className="flex items-center flex-wrap gap-4">
						<input
							type="number"
							placeholder="Zipcode"
							required
							value={formData.zipCode}
							onChange={(e) =>
								setFormData({ ...formData, zipCode: e.target.value })
							}
							className="flex-1 border border-gray-300 p-2 outline-none text-gray-600"
						/>
						<input
							type="text"
							placeholder="Country"
							required
							value={formData.country}
							onChange={(e) =>
								setFormData({ ...formData, country: e.target.value })
							}
							className="flex-1 border border-gray-300 p-2 outline-none text-gray-600"
						/>
					</div>

					<input
						type="number"
						placeholder="Phone"
						required
						value={formData.phone}
						onChange={(e) =>
							setFormData({ ...formData, phone: e.target.value })
						}
						className="w-full border border-gray-300 p-2 outline-none text-gray-600"
					/>
				</div>

				{/* RIGHT SIDE: Cart totals */}
				<div className="flex flex-col justify-between max-w-lg mx-auto w-full">
					<div>
						<p className="flex items-center gap-2 text-2xl mb-4">
							<span className="text-gray-500">CART</span>
							<span className="text-gary-700 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-semibold flex items-center gap-2">
								TOTALS
							</span>
						</p>

						{payment.map((p, index) => (
							<div
								key={index}
								className={`flex items-center justify-between border-b border-gray-300 last:border-b-0 pb-2 mt-2 ${
									index === payment.length - 1 && "font-bold"
								}`}
							>
								<p className="text-sm text-gray-800">{p.name}</p>
								<p className="text-sm text-black">${p.price}</p>
							</div>
						))}
					</div>

					{/* Place order button */}
					<div className="flex justify-end mt-8">
						<button
							type="submit"
							disabled={!user}
							title={!user ? "please login to continue" : ""}
							className="px-4 py-2 bg-black text-white cursor-pointer disabled:bg-black/60 disabled:cursor-not-allowed"
						>
							{buttonText}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PlaceOrder;
