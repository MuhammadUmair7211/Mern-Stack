import { createContext, useContext, useEffect, useState } from "react";
import { dummyPosts, dummyFollowers } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState(dummyPosts);
	const [followers, setFollowers] = useState(dummyFollowers);
	const [filter, setFilter] = useState("");
	const [showSideBar, setShowSideBar] = useState(false);
	const [hadith, setHadith] = useState(null);
	const [text, setText] = useState(() => {
		return localStorage.getItem("text");
	});
	useEffect(() => {
		localStorage.setItem("text", text);
	}, [text]);
	const [user, setUser] = useState({
		_id: "1",
		name: "Muhammad Umair",
	});
	const fetchPosts = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/post/get-all-posts", {
				method: "GET",
			});
			const data = await res.json();
			console.log(data);
			setPosts(data.posts);
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

	const { pathname } = useLocation();
	const toggleLike = (postId) => {
		setPosts((prevPosts) => {
			return prevPosts.map((post) => {
				if (post._id === postId) {
					return {
						...post,
						likes: post.likes.includes(user._id)
							? post.likes.filter((id) => id !== user._id)
							: [...post.likes, user._id],
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
		setUser,
		toggleLike,
		showSideBar,
		setShowSideBar,
		hadith,
		setHadith,
		text,
		setText,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
