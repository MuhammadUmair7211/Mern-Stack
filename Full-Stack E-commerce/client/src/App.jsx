import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./adminPages/AdminLogin";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Products from "./pages/Products";
import Layout from "./adminPages/Layout";
import AddItems from "./adminPages/AddItems";
import ListItems from "./adminPages/ListItems";
import AllCollections from "./pages/AllCollections";
import Footer from "./components/Footer";
import { useEffect } from "react";
import PlaceOrder from "./pages/PlaceOrder";
import ViewOrders from "./adminPages/ViewOrders";
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";
const App = () => {
	const { showSideBar } = useApp();
	const location = useLocation();
	const showNavbar = location.pathname.includes("/admin");
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<div>
			{showSideBar && <Sidebar />}
			{!showSideBar && (
				<>
					<Toaster position="top-right" />
					{!showNavbar && <Navbar />}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/collection" element={<Collection />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/admin-login" element={<AdminLogin />} />
						<Route path="/products/:id" element={<Products />} />
						<Route path="/login" element={<Login />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/all-collections" element={<AllCollections />} />
						<Route path="/place-order" element={<PlaceOrder />} />
						<Route path="/orders" element={<Orders />} />
						<Route path="/admin" element={<Layout />}>
							<Route index element={<AddItems />} />
							<Route path="/admin/list-items" element={<ListItems />} />
							<Route path="/admin/view-orders" element={<ViewOrders />} />
						</Route>
					</Routes>
					<Footer />
				</>
			)}
		</div>
	);
};

export default App;
