import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const RelatedProducts = () => {
	const { id } = useParams();
	const productDetails = useSelector((state) => state.product.products);
	const product = productDetails.find((product) => product._id === Number(id));
	const filteredRelatedProducts = productDetails.filter((items) =>
		items.category.toLowerCase().includes(product.category.toLowerCase())
	);

	return (
		<>
			<h1 className="text-lg font-semibold mt-10 mb-4">You may also like</h1>

			{/* Related Products Section */}
			<div className="overflow-x-auto">
				<div className="flex items-center gap-4 pb-4">
					{filteredRelatedProducts.length > 0 ? (
						filteredRelatedProducts.map((product, index) => (
							<ProductCard product={product} key={index} />
						))
					) : (
						<p className="text-gray-500 text-sm px-2">
							No related products found.
						</p>
					)}
				</div>
			</div>
		</>
	);
};

export default RelatedProducts;
