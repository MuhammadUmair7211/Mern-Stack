import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import LinkSection from "../components/LinkSection";

const BeautyAndHealth = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter(
		(items) =>
			items.category.includes("Beauty") || items.category.includes("Health")
	);

	const links = [
		{
			name: "Skincare",
			path: "/beauty-health/skin-care",
		},
		{
			name: "Hair Care",
			path: "/beauty-health/hair-care",
		},
		{
			name: "Makeup",
			path: "/beauty-health/makeup",
		},
		{
			name: "Fragrances",
			path: "/beauty-health/fragrances",
		},
		{
			name: "Health & Wellness",
			path: "/beauty-health/health-wellness",
		},
		{
			name: "Personal Care",
			path: "/beauty-health/personal-care",
		},
		{
			name: "Fitness & Lifestyle",
			path: "/beauty-health/fitness-lifestyle",
		},
		{
			name: "Natural & Organic",
			path: "/beauty-health/natural-organic",
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

export default BeautyAndHealth;
