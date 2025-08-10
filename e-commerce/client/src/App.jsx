import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import CheckOut from "./pages/CheckOut";
import Thanks from "./pages/Thanks";
import Login from "./components/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./components/Register";
import ProductFormUpload from "./pages/ProductFormUpload";
import ProductRemove from "./pages/ProductRemove";
import OrderDetails from "./pages/OrderDetails";
function App() {
	const location = useLocation();
	const adminRoute =
		location.pathname === "/admin-dashboard" ||
		location.pathname === "/product-form-upload" ||
		location.pathname === "/product-remove" ||
		location.pathname === "/order-details";
	return (
		<div className="min-h-screen">
			{!adminRoute && <Navbar />}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/about" element={<About />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/check-out" element={<CheckOut />} />
				<Route path="/thank-you" element={<Thanks />} />
				<Route path="/admin-dashboard" element={<AdminDashboard />} />
				<Route path="/product-form-upload" element={<ProductFormUpload />} />
				<Route path="/product-remove" element={<ProductRemove />} />
				<Route path="/order-details" element={<OrderDetails />} />
			</Routes>
			{!adminRoute && <Footer />}
		</div>
	);
}

export default App;
