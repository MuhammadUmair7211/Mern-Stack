import { useApp } from "../contexts/AppContext";
import { NavLink } from "react-router-dom";

const RecentPosts = () => {
	const { posts, setShowSideBar } = useApp();

	const recentPostFIltered = [...posts].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	return (
		<div>
			{recentPostFIltered.slice(0, 5).map((post) => {
				return (
					<NavLink
						onClick={() => setShowSideBar(false)}
						to={`/posts/${post._id}`}
						key={post._id}
						className="font-urdu text-right hover:text-white duration-300 block pb-2 border-b border-gray-300"
					>
						{post.title}
					</NavLink>
				);
			})}
		</div>
	);
};

export default RecentPosts;
