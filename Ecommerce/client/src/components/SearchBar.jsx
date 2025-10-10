import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { IoNotificationsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
const SearchBar = () => {
	return (
		<div className="px-4 md:px-8 lg:px-18 py-2 border-b border-b-gray-300">
			<div className="flex items-center justify-between md:gap-4">
				<Link
					to="/"
					className="text-xl lg:text-3xl font-bold flex items-center gap-2"
				>
					<span className="font-vibes text-3xl lg:text-5xl">S</span>
					hopValley.com
				</Link>
				<div className="hidden lg:flex items-center border border-gray-300 text-gray-500 px-4 py-1.5 max-w-screen-2xl w-full rounded-lg mx-6">
					<select className="max-w-[150px] w-full">
						<option hidden>All Category</option>
						<option value="">Electronics</option>
						<option value="">books</option>
						<option value="">food</option>
					</select>
					<div className="w-full flex items-center gap-2 ms-2 ps-2 border-l border-l-gray-500">
						<CiSearch className="text-xl text-gray-500 lg:text-3xl" />
						<input
							type="search"
							placeholder="Search product or brand here..."
							className="flex-1 outline-none "
						/>
					</div>
				</div>
				<div className="hidden w-full md:flex lg:hidden items-center gap-2 py-1.5 rounded-full px-2 border border-gray-300">
					<CiSearch className="text-xl text-gray-500 lg:text-3xl" />
					<input
						type="search"
						placeholder="Search product or brand here..."
						className="flex-1 outline-none "
					/>
				</div>

				<div className="flex items-center gap-2">
					<HiShoppingBag className="text-xl text-gray-500 lg:text-3xl" />
					<IoNotificationsSharp className="text-xl text-gray-500 lg:text-3xl" />
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
