import { useSelector } from "react-redux";
import LinkSection from "../components/LinkSection";
import ProductCard from "../components/ProductCard";

const HomeAndKitchen = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter(
		(items) =>
			items.category.includes("Cookware") ||
			items.category.includes("Tableware") ||
			items.category.includes("Kitchen Essentials") ||
			items.category.includes("Appliances") ||
			items.category.includes("Home Textiles") ||
			items.category.includes("Lighting") ||
			items.category.includes("Storage & Organization") ||
			items.category.includes("Storage & Organization")
	);
	const links = [
		{
			name: "Cookware",
			path: "/home-kitchen/cookware",
		},
		{
			name: "Tableware",
			path: "/home-kitchen/tableware",
		},
		{
			name: "Kitchen Essentials",
			path: "/home-kitchen/kitchen-essentials",
		},
		{
			name: "Appliances",
			path: "/home-kitchen/appliances",
		},
		{
			name: "Home Textiles",
			path: "/home-kitchen/home-textiles",
		},
		{
			name: "Lighting",
			path: "/home-kitchen/lighting",
		},
		{
			name: "Storage & Organization",
			path: "/home-kitchen/storage-organization",
		},
		{
			name: "Bakeware",
			path: "/home-kitchen/bakeware",
		},
		{
			name: "Home Decor",
			path: "/home-kitchen/home-decor",
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

export default HomeAndKitchen;
