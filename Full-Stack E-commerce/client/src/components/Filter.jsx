import { useApp } from "../context/AppContext";

const Filter = () => {
	const { selectedFilters, setSelectedFilters } = useApp();
	const filterList = [
		{ category: "CATEGORIES", name: ["Men", "Women", "Kids"] },
		{ category: "TYPE", name: ["Top Wear", "Bottom Wear", "Winter Wear"] },
	];
	const handleCheckboxChange = (category, value) => {
		setSelectedFilters((prev) => {
			const prevCategory = prev[category] || [];
			if (prevCategory.includes(value)) {
				// if already selected → remove it
				return {
					...prev,
					[category]: prevCategory.filter((v) => v !== value),
				};
			} else {
				// if not selected → add it
				return {
					...prev,
					[category]: [...prevCategory, value],
				};
			}
		});
	};

	return (
		<div>
			<h1 className="py-4 text-lg">FILTERS</h1>
			<div className="flex flex-col gap-4 max-w-[250px]">
				{filterList.map((list, index) => {
					return (
						<div key={index} className="border border-gray-300 p-4">
							<p>{list.category}</p>

							{list.name.map((l, i) => {
								return (
									<div key={i} className="flex items-center gap-2 mt-2">
										<input
											type="checkbox"
											id={`${list.category}-${l}`}
											checked={
												selectedFilters[list.category]?.includes(l) || false
											}
											onChange={() => handleCheckboxChange(list.category, l)}
										/>
										<label
											htmlFor={`${list.category}-${l}`}
											className="text-gray-600 font-light text-sm cursor-pointer"
										>
											{l}
										</label>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
			<pre className="mt-4 text-sm text-gray-600">
				{JSON.stringify(selectedFilters, null, 2)}
			</pre>
		</div>
	);
};

export default Filter;
