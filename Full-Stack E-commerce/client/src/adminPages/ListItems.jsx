import { products } from "../assets/frontend_assets/assets";

const ListItems = () => {
	return (
		<div className="px-2 md:px-4 lg:px-10 py-6">
			<h1 className="text-gray-700 my-4 text-lg font-semibold">
				All Products List
			</h1>

			<table className="w-full text-gray-600 border-separate border-spacing-y-2">
				<thead>
					<tr className="text-sm uppercase bg-gray-100 ">
						<th className="text-left p-1">Image</th>
						<th className="text-left">Name</th>
						<th className="text-left">Category</th>
						<th className="text-left">Price</th>
						<th className="text-center">Action</th>
					</tr>
				</thead>

				<tbody>
					{products.map((product) => (
						<tr
							key={product._id}
							className="bg-white hover:bg-gray-50 border border-gray-300"
						>
							<td className="p-1">
								<div className="overflow-hidden">
									<img
										src={product.image}
										alt={product.name}
										className="w-12 h-12 object-cover hover:scale-110 duration-500 cursor-pointer"
									/>
								</div>
							</td>
							<td className="text-sm">{product.name}</td>
							<td>{product.category}</td>
							<td>${product.price}</td>
							<td className="text-center">
								<button className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListItems;
