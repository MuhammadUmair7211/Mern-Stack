import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import LinkSection from "../components/LinkSection";

const Electronics = () => {
	const links = [
		{
			name: "Mobiles & Tablets",
			path: "/electronics/mobiles-tablets",
		},
		{
			name: "Laptops & Computers",
			path: "/electronics/laptops-computers",
		},
		{
			name: "Audio Devices",
			path: "/electronics/audio-devices",
		},
		{
			name: "Cameras & Photography",
			path: "/electronics/cameras-photography",
		},
		{
			name: "Smart Devices & Wearables",
			path: "/electronics/smart-devices-wearables",
		},
		{
			name: "Gaming & Accessories",
			path: "/electronics/gaming-accessories",
		},
		{
			name: "Computer Accessories",
			path: "/electronics/computer-accessories",
		},
		{
			name: "Power & Charging Solutions",
			path: "/electronics/power-charging",
		},
	];

	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter(
		(items) =>
			items.category.includes("Electronics") ||
			items.category.includes("Computer") ||
			items.category.includes("Accessories") ||
			items.category.includes("Devices") ||
			items.category.includes("Photography") ||
			items.category.includes("Wearables")
	);

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

export default Electronics;
