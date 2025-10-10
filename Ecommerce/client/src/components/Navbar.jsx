import { MdOutlineInstallMobile } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../store/features/uiSliceReducer";
const Navbar = () => {
	const dispatch = useDispatch();
	const links = [
		{ path: "/", name: "Home" },
		{ path: "/about", name: "About ShopValley" },
		{ path: "/care", name: "ShopValley Care" },
		{ path: "/promo", name: "Promo" },
	];
	return (
		<div className="px-4 md:px-8 lg:px-18 py-2 border-b border-b-gray-300">
			<div className="flex items-center justify-between text-sm font-medium text-gray-500">
				<Link to="/" className="flex items-center gap-1">
					<MdOutlineInstallMobile className="text-lg" />{" "}
					<span>Download ShopValley app</span>
				</Link>
				<div className="hidden lg:flex items-center space-x-4">
					<div className="flex items-center space-x-5">
						{links.map((link, index) => {
							return (
								<NavLink key={index} to={link.path}>
									{link.name}
								</NavLink>
							);
						})}
					</div>
					<div className="flex items-center space-x-4 text-black">
						<button className="ps-6 border-l border-l-gray-400">Sign Up</button>
						<button className="ps-6 border-l border-l-gray-400">Login</button>
					</div>
				</div>
				<div className="lg:hidden">
					<FaBars
						onClick={() => dispatch(toggleSideBar())}
						className="text-xl cursor-pointer hover:text-gray-400 duration-300"
					/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
