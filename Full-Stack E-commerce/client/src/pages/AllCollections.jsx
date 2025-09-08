import { assets } from "../assets/frontend_assets/assets";
import Filter from "../components/Filter";
import ProductItems from "../components/ProductItems";
import { useApp } from "../context/AppContext";

const AllCollections = () => {
	const {
		showSearchBar,
		setShowSearchBar,
		searchCollection,
		setSearchCollection,
		filteredProducts,
		filterByPrice,
		setFilterByPrice,
	} = useApp();

	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
			{showSearchBar && (
				<div className="bg-gray-100 border-b border-gray-300 border-t py-6">
					<div className="flex items-center justify-center">
						<div className="flex items-center gap-3 max-w-3xl w-full">
							{/* Search Bar */}
							<form className="px-4 py-2 border border-gray-400 flex items-center justify-between w-full rounded-full">
								<input
									type="search"
									placeholder="Search"
									value={searchCollection}
									onChange={(e) => setSearchCollection(e.target.value)}
									className="flex-1 outline-none"
								/>
								<img
									src={assets.search_icon}
									alt="search-icon"
									className="w-5"
								/>
							</form>

							{/* Delete Icon */}
							<img
								onClick={() => setShowSearchBar(false)}
								src={assets.cross_icon}
								alt="delete"
								className="w-4 cursor-pointer"
							/>
						</div>
					</div>
				</div>
			)}
			<div className="flex mt-4">
				<div className="w-[250px] hidden md:block">
					<Filter />
				</div>
				<div className="flex-1 py-4 px-8">
					<div className="flex items-center justify-between mb-8">
						<div>
							<p className="flex flex-col md:flex-row items-center gap-2 text-lg md:text-2xl">
								<span className="text-gray-500">ALL</span>
								<span className="text-gray-700 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-semibold flex items-center gap-2">
									COLLECTIONS
								</span>
							</p>
						</div>
						<div>
							<select
								value={filterByPrice}
								onChange={(e) => setFilterByPrice(e.target.value)}
								className="border border-gray-300 px-6 py-2 cursor-pointer outline-none"
							>
								<option hidden>Filter by Price</option>
								<option value="LowToHigh">Low to High</option>
								<option value="HighToLow">High to Low</option>
							</select>
						</div>
					</div>
					<div>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
							{filteredProducts.map((product) => {
								return <ProductItems product={product} key={product._id} />;
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllCollections;
