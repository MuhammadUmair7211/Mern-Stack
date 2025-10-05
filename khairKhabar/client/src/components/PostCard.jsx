import { SlLike } from "react-icons/sl";
import { useApp } from "../contexts/AppContext";
const PostCard = ({ post, index }) => {
	const { toggleLike, user } = useApp();

	return (
		<div
			key={post._id}
			className="border-b flex flex-col border-gray-300 mb-4 py-3 font-urdu leading-[3rem]"
		>
			{/* Title stays centered */}

			<h1 className="lg:font-bold text-center text-2xl">
				{post.title} # <span>{index + 1}</span>
			</h1>

			{/* Content */}
			<p className="whitespace-pre-wrap leading-8 font-urdu text-right">
				{post.content}
			</p>

			{/* Image centered */}
			{post.image && (
				<div className="mx-auto w-full my-4">
					<img
						src={post.image}
						alt={post.title}
						className="w-full rounded-md object-cover"
					/>
				</div>
			)}

			{/* Author and date */}
			<p>{post.author} --</p>
			<p className="text-xs text-gray-700">
				{new Date(post.createdAt).toLocaleString("en-US", {
					dateStyle: "medium",
					timeStyle: "short",
				})}
			</p>

			<div className="mt-4">
				<button
					onClick={() => toggleLike(post._id)}
					className={`flex border border-gray-300 items-center gap-2 px-5 py-1 rounded-full cursor-pointer 
      ${
				post.likes.includes(user?.id)
					? "bg-blue-500 text-white hover:bg-blue-600 duration-200"
					: "bg-white text-gray-600 hover:bg-gray-100"
			}`}
				>
					<SlLike
						className={`text-lg transition-transform duration-200 ${
							post.likes.includes(user?.id) ? "scale-110" : "hover:scale-110"
						}`}
					/>
					<span className="text-sm font-medium mb-2">{post.likes.length}</span>
				</button>
			</div>
		</div>
	);
};

export default PostCard;
