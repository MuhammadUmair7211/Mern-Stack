import { useApp } from "../contexts/AppContext";
import { NavLink } from "react-router-dom";

const RecentPosts = () => {
	const { posts } = useApp();

	const recentPostFIltered = [...posts].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	return (
		<div>
			{recentPostFIltered.slice(0, 5).map((post) => {
				return (
					<NavLink
						to={`/posts/${post._id}`}
						key={post._id}
						className="text-blue-500 font-urdu hover:underline block pb-2 border-b border-gray-300"
					>
						{post.title}
					</NavLink>
				);
			})}
		</div>
	);
};

export default RecentPosts;
