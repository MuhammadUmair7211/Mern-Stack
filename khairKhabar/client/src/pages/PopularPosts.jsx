import { NavLink } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const PopularPosts = () => {
	const { posts, setShowSideBar } = useApp();

	const filteredPopularPosts = [...posts].sort(
		(a, b) => b.likes.length - a.likes.length
	);
	return (
		<div>
			{filteredPopularPosts.slice(0, 5).map((post) => {
				return (
					<NavLink
						onClick={() => setShowSideBar(false)}
						to={`/posts/${post._id}`}
						key={post._id}
						className="font-urdu text-right hover:underline block pb-2 border-b border-gray-300"
					>
						{post.title}
					</NavLink>
				);
			})}
		</div>
	);
};

export default PopularPosts;
