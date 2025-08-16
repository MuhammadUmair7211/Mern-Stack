import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const SideBar = () => {
	const list = [
		{ icon: assets.dashboardIcon, name: "Dashboard", path: "/owner" },
		{ icon: assets.addIcon, name: "Add Room", path: "/owner/add-room" },
		{ icon: assets.listIcon, name: "List Room", path: "/owner/list-room" },
	];

	return (
		<div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
			{list.map((li, index) => {
				return (
					<NavLink
						to={li.path}
						end="/owner"
						key={index}
						className={({ isActive }) =>
							`flex items-center py-3 px-4 md:px-8 gap-3 ${
								isActive
									? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600"
									: "hover:bg-gray-100/90 border-white text-gray-700"
							}`
						}
					>
						<img src={li.icon} alt="icon" className="w-6 h-6" />
						<p className="hidden md:block">{li.name}</p>
					</NavLink>
				);
			})}
		</div>
	);
};

export default SideBar;
