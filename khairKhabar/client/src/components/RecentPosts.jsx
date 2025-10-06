import { ScaleLoader } from "react-spinners";
import { useApp } from "../contexts/AppContext";
import { NavLink } from "react-router-dom";

const RecentPosts = () => {
	const { posts, setShowSideBar, loading } = useApp();

	const recentPostFiltered = [...posts].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	return (
		<div>
			{!loading ? (
				recentPostFiltered.slice(0, 5).map((post) => {
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
			) : (
				<div className="flex justify-center items-center h-40">
					<ScaleLoader color="#fff" height={25} width={4} />
				</div>
			)}
		</div>
	);
};

export default RecentPosts;
