import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
	const [isOwner, setIsOwner] = useState(false);
	const [showHotelReg, setShowHotelReg] = useState(false);
	const [searchedCities, setSearchedCities] = useState([]);
	const currency = import.meta.env.VITE_CURRENCY || "$";
	const navigate = useNavigate();
	const { user } = useUser();
	const { getToken } = useAuth();

	const fetchUser = async () => {
		try {
			const { data } = await axios.get("/api/user", {
				headers: {
					Authorization: `Bearer ${await getToken()}`,
				},
			});
			console.log(data);

			if (data.success) {
				setIsOwner(data.role === "owner");
				setSearchedCities(data.recentSearchedCities);
			} else {
				setTimeout(() => fetchUser(), 5000);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};
	useEffect(() => {
		if (user) {
			fetchUser();
		}
	}, [user]);
	const value = {
		currency,
		navigate,
		user,
		isOwner,
		setIsOwner,
		showHotelReg,
		setShowHotelReg,
		getToken,
		axios,
		searchedCities,
		setSearchedCities,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
