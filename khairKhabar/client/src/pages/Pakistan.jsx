import { ScaleLoader } from "react-spinners";
import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Pakistan = () => {
	const { filteredPosts, loading } = useApp();

	const filteredPakistan = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "pakistan"
	);
	return (
		<div>
			{loading ? (
				<div className="w-full min-h-screen flex items-center justify-center">
					<ScaleLoader height={55} />
				</div>
			) : filteredPakistan.length > 0 ? (
				<div className="grid gap-6">
					{filteredPakistan.map((post, index) => (
						<PostCard key={post._id || index} post={post} index={index} />
					))}
				</div>
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Pakistan;
