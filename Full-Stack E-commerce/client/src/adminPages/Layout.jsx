import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import SideBar from "./SideBar";

const Layout = () => {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Top Navbar */}
			<Nav />

			{/* Sidebar + Content */}
			<div className="flex flex-1">
				{/* Sidebar */}
				<aside className="min-h-screen">
					<SideBar />
				</aside>

				{/* Main content */}
				<main className="flex-1 p-4 md:p-8 lg:p-12">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;
