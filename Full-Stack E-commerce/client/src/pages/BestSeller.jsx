import ProductItems from "../components/ProductItems";
import { useApp } from "../context/AppContext";

const BestSeller = () => {
	const { products } = useApp();
	const bestSeller = products.filter((p) => p.bestseller);
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
				{bestSeller.slice(0, 5).map((product) => {
					return <ProductItems product={product} key={product._id} />;
				})}
			</div>
		</div>
	);
};

export default BestSeller;
