import { useCart } from "../contexts/CartContext";

const Home = () => {
	const { products } = useCart();
	return (
		<div className="p-6 min-h-screen pt-20">
			{products.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
					{products.slice(0, 4).map((p) => (
						<div
							key={p._id}
							className="bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer"
						>
							<img
								src={`http://localhost:3000/uploads/${p.image}`}
								alt={p.title}
								className="w-full h-auto object-center"
							/>
							<h2 className="text-lg font-semibold text-blue-700">{p.title}</h2>
							<p className="text-gray-800 font-bold mt-1">Rs {p.price}</p>
							<p className="text-yellow-600 text-sm">⭐ {p.rating}</p>
							<p className="text-gray-500 text-sm line-clamp-2 mt-1">
								{p.description}
							</p>
						</div>
					))}
				</div>
			) : (
				<h1 className="text-center mt-4">Loading Products...</h1>
			)}
		</div>
	);
};

export default Home;
