import { Link } from "react-router-dom";
import { products } from "../assets/frontend_assets/assets";
import ProductItems from "./ProductItems";

const RelatedProducts = ({ p }) => {
	const relatedProducts = products.filter(
		(product) => product.category === p.category
	);

	return (
		<div className="px-4">
			<div className="flex flex-col items-center mt-20">
				<p className="flex items-center gap-2 text-3xl">
					<span className="text-gray-500">RELATED</span>
					<span className="text-gary-700 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-semibold flex items-center gap-2">
						PRODUCTS
					</span>
				</p>
			</div>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 mt-10">
				{relatedProducts.slice(0, 5).map((product) => {
					return <ProductItems key={product._id} product={product} />;
				})}
			</div>
		</div>
	);
};

export default RelatedProducts;
