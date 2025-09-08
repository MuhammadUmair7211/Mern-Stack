import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useApp } from "../context/AppContext";

const Navbar = () => {
	const navigate = useNavigate();
	const { setShowSideBar, totalQuantity, isLoggedIn, user } = useApp();
	console.log(user);

	return (
		<nav className="flex items-center justify-between px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-5">
			{/* Logo */}
			<div>
				<Link to="/">
					<img
						src={assets.logo}
						alt="logo"
						className="w-[130px] md:w-[145px]"
					/>
				</Link>
			</div>

			{/* Links */}
			<div className="hidden md:flex items-center gap-5 uppercase font-medium text-sm text-gray-600">
				{[
					{ name: "Home", path: "/" },
					{ name: "Collection", path: "/all-collections" },
					{ name: "About", path: "/about" },
					{ name: "Contact", path: "/contact" },
				].map((link) => (
					<NavLink key={link.name} to={link.path}>
						{({ isActive }) => (
							<div className="flex flex-col items-center gap-1">
								<span>{link.name}</span>
								<div
									className={`w-6 h-[1px] transition-colors ${
										isActive ? "bg-gray-600" : "bg-white"
									}`}
								/>
							</div>
						)}
					</NavLink>
				))}

				<button
					onClick={() => navigate("/admin-login")}
					className="px-5 py-2 hover:bg-gray-200 duration-300 cursor-pointer rounded-full border border-gray-200 text-xs font-semibold mb-2"
				>
					Admin Panel
				</button>
			</div>

			{/* Icons */}
			<div className="flex items-center gap-6">
				<Link to="/all-collections">
					<img src={assets.search_icon} alt="search" className="w-5" />
				</Link>

				{isLoggedIn ? (
					<div className="flex items-center justify-center bg-gray-200 w-8 h-8 rounded-full">
						<p className="text-gray-800 text-sm font-medium">
							{user?.firstName[0] + user?.lastName[0]}
						</p>
					</div>
				) : (
					<Link to="/login">
						<img src={assets.profile_icon} alt="profile" className="w-5" />
					</Link>
				)}

				<Link to="/cart">
					<div className="relative">
						<img src={assets.cart_icon} alt="cart" className="w-5" />

						<span className="bg-black w-4 h-4 text-[10px] text-white flex items-center justify-center rounded-full absolute -bottom-1 -right-1">
							{totalQuantity}
						</span>
					</div>
				</Link>
			</div>
			{/* mobile menu icon */}
			<div className="block md:hidden">
				<img
					onClick={() => setShowSideBar(true)}
					src={assets.menu_icon}
					alt="menu"
					className="w-6 cursor-pointer hover:scale-110 duration-300"
				/>
			</div>
		</nav>
	);
};

export default Navbar;
