import { createContext, useContext, useState } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const [showSideBar, setShowSideBar] = useState(false);
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [user, setUser] = useState("Muhammad Umair7211");
	const value = {
		user,
		setUser,
		showSideBar,
		setShowSideBar,
		showEditProfile,
		setShowEditProfile,
	};
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserProvider;
