import { useApp } from "../contexts/AppContext";
import PopularPosts from "../pages/PopularPosts";
import RecentPosts from "../pages/RecentPosts";
import PostCard from "./PostCard";

const CenterContent = () => {
	const { posts, setShowSideBar } = useApp();

	return (
		<div onClick={() => setShowSideBar(false)} className="relative">
			{posts.map((post, index) => (
				<PostCard key={post._id} post={post} index={index} />
			))}
		</div>
	);
};

export default CenterContent;
