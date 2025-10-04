import { useApp } from "../contexts/AppContext";
import NoPostAvailable from "./NoPostAvailable";
import PostCard from "./PostCard";

const CenterContent = () => {
	const { setShowSideBar, filteredPosts } = useApp();

	return (
		<div onClick={() => setShowSideBar(false)} className="relative">
			{filteredPosts.length > 0 ? (
				filteredPosts.map((post, index) => (
					<PostCard key={post._id} post={post} index={index} />
				))
			) : (
				<NoPostAvailable />
			)}
		</div>
	);
};

export default CenterContent;
