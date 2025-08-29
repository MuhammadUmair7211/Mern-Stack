import { Outlet } from "react-router-dom";
import Navbar from "../../components/HotelOwner/Navbar";
import SideBar from "../../components/HotelOwner/SideBar";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
const Layout = () => {
	const { isOwner, navigate } = useAppContext();

	useEffect(() => {
		if (!isOwner) {
			navigate("/");
		}
	}, [isOwner]);
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<div className="flex h-full">
				<SideBar />
				<div className="flex-1 md:px-10 h-full">
					<Outlet />
				</div>
				0-
			</div>
		</div>
	);
};

export default Layout;
