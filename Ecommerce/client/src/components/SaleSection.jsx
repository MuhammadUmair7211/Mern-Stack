import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const SaleSection = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter((items) => items.flashSale);

	return (
		<div className="flex overflow-x-scroll gap-4 mt-8">
			{filteredItems.map((product, index) => (
				<div className="flex-none max-w-[280px] w-full">
					<ProductCard product={product} key={index} />
				</div>
			))}
		</div>
	);
};

export default SaleSection;
