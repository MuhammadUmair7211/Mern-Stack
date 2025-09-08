import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import SideBar from "./SideBar";

const Layout = () => {
	return (
		<div className="flex flex-col h-screen">
			<Nav />
			<div className="flex">
				<SideBar />
				<div className="flex-1 md:px-16 ">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
