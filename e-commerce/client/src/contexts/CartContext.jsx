import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
	const [input, setInput] = useState("");
	const [cartItems, setCartItems] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [products, setProducts] = useState([]);
	useEffect(() => {
		fetch("http://localhost:3000/api/products")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);
	useEffect(() => {
		const storedCart = localStorage.getItem("cartItems");
		if (storedCart) {
			setCartItems(JSON.parse(storedCart));
		}
	}, []);
	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);
	const addToCart = (p) => {
		setCartItems((prevItems) => {
			const existingItems = prevItems.find((item) => item._id === p._id);
			if (existingItems) {
				return prevItems.map((item) =>
					item._id === p._id ? { ...item, quantity: item.quantity + 1 } : item
				);
			} else {
				return [...prevItems, { ...p, quantity: 1 }];
			}
		});
	};
	const removeFromCart = (item) => {
		setCartItems((prevItems) => prevItems.filter((i) => i._id !== item._id));
		return item;
	};
	const removeProduct = async (id) => {
		if (!window.confirm("Are you sure you want to remove this product?"))
			return;

		try {
			const res = await fetch(`http://localhost:3000/api/products/${id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (res.ok) {
				alert("Product deleted successfully");
				setProducts((prev) => prev.filter((p) => p._id !== id));
			} else {
				alert(data.message || "Failed to delete");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<CartContext.Provider
			value={{
				addToCart,
				removeFromCart,
				cartItems,
				isLoggedIn,
				setIsLoggedIn,
				products,
				setCartItems,
				removeProduct,
				input,
				setInput,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
