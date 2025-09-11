import { Link } from "react-router-dom";

const ProductItems = ({ product }) => {
	return (
		<Link to={`/products/${product._id}`}>
			<div className="overflow-hidden">
				<img
					src={product?.images[0]}
					alt="product-image"
					className="hover:scale-110 duration-500 ease-in-out cursor-pointer"
				/>
			</div>
			<p className="text-gray-600 font-light text-sm mt-2">{product.name}</p>
			<p className="text-xs text-gray-700 font-bold">${product.price}</p>
		</Link>
	);
};

export default ProductItems;
