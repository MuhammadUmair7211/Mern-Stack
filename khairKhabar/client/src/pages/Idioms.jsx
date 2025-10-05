import { ScaleLoader } from "react-spinners";
import NoPostAvailable from "../components/NoPostAvailable";
import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";

const Idioms = () => {
	const { filteredPosts, loading } = useApp();

	const filteredIdioms = filteredPosts.filter(
		(post) => post.category.toLowerCase() === "idioms"
	);
	return (
		<div>
			{loading ? (
				<div className="w-full min-h-screen flex items-center justify-center">
					<ScaleLoader height={55} />
				</div>
			) : filteredIdioms.length > 0 ? (
				<div className="grid gap-6">
					{filteredIdioms.map((post, index) => (
						<PostCard key={post._id || index} post={post} index={index} />
					))}
				</div>
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default Idioms;
