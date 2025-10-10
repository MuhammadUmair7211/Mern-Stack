import { useSelector } from "react-redux";
import LinkSection from "../components/LinkSection";
import ProductCard from "../components/ProductCard";

const SportsAndFitness = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter(
		(items) =>
			items.category.includes("Team Sports") ||
			items.category.includes("Racquet Sports") ||
			items.category.includes("Fitness & Training") ||
			items.category.includes("Footwear")
	);

	const links = [
		{
			name: "Fitness & Training",
			path: "/sports/fitness-training",
		},
		{
			name: "Team Sports",
			path: "/sports/team-sports",
		},
		{
			name: "Racquet Sports",
			path: "/sports/racquet-sports",
		},
		{
			name: "Outdoor Sports",
			path: "/sports/outdoor-sports",
		},
		{
			name: "Footwear",
			path: "/sports/footwear",
		},
		{
			name: "Clothing",
			path: "/sports/clothing",
		},
		{
			name: "Accessories",
			path: "/sports/accessories",
		},
		{
			name: "Camping & Hiking",
			path: "/sports/camping-hiking",
		},
	];

	return (
		<div className="px-4 md:px-8 lg:px-18 py-2">
			<div className="flex items-center flex-wrap justify-between bg-gray-200 mb-4">
				{links.map((link, index) => {
					return <LinkSection link={link} key={index} />;
				})}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{filteredItems.map((product, index) => (
					<ProductCard product={product} key={index} />
				))}
			</div>
		</div>
	);
};

export default SportsAndFitness;
