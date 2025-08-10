import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const UserContext = createContext();
export const useUser = () => {
	return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [deposits, setDeposits] = useState([]);
	const fetchDeposits = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				console.error("No token found. User may not be logged in.");
				return;
			}

			const res = await fetch(
				"http://localhost:3000/api/userDeposit/user-deposit",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!res.ok) {
				throw new Error(`Failed to fetch deposits: ${res.statusText}`);
			}
			const data = await res.json();
			setDeposits(data);
		} catch (err) {
			console.error("Error fetching deposits:", err);
		}
	};

	useEffect(() => {
		fetchDeposits();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;
		fetch("http://localhost:3000/api/allUser/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setUser(data.user);
			});
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser, deposits, setDeposits }}>
			{children}
		</UserContext.Provider>
	);
};
