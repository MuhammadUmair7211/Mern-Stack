import { createContext, useContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);
const AppProvider = ({ children }) => {
	const [showSideBar, setShowSideBar] = useState(false);
	const navigate = useNavigate();
	const [showSearchBar, setShowSearchBar] = useState(true);
	const [searchCollection, setSearchCollection] = useState("");
	const [cartItems, setCartItems] = useState([]);
	const location = useLocation();
	const [orders, setOrders] = useState([]);
	const [isLoginPage, setIsLoginPage] = useState(true);
	const [selectedFilters, setSelectedFilters] = useState({});
	const [filterByPrice, setFilterByPrice] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [adminEmail, setAdminEmail] = useState(null);
	const [products, setProducts] = useState([]);

	const isCartPage = location.pathname === "/cart";
	const buttonText = isCartPage ? "Proceed to Checkout" : " Place Order";
	const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
	const fetchProducts = async () => {
		const res = await fetch("http://localhost:3000/api/products", {
			method: "GET",
		});
		const data = await res.json();
		setProducts(data.allProducts);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	useEffect(() => {
		const email = localStorage.getItem("admin");
		setAdminEmail(email);
	}, [adminEmail]);
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = JSON.parse(localStorage.getItem("user"));

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(storedUser);
			setIsLoggedIn(true);
		}
	}, []);
	useEffect(() => {
		const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
		if (savedCart.length) setCartItems(savedCart);
	}, []);
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);
	useEffect(() => {
		const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
		if (savedOrders.length) setOrders(savedOrders);
	}, []);
	useEffect(() => {
		localStorage.setItem("orders", JSON.stringify(orders));
	}, [orders]);

	const filteredProducts = products
		.filter((product) => {
			const matchSearch =
				product.category
					.toLowerCase()
					.includes(searchCollection.toLowerCase()) ||
				product.subCategory
					.toLowerCase()
					.includes(searchCollection.toLowerCase()) ||
				product.name.toLowerCase().includes(searchCollection.toLowerCase());

			const matchCategory =
				!selectedFilters["CATEGORIES"]?.length ||
				selectedFilters["CATEGORIES"].includes(product.category);
			const matchType =
				!selectedFilters["TYPE"]?.length ||
				selectedFilters["TYPE"].includes(product.subCategory);
			return matchSearch && matchCategory && matchType;
		})
		.sort((a, b) => {
			if (filterByPrice === "LowToHigh") {
				return a.price - b.price;
			} else if (filterByPrice === "HighToLow") {
				return b.price - a.price;
			}
		});

	const cartItemsHandle = (newItem) => {
		setCartItems((prev) => {
			const exists = prev.find((item) => item.newItem._id === newItem._id);
			if (exists) {
				return prev.map((item) =>
					item.newItem._id === newItem._id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				return [...prev, { quantity: 1, newItem }];
			}
		});
	};
	const removeFromCart = (product) => {
		const isConfirmed = window.confirm(
			`Are you sure you want to remove ${product.newItem.name} from the cart?`
		);

		if (isConfirmed) {
			setCartItems((prev) =>
				prev.filter((item) => item.newItem._id !== product.newItem._id)
			);
		} else {
			console.log("Item not removed");
		}
	};
	const clearCart = () => {
		setCartItems([]);
		localStorage.removeItem("cart");
	};
	const handleCartReset = () => {
		if (cartItems.length === 0) {
			alert("Your cart is empty");
			return;
		}
		if (isCartPage) {
			navigate("/place-order");
		} else {
			const newOrder = { id: Date.now(), items: cartItems };
			setOrders((prev) => [...prev, newOrder]);
			clearCart();
			navigate("/orders");
		}
	};
	const handleLogout = () => {
		navigate("/login");
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		setToken(null);
		setIsLoggedIn(false);
		setShowDropdown(false);
	};

	const value = {
		showSideBar,
		setShowSideBar,
		showSearchBar,
		setShowSearchBar,
		searchCollection,
		setSearchCollection,
		filteredProducts,
		cartItems,
		cartItemsHandle,
		setCartItems,
		navigate,
		removeFromCart,
		totalQuantity,
		handleCartReset,
		buttonText,
		orders,
		isLoginPage,
		setIsLoginPage,
		selectedFilters,
		setSelectedFilters,
		filterByPrice,
		setFilterByPrice,
		isLoggedIn,
		setIsLoggedIn,
		user,
		setUser,
		token,
		setToken,
		setShowDropdown,
		showDropdown,
		handleLogout,
		setAdminEmail,
		adminEmail,
		products,
		fetchProducts,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
