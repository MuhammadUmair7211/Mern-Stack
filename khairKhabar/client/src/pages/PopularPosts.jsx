import { NavLink } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const PopularPosts = () => {
	const { posts } = useApp();

	const filteredPopularPosts = [...posts].sort(
		(a, b) => b.likes.length - a.likes.length
	);
	return (
		<div>
			{filteredPopularPosts.slice(0, 5).map((post) => {
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

export default PopularPosts;
