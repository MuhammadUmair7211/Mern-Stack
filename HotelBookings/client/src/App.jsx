import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import About from "./pages/About";
import RoomDetails from "./pages/RoomDetails";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/HotelOwner/Layout";
import AddRoom from "./pages/HotelOwner/AddRoom";
import ListRoom from "./pages/HotelOwner/ListRoom";
import Dashboard from "./pages/HotelOwner/Dashboard";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";
const App = () => {
	const location = useLocation();
	const { showHotelReg } = useAppContext();
	const IsOwnerPath = location.pathname.includes("owner");
	return (
		<div>
			<Toaster />
			{!IsOwnerPath && <Navbar />}
			{showHotelReg && <HotelReg />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/rooms" element={<AllRooms />} />
				<Route path="/experience" element={<Experience />} />
				<Route path="/about" element={<About />} />
				<Route path="/owner" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="/owner/add-room" element={<AddRoom />} />
					<Route path="/owner/list-room" element={<ListRoom />} />
				</Route>
				<Route path="/room-details/:id" element={<RoomDetails />} />
				<Route path="/my-bookings" element={<MyBookings />} />
			</Routes>
			{!IsOwnerPath && <Footer />}
		</div>
	);
};

export default App;
