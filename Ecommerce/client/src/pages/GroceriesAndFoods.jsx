import { useSelector } from "react-redux";
import LinkSection from "../components/LinkSection";
import ProductCard from "../components/ProductCard";

const GroceriesAndFoods = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter(
		(items) =>
			items.category.includes("Fruits & Vegetables") ||
			items.category.includes("Cooking Essentials") ||
			items.category.includes("Snacks & Dry Fruits") ||
			items.category.includes("Breakfast & Snacks") ||
			items.category.includes("Beverages") ||
			items.category.includes("Dairy & Eggs") ||
			items.category.includes("Grains & Rice")
	);
	const links = [
		{
			name: "Grains & Rice",
			path: "/groceries/grains-rice",
		},
		{
			name: "Cooking Essentials",
			path: "/groceries/cooking-essentials",
		},
		{
			name: "Dairy & Eggs",
			path: "/groceries/dairy-eggs",
		},
		{
			name: "Beverages",
			path: "/groceries/beverages",
		},
		{
			name: "Breakfast & Snacks",
			path: "/groceries/breakfast-snacks",
		},
		{
			name: "Snacks & Dry Fruits",
			path: "/groceries/snacks-dry-fruits",
		},
		{
			name: "Fruits & Vegetables",
			path: "/groceries/fruits-vegetables",
		},
		{
			name: "Condiments & Sauces",
			path: "/groceries/condiments-sauces",
		},
		{
			name: "Organic & Health Foods",
			path: "/groceries/organic-health-foods",
		},
		{
			name: "Packaged Foods",
			path: "/groceries/packaged-foods",
		},
		{
			name: "Baking Essentials",
			path: "/groceries/baking-essentials",
		},
		{
			name: "Frozen Foods",
			path: "/groceries/frozen-foods",
		},
		{
			name: "Water & Juices",
			path: "/groceries/water-juices",
		},
	];

	return (
		<div className="px-4 md:px-8 lg:px-18 py-2">
			<div className="flex items-center flex-wrap gap-2 justify-between bg-gray-200 mb-4">
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

export default GroceriesAndFoods;
