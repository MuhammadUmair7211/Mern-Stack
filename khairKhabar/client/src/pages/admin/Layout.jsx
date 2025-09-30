import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import { CiSignpostDuo1 } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
const Layout = () => {
	const links = [
		{
			name: "All Posts",
			path: "/admin-layout",
			icon: <CiSignpostDuo1 className="text-xl lg:text-2xl" />,
		},
		{
			name: "Add New Post",
			path: "add-new-posts",
			icon: <MdOutlinePostAdd className="text-xl lg:text-2xl" />,
		},
		{
			name: "Logout",
			path: "/admin-login",
			icon: <AiOutlineLogout className="text-xl lg:text-2xl" />,
		},
	];

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Sidebar */}
			<aside className="w-14 lg:w-64 bg-gray-900 text-white lg:p-6">
				<h2 className="text-xs lg:text-2xl font-bold mb-10">Admin Panel</h2>
				<nav className="hidden lg:flex flex-col gap-2">
					{links.map((link, index) => (
						<NavLink
							key={index}
							to={link.path}
							end={link.path === "/admin-layout"} // ensures "All Posts" only highlights on exact path
							className={({ isActive }) =>
								`px-3 py-2 rounded flex items-center gap-4 duration-300 ${
									isActive
										? "bg-gray-700 text-blue-400 font-semibold"
										: "hover:bg-gray-800 text-gray-300"
								}`
							}
						>
							{link.icon} <span className="text-sm">{link.name}</span>
						</NavLink>
					))}
				</nav>
				<nav className="flex lg:hidden flex-col gap-2">
					{links.map((link, index) => (
						<NavLink
							key={index}
							to={link.path}
							end={link.path === "/admin-layout"} // ensures "All Posts" only highlights on exact path
							className={({ isActive }) =>
								`px-3 py-2 rounded transition-colors flex items-center gap-4 duration-200 ${
									isActive
										? "bg-gray-700 text-blue-400 font-semibold"
										: "hover:bg-gray-800 text-gray-300"
								}`
							}
						>
							{link.icon}
						</NavLink>
					))}
				</nav>
			</aside>

			{/* Content */}
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
