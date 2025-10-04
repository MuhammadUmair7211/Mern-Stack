import { useApp } from "../contexts/AppContext";

const SearchByDate = () => {
	const { filter, setFilter } = useApp();
	return (
		<div className="w-full">
			<label htmlFor="search" className="text-sm block mb-2">
				Search posts by Date:
			</label>
			<input
				id="search"
				type="date"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				className="w-full p-2 shadow-[0_0_5px_0] text-sm outline-none"
			/>
		</div>
	);
};

export default SearchByDate;
