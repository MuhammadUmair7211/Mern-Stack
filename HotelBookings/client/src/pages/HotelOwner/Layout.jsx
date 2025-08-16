import { Outlet } from "react-router-dom";
import Navbar from "../../components/HotelOwner/Navbar";
import SideBar from "../../components/HotelOwner/SideBar";

const Layout = () => {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<div className="flex h-full">
				<SideBar />
				<div className="flex-1 md:px-10 h-full">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Layout;
