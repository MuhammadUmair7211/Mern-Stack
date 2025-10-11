import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CategorySection from "../components/CategorySection";

const FashionAndApparel = () => {
	const productDetails = useSelector((state) => state.product.products);

	const location = useLocation();

	const path = location.pathname.slice(1);
	const words = path.split("-");
	const firstWord = words?.[0];
	const secondWord = words?.[1];

	const filteredItems = productDetails.filter(
		(items) =>
			items.category.toLowerCase().includes(firstWord) ||
			items.category.toLowerCase().includes(secondWord)
	);

	const categories = [...new Set(filteredItems.map((item) => item.category))];

	const [selectedCategory, setSelectedCategory] = useState(null);

	// Filter products based on selected category
	const filteredProducts = selectedCategory
		? filteredItems.filter((item) => item.category === selectedCategory)
		: filteredItems;

	return (
		<div className="px-4 md:px-8 lg:px-18 py-2">
			<div className="flex items-center flex-wrap gap-2 justify-between bg-gray-200 mb-4">
				{categories.map((category, index) => {
					return (
						<CategorySection
							category={category}
							index={index}
							key={index}
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
						/>
					);
				})}
				{/* Optional: "All" button to reset filter */}
				<button
					onClick={() => setSelectedCategory(null)}
					className="px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 duration-300 text-white cursor-pointer"
				>
					All
				</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{filteredProducts.map((product, index) => (
					<ProductCard product={product} key={index} />
				))}
			</div>
		</div>
	);
};

export default FashionAndApparel;
