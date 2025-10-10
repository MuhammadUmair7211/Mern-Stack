import { useSelector } from "react-redux";
import LinkSection from "../components/LinkSection";
import ProductCard from "../components/ProductCard";

const ToysAndBaby = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter(
		(items) =>
			items.category.includes("Toys & Games") ||
			items.category.includes("Diapers & Wipes") ||
			items.category.includes("Baby Gear") ||
			items.category.includes("Safety & Health") ||
			items.category.includes("Bath & Body") ||
			items.category.includes("Nursery Furniture") ||
			items.category.includes("Strollers & Car Seats") ||
			items.category.includes("Feeding Essentials") ||
			items.category.includes("Baby Clothing")
	);
	const links = [
		{
			name: "Baby Clothing",
			path: "/toys-babies/baby-clothing",
		},
		{
			name: "Toys & Games",
			path: "/toys-babies/toys-games",
		},
		{
			name: "Feeding Essentials",
			path: "/toys-babies/feeding-essentials",
		},
		{
			name: "Diapers & Wipes",
			path: "/toys-babies/diapers-wipes",
		},
		{
			name: "Nursery Furniture",
			path: "/toys-babies/nursery-furniture",
		},
		{
			name: "Baby Gear",
			path: "/toys-babies/baby-gear",
		},
		{
			name: "Bath & Body",
			path: "/toys-babies/bath-body",
		},
		{
			name: "Safety & Health",
			path: "/toys-babies/safety-health",
		},
		{
			name: "Strollers & Car Seats",
			path: "/toys-babies/strollers-car-seats",
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

export default ToysAndBaby;
