import { createContext, useContext, useState } from "react";
import { dummyPosts, dummyFollowers } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const AppProvider = ({ children }) => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState(dummyPosts);
	const [followers, setFollowers] = useState(dummyFollowers);
	const [filter, setFilter] = useState("");
	const [user, setUser] = useState({
		_id: "1",
		name: "Muhammad Umair",
	});

	const filteredByDate = (date) => {
		if (!date) return posts;
		const newDate = new Date(date);
		return posts.filter(
			(post) => new Date(post.date).toDateString() === newDate.toDateString()
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

	const phrase =
		"A website to deliver Education, Entertainment and Information Altogether !";

	const value = {
		posts,
		setPosts,
		phrase,
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
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppProvider;
