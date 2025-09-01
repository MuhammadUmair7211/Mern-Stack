import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
	const [showSideBar, setShowSideBar] = useState(false);
	const [showEditProfile, setShowEditProfile] = useState(false);
	const [user, setUser] = useState(null);
	const [selectChat, setSelectChat] = useState(null);
	const [search, setSearch] = useState("");
	const [allUsers, setAllUsers] = useState([]);
	const [imageUpload, setImageUpload] = useState(null);

	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [allMessages, setAllMessages] = useState([]);

	useEffect(() => {
		const fetchAllMessages = async () => {
			if (!user?._id || !selectChat?._id) return;

			const res = await fetch(
				`http://localhost:3000/api/messages/${user._id}/${selectChat._id}`
			);
			const data = await res.json();
			console.log(data.messages);
			setAllMessages(data.messages);
		};
		fetchAllMessages();
	}, [selectChat, user]);
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (!newMessage.trim()) return;
		const formData = new FormData();
		formData.append("text", newMessage);
		formData.append("senderId", user._id);
		formData.append("receiverId", selectChat._id);
		if (imageUpload) {
			formData.append("image", imageUpload);
		}
		const res = await fetch("http://localhost:3000/api/messages", {
			method: "POST",
			body: formData,
		});
		const data = await res.json();
		console.log(data);

		setMessages((prevMessage) => [
			...prevMessage,
			{
				text: newMessage,
				sender: user.username,
				receiver: selectChat.username,
				time: new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				}),
				image: imageUpload ? URL.createObjectURL(imageUpload) : null,
			},
		]);
		setNewMessage("");
		setImageUpload(null);
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) return;

				const res = await fetch("http://localhost:3000/api/auth/me", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await res.json();

				if (res.ok) {
					toast.success(data.message);
					setUser(data.user);
				} else {
					toast.error(data.message);
				}
			} catch (err) {
				toast.error("Failed to fetch profile", err);
			}
		};
		fetchUser();
	}, []);
	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const res = await fetch("http://localhost:3000/api/auth/allUsers", {
					method: "GET",
				});
				const data = await res.json();
				setAllUsers(data.users);
			} catch (error) {
				console.log(error);
				toast.error(error);
			}
		};
		fetchAllUsers();
	}, []);
	const logout = () => {
		console.log("logout");
		localStorage.removeItem("token");
		setUser(null);
		toast.info("Logged out successfully");
		location.href = "/";
	};
	const value = {
		user,
		setUser,
		showSideBar,
		setShowSideBar,
		showEditProfile,
		setShowEditProfile,
		logout,
		selectChat,
		setSelectChat,
		allUsers,
		search,
		messages,
		setSearch,
		handleFormSubmit,
		newMessage,
		setNewMessage,
		allMessages,
		imageUpload,
		setImageUpload,
	};
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserProvider;
