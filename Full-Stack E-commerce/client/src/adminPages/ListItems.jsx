import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";
const ListItems = () => {
	const { products, fetchProducts } = useApp();
	const handleDelete = async (id) => {
		const result = window.confirm(
			"Are you sure you want to delete this product"
		);
		if (!result) return;
		try {
			const res = await fetch(`http://localhost:3000/api/products/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			console.log(data);
			if (data.success) {
				fetchProducts();
				toast.success(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="px-4">
			<h1 className="text-gray-700 my-4 text-lg font-semibold">
				All Products List
			</h1>

			<div className="space-y-4 cursor-pointer">
				{products.map((product) => (
					<div
						key={product._id}
						className="bg-white border border-gray-300 p-2 rounded-lg shadow hover:shadow-md transition"
					>
						<div className="flex items-center gap-4">
							{/* Image */}
							<div className="w-16 h-16 overflow-hidden rounded">
								<img
									src={product.images?.[0]}
									alt={product.name}
									className="w-full h-full object-cover hover:scale-110 duration-500"
								/>
							</div>

							{/* Fields */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
								<div>
									<p className="text-xs text-gray-500">Name</p>
									<p className="text-sm font-medium">{product.name}</p>
								</div>
								<div>
									<p className="text-xs text-gray-500">Category</p>
									<p className="text-sm font-medium">{product.category}</p>
								</div>
								<div>
									<p className="text-xs text-gray-500">Price</p>
									<p className="text-sm font-medium">${product.price}</p>
								</div>
							</div>

							{/* Action */}
							<div>
								<button
									onClick={() => handleDelete(product._id)}
									className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 duration-300 cursor-pointer"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ListItems;
