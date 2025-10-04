import { useEffect, useState } from "react";
import { useApp } from "../../contexts/AppContext";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditPost = () => {
	const { posts, setPosts, navigate } = useApp();
	const { id } = useParams();

	const filteredPostById = posts.find(
		(post) => String(post._id) === String(id)
	);

	const [formData, setFormData] = useState({
		category: "",
		title: "",
		content: "",
		author: "",
		image: null,
	});
	useEffect(() => {
		if (filteredPostById) {
			setFormData({
				category: filteredPostById.category,
				title: filteredPostById.title,
				content: filteredPostById.content,
				author: filteredPostById.author,
				image: filteredPostById.image,
			});
		}
	}, [filteredPostById]);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const editedFormData = new FormData();
		editedFormData.append("category", formData.category);
		editedFormData.append("title", formData.title);
		editedFormData.append("content", formData.content);
		editedFormData.append("author", formData.author);
		editedFormData.append("image", formData.image);
		const res = await fetch(`http://localhost:3000/api/post/edit-post/${id}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: editedFormData,
		});
		const data = await res.json();
		if (data.success) {
			toast.success(data.message);
			setPosts((prevPosts) =>
				prevPosts.map((p) => (String(p._id) === String(id) ? data.post : p))
			);
			navigate("/admin-layout");
		} else {
			toast.error(data.message);
		}
	};
	if (!filteredPostById) {
		return <p className="text-red-500">Post not found</p>;
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 font-urdu">
			<div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-screen-xl">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Post</h2>

				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
				>
					{/* Left Column */}
					<div className="space-y-4">
						{/* Title */}
						<div>
							<label className="mb-2 block text-sm font-medium text-gray-700">
								Title
							</label>
							<input
								type="text"
								name="title"
								placeholder="Enter post title"
								value={formData.title}
								onChange={handleChange}
								className="w-full px-4 py-2 rounded-lg border border-gray-300  outline-none text-sm"
							/>
						</div>
						{/* Category */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Category
							</label>
							<select
								name="category"
								value={formData.category}
								onChange={handleChange}
								className="w-full p-2 rounded-lg border border-gray-300  outline-none text-sm"
							>
								<option hidden>Select a category</option>
								<option value="personal blog">Personal Blog</option>
								<option value="poetry">Poetry</option>
								<option value="travelogue">Travelogue</option>
								<option value="literary criticism">Literary Criticism</option>
								<option value="prose">Prose</option>
								<option value="humor">Humor</option>
								<option value="fiction">Fiction</option>
								<option value="urdu grammar">Urdu Grammar</option>
								<option value="urdu history">Urdu History</option>
								<option value="idioms">Idioms</option>
								<option value="character sketches">Character Sketches</option>
								<option value="pakistan">Pakistan</option>
							</select>
						</div>

						{/* Author */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Author
							</label>
							<input
								type="text"
								name="author"
								placeholder="Enter author name"
								value={formData.author}
								onChange={handleChange}
								className="w-full px-4 py-2 rounded-lg border border-gray-300  outline-none text-sm"
							/>
						</div>

						{/* Image Upload */}
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Upload Image
							</label>

							{/* Preview */}
							{formData.image && (
								<div className="my-6">
									<img
										src={
											typeof formData.image === "string"
												? formData.image
												: URL.createObjectURL(formData.image)
										}
										alt="Post Preview"
										className="w-full max-w-xl h-[30vh] object-center rounded-lg shadow-md duration-500 ease-in-out mx-auto animate-fadeIn hover:scale-105"
									/>
								</div>
							)}

							{/* Custom File Upload */}
							<div className="relative flex items-center">
								<label
									htmlFor="imageUpload"
									className="cursor-pointer inline-flex items-center justify-center 
             px-5 py-2 rounded-lg bg-gray-900 text-white font-medium text-sm
             shadow-md hover:bg-gray-700 transition-colors duration-300 ease-in-out"
								>
									📂 Choose Image
								</label>
								<input
									id="imageUpload"
									type="file"
									name="image"
									accept="image/*"
									onChange={handleChange}
									className="hidden"
								/>
							</div>
						</div>
					</div>

					{/* Right Column - Larger Content Area */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Content
						</label>
						<textarea
							name="content"
							placeholder="Write your post content..."
							rows="28"
							value={formData.content}
							onChange={handleChange}
							className="mt-1 w-full h-full px-4 py-3 rounded-lg border border-gray-300  outline-none text-sm text-right resize-none"
						></textarea>
					</div>

					{/* Submit Button Full Width */}
					<div className="md:col-span-2 mt-4">
						<button
							type="submit"
							className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300 font-medium cursor-pointer duration-300"
						>
							Submit Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default EditPost;
