import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Owner from "./pages/Owner";
import RoomDetails from "./pages/RoomDetails";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import MyBookings from "./pages/MyBookings";

const App = () => {
	const location = useLocation();
	const showNavbar = location.pathname.includes("owner");
	return (
		<div>
			{!showNavbar && <Navbar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/rooms" element={<AllRooms />} />
				<Route path="/experience" element={<Experience />} />
				<Route path="/about" element={<About />} />
				<Route path="/owner" element={<Owner />} />
				<Route path="/room-details/:id" element={<RoomDetails />} />
				<Route path="my-bookings" element={<MyBookings />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
