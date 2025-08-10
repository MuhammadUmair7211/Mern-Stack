import { useCart } from "../contexts/CartContext";

const ProductRemove = () => {
	const { products, removeProduct } = useCart();
	return (
		<div className="p-6 min-h-screen">
			<h1 className="text-xl md:text-3xl md:font-bold mb-5">
				🗑️ Remove Products
			</h1>

			{products.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{products.map((p) => (
						<div
							key={p._id}
							className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md  duration-300 hover:scale-104 relative flex flex-col"
						>
							<img
								src={`http://localhost:3000/uploads/${p.image}`}
								alt={p.title}
								className="w-full h-48 object-center rounded-t-2xl"
							/>

							{/* Remove Button */}
							<button
								onClick={() => removeProduct(p._id)}
								className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded-md shadow-sm cursor-pointer duration-300"
							>
								Remove
							</button>

							<div className="p-4 flex flex-col flex-grow">
								<h2 className="text-lg font-semibold text-gray-800 mb-1">
									{p.title}
								</h2>
								<p className="text-blue-600 font-bold">Rs {p.price}</p>
								<p className="text-yellow-500 text-sm mt-1">⭐ {p.rating}</p>
								<p className="text-gray-500 text-sm mt-2 line-clamp-2">
									{p.description}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center mt-6 text-gray-600 text-lg">
					Loading Products...
				</div>
			)}
		</div>
	);
};

export default ProductRemove;
