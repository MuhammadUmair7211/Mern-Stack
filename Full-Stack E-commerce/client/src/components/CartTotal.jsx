import { useApp } from "../context/AppContext";

const CartTotal = () => {
	const { cartItems, handleCartReset, buttonText, user } = useApp();

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
	};
	return (
		<div className="">
			<div className="flex items-end justify-end">
				<form onSubmit={handleFormSubmit} className="max-w-lg w-full">
					<div className="flex flex-col items-start pt-10">
						<p className="flex items-center gap-2 text-2xl">
							<span className="text-gray-500">CART</span>
							<span className="text-gary-700 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-semibold flex items-center gap-2">
								TOTALS
							</span>
						</p>
					</div>
					{payment.map((p, index) => {
						return (
							<div
								key={index}
								className={`flex items-center justify-between border-b border-gray-300 last:border-b-0 pb-2 mt-2 ${
									index === payment.length - 1 && "font-bold"
								}`}
							>
								<p className="text-sm text-gray-800">{p.name}</p>
								<p className="text-sm text-black">${p.price}</p>
							</div>
						);
					})}
					<div className="flex justify-end mt-4 mb-8">
						<button
							type="submit"
							onClick={handleCartReset}
							disabled={!user}
							title={!user ? "please login to continue" : ""}
							className="px-4 py-2 bg-black text-white cursor-pointer disabled:bg-black/60 disabled:cursor-not-allowed"
						>
							{buttonText}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CartTotal;
