import PostCard from "../components/PostCard";
import { useApp } from "../contexts/AppContext";
import { useParams } from "react-router-dom";

const Posts = () => {
	const { posts } = useApp();
	const { id } = useParams();
	const filteredPosts = posts.filter((post) => String(post._id) === String(id));

	return (
		<div>
			{filteredPosts.map((post, index) => {
				return <PostCard key={index} post={post} index={index} />;
			})}
		</div>
	);
};

export default Posts;
