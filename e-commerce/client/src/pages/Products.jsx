import { useCart } from "../contexts/CartContext";

const Products = () => {
	const { addToCart, products } = useCart();
	const { input, setInput } = useCart();
	const filteredProducts = products.filter((product) => {
		return product.title.toLowerCase().includes(input.toLowerCase());
	});
	console.log(filteredProducts);

	return (
		<div className="p-6 pt-20 min-h-screen">
			{/* Search */}
			<div className="max-w-2xl mx-auto my-6 shadow-[0px_0px_5px_0px] px-3 py-2 rounded-full">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="text"
					placeholder="Search products..."
					className="bg-transparent w-full px-3 py-2 outline-none"
				/>
			</div>
			<div className="text-center mb-6">
				<h1 className="text-xl md:text-2xl font-bold text-blue-700">
					All Available Products
				</h1>
			</div>

			{filteredProducts.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filteredProducts.map((p) => (
						<div
							key={p._id}
							className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 flex flex-col"
						>
							<img
								src={`http://localhost:3000/uploads/${p.image}`}
								alt={p.title}
								className="w-full h-48 object-center rounded-t-2xl"
							/>

							<div className="p-4 flex flex-col flex-grow">
								<h2 className="text-lg font-semibold text-gray-800 mb-1">
									{p.title}
								</h2>
								<p className="text-blue-600 font-bold">Rs {p.price}</p>
								<p className="text-yellow-500 text-sm mt-1">⭐ {p.rating}</p>
								<p className="text-gray-500 text-sm mt-2 line-clamp-2">
									{p.description}
								</p>

								<button
									onClick={() => addToCart(p)}
									className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 font-medium cursor-pointer"
								>
									Add to Cart
								</button>
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

export default Products;
