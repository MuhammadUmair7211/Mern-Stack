import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useApp } from "../context/AppContext";

const Sidebar = () => {
	const navigate = useNavigate();
	const { setShowSideBar } = useApp();
	return (
		<div className="px-6 py-10">
			<button
				onClick={() => setShowSideBar(false)}
				className="flex items-center gap-2 text-gray-500 hover:scale-110 duration-300"
			>
				{" "}
				<img
					src={assets.dropdown_icon}
					alt="back"
					className="rotate-180 w-2.5"
				/>
				Back
			</button>
			{/* Links */}
			<div className="mt-8 flex flex-col items-center gap-4 uppercase font-medium text-sm text-gray-600">
				{[
					{ name: "Home", path: "/" },
					{ name: "Collection", path: "/collection" },
					{ name: "About", path: "/about" },
					{ name: "Contact", path: "/contact" },
				].map((link) => (
					<NavLink
						onClick={() => setShowSideBar(false)}
						key={link.name}
						to={link.path}
						className=" pb-3 hover:bg-black hover:text-white w-full duration-300 px-4 py-2"
					>
						{link.name}
					</NavLink>
				))}

				<button
					onClick={() => navigate("/admin-login")}
					className="px-5 py-2 hover:bg-gray-200 duration-300 cursor-pointer rounded-full border border-gray-200 text-xs font-semibold mb-2"
				>
					Admin Panel
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
