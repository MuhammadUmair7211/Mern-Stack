import { useSelector } from "react-redux";
import LinkSection from "../components/LinkSection";
import ProductCard from "../components/ProductCard";

const FashionAndApparel = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter(
		(items) =>
			items.category.includes("Men's Clothing") ||
			items.category.includes("Women's Clothing") ||
			items.category.includes("Outerwear") ||
			items.category.includes("Footwear") ||
			items.category.includes("Footwear")
	);
	const links = [
		{
			name: "Men's Clothing",
			path: "/fashion-apparel/mens-clothing",
		},
		{
			name: "Women's Clothing",
			path: "/fashion-apparel/womens-clothing",
		},
		{
			name: "Footwear",
			path: "/fashion-apparel/footwear",
		},

		{
			name: "Outerwear",
			path: "/fashion-apparel/outerwear",
		},
		{
			name: "Bags & Wallets",
			path: "/fashion-apparel/bags-wallets",
		},

		{
			name: "Jewelry & Watches",
			path: "/fashion-apparel/jewelry-watches",
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

export default FashionAndApparel;
