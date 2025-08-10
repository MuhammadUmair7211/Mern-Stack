import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useState } from "react";
const Navbar = ({ setShowLogin }) => {
	const location = useLocation();
	const [Open, setOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<div
			className={`flex items-center justify-between flex-wrap px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
				location.pathname === "/" ? "bg-light" : "bg-white"
			} `}
		>
			<div>
				<Link to="/">
					<img src={assets.logo} alt="Logo" className="h-8" />
				</Link>
			</div>
			<div
				className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
					Open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"
				}`}
			>
				{menuLinks.map((link, index) => {
					return (
						<Link key={index} to={link.path}>
							{link.name}
						</Link>
					);
				})}
				<div className="flex flex-col items-start md:hidden gap-4">
					<button onClick={() => navigate("/owner")} className="cursor-pointer">
						Dashboard
					</button>
					<button
						onClick={() => setShowLogin(true)}
						className="cursor-pointer px-8 py-2 bg-primary text-white hover:bg-primary-dull duration-300 rounded-lg"
					>
						Login
					</button>
				</div>
			</div>
			<div className="hidden lg:flex items-center text-sm max-w-56 border border-borderColor rounded-full px-3 py-1">
				<input
					type="search"
					placeholder="Search cars"
					className="outline-none px-2 py-1.5 bg-transparent placeholder-gray-600 w-full"
				/>
				<img src={assets.search_icon} alt="search icon" />
			</div>
			<div className="hidden md:flex md:flex-row md:items-center sm:gap-8">
				<button onClick={() => navigate("/owner")} className="cursor-pointer">
					Dashboard
				</button>
				<button
					onClick={() => setShowLogin(true)}
					className="cursor-pointer px-8 py-2 bg-primary text-white hover:bg-primary-dull duration-300 rounded-lg"
				>
					Login
				</button>
			</div>
			<button className="sm:hidden" onClick={() => setOpen(!Open)}>
				<img src={Open ? assets.close_icon : assets.menu_icon} alt="menu" />
			</button>
		</div>
	);
};

export default Navbar;
