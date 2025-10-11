import { Link, useNavigate } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { IoNotificationsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
const SearchBar = () => {
	const state = useSelector((state) => state.cart.cartItems);
	const totalQuantity = state.reduce(
		(total, items) => total + items.quantity,
		0
	);
	const navigate = useNavigate();

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
					<div className="w-full flex items-center gap-2">
						<CiSearch className="text-xl text-gray-500 lg:text-3xl" />
						<input
							type="search"
							placeholder="Search product or brand here..."
							className="flex-1 outline-none border-none"
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
					<div
						onClick={() => navigate("/cart")}
						className="relative cursor-pointer"
					>
						<HiShoppingBag className="text-xl text-gray-500 lg:text-3xl" />
						<span className="absolute -top-2 -right-2 flex items-center justify-center text-sm text-white bg-gray-500 w-5 h-5 md:w-6 md:h-6 rounded-full">
							{totalQuantity}
						</span>
					</div>
					<IoNotificationsSharp className="text-xl text-gray-500 lg:text-3xl" />
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
