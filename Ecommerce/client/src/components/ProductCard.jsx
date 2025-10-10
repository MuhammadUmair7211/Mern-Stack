const ProductCard = ({ product }) => {
	return (
		<div
			key={product.id}
			className="flex flex-col justify-between border border-gray-300 rounded-lg p-4 bg-white shadow cursor-pointer relative"
		>
			<img
				src={product.image}
				alt={product.title}
				className="max-w-md w-full object-center hover:scale-110 duration-300"
			/>
			<div className="text-gray-700">
				<h2 className="text-lg font-semibold mt-2">{product.title}</h2>
				<p className="text-sm">{product.category}</p>
				<p className="text-sm">{product.stock} in stock</p>
				<p className="text-sm">{product.rating} rating</p>
				<p className="">Rs {product.price}</p>
				<div className="flex items-center space-x-2 text-xs text-gray-500">
					<input
						type="range"
						className="flex-1"
						value={product.boughtWithRatio}
						max={10}
						readOnly
					/>
					<span>{product.boughtWithRatio}/10 sale</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
