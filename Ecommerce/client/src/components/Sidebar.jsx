import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../store/features/uiSliceReducer";
const Sidebar = () => {
	const showSideBar = useSelector((state) => state.ui.showSideBar);
	const dispatch = useDispatch();
	const links = [
		{ path: "/about", name: "About ShopValley" },
		{ path: "/care", name: "ShopValley Care" },
		{ path: "/promo", name: "Promo" },
	];
	return (
		<div className="relative z-50">
			<IoMdClose
				onClick={() => dispatch(toggleSideBar())}
				className="fixed top-3 right-8 z-50 text-2xl text-white"
			/>
			{/* Sidebar */}
			<div
				className={`fixed top-0 right-0 h-full flex flex-col items-start bg-gray-400 p-8 transform transition-transform duration-500 ${
					showSideBar ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex flex-col space-y-6 mt-10">
					{links.map((link, index) => (
						<Link
							key={index}
							to={link.path}
							className="text-xl text-white hover:text-blue-500 duration-300"
						>
							{link.name}
						</Link>
					))}
				</div>
				<div className="w-full py-1 mt-4 rounded-md flex items-center gap-2 ps-2 border border-white">
					<CiSearch className="text-3xl text-white border-r border-gray-300 pe-2" />
					<input
						type="search"
						placeholder="Search product or brand here..."
						className="flex-1 outline-none text-white cursor-pointer"
					/>
				</div>

				<div className="flex justify-center flex-wrap space-x-4 mt-10">
					<button className="px-6 py-2 cursor-pointer duration-300 bg-blue-600 text-white rounded-md hover:bg-blue-700">
						Sign Up
					</button>
					<button className="px-6 py-2 cursor-pointer duration-300 bg-green-600 text-white rounded-md hover:bg-green-700">
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
