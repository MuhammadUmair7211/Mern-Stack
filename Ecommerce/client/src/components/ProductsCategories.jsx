import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const ProductsCategories = () => {
	const links = [
		{
			path: "/beauty-health",
			name: "Beauty & Health",
			icon: assets.beautyHealthLogo,
		},
		{
			path: "/books-stationery",
			name: "Books & Stationary",
			icon: assets.booksStationaryLogo,
		},
		{
			path: "/electronics-accessories",
			name: "Electronics",
			icon: assets.electronicsLogo,
		},
		{
			path: "/fashion-apparel",
			name: "Fashion & Apparel",
			icon: assets.fashionApparelLogo,
		},
		{
			path: "/groceries-food",
			name: "Groceries & Food",
			icon: assets.groceriesFoodLogo,
		},
		{
			path: "/home-kitchen",
			name: "Home & Kitchen",
			icon: assets.homeKitchenLogo,
		},
		{
			path: "/sports-fitness",
			name: "Sports & Fitness",
			icon: assets.sportsFitnessLogo,
		},
		{
			path: "/toys-baby",
			name: "Toys & Baby",
			icon: assets.toysBabyLogo,
		},
	];

	return (
		<div className="px-2 py-4">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
				{links.map((link, index) => (
					<Link
						key={index}
						to={link.path}
						className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md hover:bg-gray-200 duration-300"
					>
						<img
							src={link.icon}
							alt={link.name}
							className="w-16 h-16 object-contain mb-2"
						/>
						<span className="text-xs text-center font-medium">{link.name}</span>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ProductsCategories;
