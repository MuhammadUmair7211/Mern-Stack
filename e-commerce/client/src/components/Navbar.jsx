import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
	const { cartItems, setCartItems } = useCart();
	const user = useAuth();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const totalQuantity = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);

	const getLinkClass = ({ isActive }) =>
		isActive
			? "text-indigo-600 font-semibold text-xl underline mb-2"
			: "text-gray-700 hover:text-indigo-600 duration-300";

	const handleLogout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("cartItems");
		setCartItems([]);
		navigate("/");
	};

	return (
		<header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
			<nav className="flex items-center justify-between px-6 md:px-16 py-4 h-16">
				<Link to="/" className="flex items-center">
					<img src="logo.png" alt="Logo" className="h-16" />
					<span className="font-bold text-lg text-indigo-600">My Store</span>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden sm:flex items-center gap-8">
					<NavLink to="/" className={getLinkClass}>
						Home
					</NavLink>
					<NavLink to="/products" className={getLinkClass}>
						Products
					</NavLink>
					<NavLink to="/about" className={getLinkClass}>
						About
					</NavLink>
					{/* Cart */}
					<Link to="/cart" className="relative">
						<svg
							width="20"
							height="20"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="text-indigo-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M9 21h6"
							/>
						</svg>
						<span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
							{totalQuantity}
						</span>
					</Link>

					{/* Auth */}
					{user ? (
						<div className="flex items-center gap-3">
							<span className="text-sm text-gray-600">Hi, {user.name}</span>

							<button
								onClick={handleLogout}
								className="text-red-500 hover:underline flex items-center text-sm cursor-pointer duration-300"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 text-red-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21H13.5a2.25 2.25 0 002.25-2.25V15m3-3h-8.25m0 0l3-3m-3 3l3 3"
									/>
								</svg>
								Logout
							</button>
						</div>
					) : (
						<button
							onClick={() => navigate("/login")}
							className="bg-indigo-500 text-white px-5 py-1.5 rounded-full hover:bg-indigo-600 transition text-sm cursor-pointer"
						>
							Login
						</button>
					)}
				</div>
				<div className="flex items-center md:hidden gap-4">
					<Link to="/cart" className="relative">
						<svg
							width="20"
							height="20"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="text-indigo-600"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M9 21h6"
							/>
						</svg>
						<span className="absolute -top-2 -right-2 text-xs bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
							{totalQuantity}
						</span>
					</Link>
					{/* Hamburger */}
					<button onClick={() => setOpen(!open)} className="sm:hidden">
						<svg
							className="w-6 h-6 text-gray-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</nav>

			{/* Mobile Menu */}
			{open && (
				<div className="sm:hidden flex flex-col bg-white px-6 pb-4 shadow-md">
					<NavLink to="/" className={getLinkClass}>
						Home
					</NavLink>
					<NavLink to="/products" className={getLinkClass}>
						Products
					</NavLink>
					<NavLink to="/about" className={getLinkClass}>
						About
					</NavLink>
					{user ? (
						<>
							<p className="mt-2 text-sm text-gray-600">Hi, {user.name}</p>
							<button
								onClick={handleLogout}
								className="text-red-500 mt-1 text-sm"
							>
								Logout
							</button>
						</>
					) : (
						<button
							onClick={() => {
								setOpen(false);
								navigate("/login");
							}}
							className="mt-3 bg-indigo-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-indigo-600"
						>
							Login
						</button>
					)}
				</div>
			)}
		</header>
	);
};

export default Navbar;
