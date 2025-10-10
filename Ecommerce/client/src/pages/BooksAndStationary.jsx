import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const BooksAndStationary = () => {
	const productDetails = useSelector((state) => state.product.products);
	const filteredItems = productDetails.filter(
		(items) =>
			items.category.includes("Books") || items.category.includes("Stationery")
	);
	const links = [
		{
			name: "Academic & Textbooks",
			path: "/books-stationery/academic",
		},

		{
			name: "Pens, Pencils & Markers",
			path: "/books-stationery/pens-markers",
		},
		{
			name: "Notebooks & Diaries",
			path: "/books-stationery/notebooks",
		},

		{
			name: "Files & Folders",
			path: "/books-stationery/files-folders",
		},

		{
			name: "Staplers & Tape Dispensers",
			path: "/books-stationery/staplers",
		},
		{
			name: "Rulers, Scissors & Cutters",
			path: "/books-stationery/tools",
		},

		{
			name: "Paints & Brushes",
			path: "/books-stationery/paints-brushes",
		},
		{
			name: "Sketchbooks & Canvases",
			path: "/books-stationery/sketchbooks",
		},

		{
			name: "Whiteboards & Markers",
			path: "/books-stationery/whiteboards",
		},
	];

	return (
		<div className="px-4 md:px-8 lg:px-18 py-2">
			<div className="flex items-center flex-wrap justify-between gap-2 bg-gray-200 mb-4">
				{links.map((link, index) => {
					return (
						<Link
							to={link.path}
							key={index}
							className="bg-black text-sm rounded-md text-white px-4 py-1"
						>
							{link.name}
						</Link>
					);
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

export default BooksAndStationary;
