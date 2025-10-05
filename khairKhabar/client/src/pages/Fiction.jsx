import { ScaleLoader } from "react-spinners";
import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Fiction = () => {
	const { filteredPosts, loading } = useApp();

	const filteredFiction = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "fiction"
	);
	return (
		<div>
			{loading ? (
				<div className="w-full min-h-screen flex items-center justify-center">
					<ScaleLoader height={55} />
				</div>
			) : filteredFiction.length > 0 ? (
				<div className="grid gap-6">
					{filteredFiction.map((post, index) => (
						<PostCard key={post._id || index} post={post} index={index} />
					))}
				</div>
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Fiction;
