import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const SaleSection = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter((items) => items.flashSale);

	return (
		<div className="flex overflow-x-scroll gap-4 mt-8">
			{filteredItems.map((product, index) => (
				<ProductCard product={product} key={index} />
			))}
		</div>
	);
};

export default SaleSection;
