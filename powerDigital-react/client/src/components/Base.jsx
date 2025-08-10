import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { GiMining } from "react-icons/gi";
import { GiCardPlay } from "react-icons/gi";
import { FaBalanceScale } from "react-icons/fa";
const Base = () => {
	const navItems = [
		{ path: "/home", label: "Home", icon: <FaHome /> },
		{ path: "/market", label: "Market", icon: <FaShop /> },
		{ path: "/mining", label: "Mining", icon: <GiMining /> },
		{ path: "/contract", label: "Contract", icon: <GiCardPlay /> },
		{ path: "/assets", label: "Assets", icon: <FaBalanceScale /> },
	];

	return (
		<div className="fixed bottom-0 h-14 w-full bg-gray-800 text-white p-2 z-50">
			<div className="flex items-center justify-around">
				{navItems.map(({ path, label, icon }) => (
					<NavLink
						key={path}
						to={path}
						className={({ isActive }) =>
							`flex flex-col items-center text-sm ${
								isActive ? "text-yellow-400" : "text-white"
							}`
						}
					>
						<span className="text-xl">{icon}</span>
						<span>{label}</span>
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default Base;
