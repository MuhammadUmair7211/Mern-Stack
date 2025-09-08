import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
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
	const [user, setUser] = useState({});
	const [token, setToken] = useState(null);
	const isCartPage = location.pathname === "/cart";
	const buttonText = isCartPage ? "Proceed to Checkout" : " Place Order";
	const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
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
			console.log(orders);

			clearCart();
			navigate("/orders");
		}
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
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
