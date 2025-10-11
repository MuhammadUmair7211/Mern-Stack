const CategorySection = ({
	category,
	index,
	selectedCategory,
	setSelectedCategory,
}) => {
	return (
		<button
			key={index}
			onClick={() => setSelectedCategory(category)}
			className={`px-3 py-1 rounded cursor-pointer text-xs hover:bg-black hover:text-white duration-300 ${
				selectedCategory === category ? "bg-black text-white" : "bg-white"
			}`}
		>
			{category}
		</button>
	);
};

export default CategorySection;
