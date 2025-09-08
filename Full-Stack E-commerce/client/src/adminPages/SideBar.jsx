import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";

const SideBar = () => {
	const List = [
		{ icon: assets.add_icon, name: "Add Items", path: "/admin" },
		{ icon: assets.list_icon, name: "List Items", path: "/admin/list-items" },
		{ icon: assets.order_icon, name: "Orders", path: "/admin/view-orders" },
	];
	return (
		<div className="md:w-[350px] w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
			{List.map((li, index) => {
				return (
					<NavLink
						to={li.path}
						end="/owner"
						key={index}
						className={({ isActive }) =>
							`flex items-end py-2 px-4 md:px-8 gap-3 ${
								isActive
									? "border bg-[#ffebf5] border-red-600/30"
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
