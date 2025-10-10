import { NavLink } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { ScaleLoader } from "react-spinners";

const PopularPosts = () => {
	const { posts, setShowSideBar, loading } = useApp();

	const filteredPopularPosts = [...posts].sort(
		(a, b) => b.likes.length - a.likes.length
	);
	return (
		<div>
			{loading ? (
				<div className="flex justify-center items-center h-40">
					<ScaleLoader color="#fff" height={25} width={4} />
				</div>
			) : (
				filteredPopularPosts.slice(0, 5).map((post) => {
					return (
						<NavLink
							onClick={() => setShowSideBar(false)}
							to={`/posts/${post._id}`}
							key={post._id}
							className="font-urdu text-right hover:text-black duration-300 block pb-2 border-b border-gray-300"
						>
							{post.title}
						</NavLink>
					);
				})
			)}
		</div>
	);
};

export default PopularPosts;
