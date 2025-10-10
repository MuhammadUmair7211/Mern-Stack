import Carousel from "../components/Carousel";
import FlashSale from "../components/FlashSale";
import ProductsCategories from "../components/ProductsCategories";

const Home = () => {
	return (
		<div className="px-4 md:px-8 lg:px-18 py-2">
			<Carousel />
			<ProductsCategories />
			<FlashSale />
		</div>
	);
};

export default Home;
