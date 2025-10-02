import { useApp } from "../../contexts/AppContext";

const AllPosts = () => {
	const { posts, setPosts, navigate } = useApp();

	// Delete a post
	const handleDelete = async (post) => {
		const result = window.confirm(
			`Are you sure you want to delete "${post.title}"?`
		);
		if (!result) return;
		const res = await fetch(
			`http://localhost:3000/api/post/delete-post/${post._id}`,
			{
				method: "DELETE",
			}
		);
		const data = await res.json();
		console.log(data);
		setPosts(posts.filter((p) => p._id !== post._id));
	};

	// Edit a post (for now just alert)
	const handleEdit = (post) => {
		navigate(`/admin-layout/edit-post/${post._id}`);
	};

	return (
		<div className="bg-white shadow-lg rounded-xl p-6 font-urdu">
			<h2 className="text-xl font-bold mb-4 text-gray-800">All Posts</h2>
			<div className="overflow-x-auto rounded-lg border border-gray-200">
				<table className="min-w-full cursor-pointer text-sm text-gray-700 overflow-x-scroll">
					<thead className="bg-gray-100 text-gray-600 uppercase text-xs">
						<tr>
							<th className="px-4 py-3 text-left hidden md:block">Image</th>
							<th className="px-4 py-3 text-right">Title</th>
							<th className="px-4 py-3 text-center">Category</th>
							<th className="px-4 py-3 text-right">Content</th>
							<th className="px-4 py-3 text-center hidden md:block">Author</th>
							<th className="px-4 py-3 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{posts.length > 0 ? (
							posts.map((post, index) => (
								<tr
									key={post._id}
									className={`${
										index % 2 === 0 ? "bg-white" : "bg-gray-50"
									} hover:bg-gray-100 transition`}
								>
									<td className="px-4 py-3 hidden md:block">
										<img
											src={post.image}
											alt={post.title}
											className="w-16 h-16 object-cover rounded-lg border"
										/>
									</td>
									<td className="px-4 py-3 text-right font-medium">
										{post.title}
									</td>
									<td className="px-4 py-3 text-center">
										<span className="px-2 py-1 md:text-xs font-bold rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
											{post.category}
										</span>
									</td>
									<td
										className="px-4 py-3 max-w-xs truncate"
										title={post.content} // tooltip
									>
										{post.content}
									</td>
									<td className="px-4 py-3 text-center hidden md:block">
										{post.author}
									</td>
									<td className="px-4 py-3 text-center space-x-2">
										<button
											onClick={() => handleEdit(post)}
											className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 duration-300 cursor-pointer"
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(post)}
											className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 duration-300 cursor-pointer"
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan="6"
									className="px-4 py-6 text-center text-gray-500 italic"
								>
									No posts available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllPosts;
