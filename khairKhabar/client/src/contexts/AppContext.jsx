import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);
	const [followers, setFollowers] = useState([]);
	const [filter, setFilter] = useState("");
	const [showSideBar, setShowSideBar] = useState(false);
	const [hadith, setHadith] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const { pathname } = useLocation();
	const [text, setText] = useState(() => {
		return localStorage.getItem("text");
	});
	useEffect(() => {
		localStorage.setItem("text", text);
	}, [text]);
	const fetchAllUsers = async () => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch("http://localhost:3000/api/user/all-users", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();
			setFollowers(data.registeredUsers);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		fetchAllUsers();
	}, []);

	const fetchPosts = async () => {
		setLoading(true);
		try {
			const res = await fetch("http://localhost:3000/api/post/get-all-posts", {
				method: "GET",
			});
			const data = await res.json();
			setPosts(data.posts);
			setLoading(false);
		} catch (error) {
			console.error(error.message);
		}
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	useEffect(() => {
		fetch(
			"https://hadithapi.com/api/hadiths?apiKey=$2y$10$5wzkFmg8nxq4k2sFJeBNHoO3hLz7CTdF4rpMMCfcEVhsxEg05e&language=urdu"
		)
			.then((res) => res.json())
			.then((data) => {
				const hadithsData = data.hadiths.data;
				setHadith(hadithsData);
			});
	}, []);
	const filteredByDate = (date) => {
		if (!date) return posts;
		const newDate = new Date(date);

		return posts.filter(
			(post) =>
				new Date(post.createdAt).toDateString() === newDate.toDateString()
		);
	};
	const filteredPosts = filteredByDate(filter);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user1) => {
			if (user1) {
				const currentUser = {
					id: user1.uid,
					username: user1.displayName,
					email: user1.email,
				};
				setUser(currentUser);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const toggleLike = async (postId) => {
		const res = await fetch(`http://localhost:3000/api/post/likes/${postId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: user.id }),
		});
		const data = await res.json();

		if (data.success) {
			toast.success(data.message);
		} else {
			toast.error(data.message);
		}
		setPosts((prevPosts) => {
			return prevPosts.map((post) => {
				if (post._id === postId) {
					return {
						...post,
						likes: post.likes.includes(user.id)
							? post.likes.filter((id) => id !== user.id)
							: [...post.likes, user.id],
					};
				}
				return post;
			});
		});
	};

	const value = {
		posts,
		setPosts,
		followers,
		setFollowers,
		pathname,
		filter,
		setFilter,
		filteredPosts,
		navigate,
		user,
		toggleLike,
		showSideBar,
		setShowSideBar,
		hadith,
		setHadith,
		text,
		setText,
		loading,
		setLoading,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
