import { useState } from "react";

const AddNewPost = () => {
	const names = [1, 2, 3, 4, 5, 6];
	const [formData, setFormData] = useState({
		category: "",
		title: "",
		content: "",
		author: "",
		image: null,
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Post Data:", formData);
		alert("Post submitted successfully!");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 font-urdu">
			<div className="bg-white shadow-lg rounded-xl p-4 w-full max-w-7xl">
				<h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
					Add New Post
				</h2>

				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
								className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300  outline-none text-sm"
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
							<label className="block text-sm font-medium text-gray-700">
								Author
							</label>
							<input
								type="text"
								name="author"
								placeholder="Enter author name"
								value={formData.author}
								onChange={handleChange}
								className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300  outline-none text-sm"
							/>
						</div>
						<div className="font-urdu grid grid-cols-1 md:grid-cols-3 gap-4">
							{names.map((num) => (
								<div key={num} className="flex items-center gap-3">
									<label
										htmlFor={`name-${num}`}
										className="text-xs text-gray-600"
									>
										Name {num}:
									</label>
									<input
										type="text"
										id={`name-${num}`}
										placeholder={`Enter ${num}`}
										className="p-2 max-w-30 w-full border border-gray-300 text-xs rounded-md shadow-sm outline-none"
									/>
								</div>
							))}
						</div>

						{/* Image Upload */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Upload Image
							</label>

							{/* Preview */}
							{formData.image && (
								<div className="mb-3">
									<img
										src={
											typeof formData.image === "string"
												? formData.image // existing image URL
												: URL.createObjectURL(formData.image) // newly uploaded file
										}
										alt="Post Preview"
										className="w-70 object-cover rounded border"
									/>
								</div>
							)}

							<input
								type="file"
								name="image"
								accept="image/*"
								onChange={handleChange}
								className="mt-1 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
               file:rounded-lg file:border-0 file:text-sm file:font-medium 
               file:bg-gray-900 file:text-white hover:file:bg-gray-700"
							/>
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
							rows="32"
							value={formData.content}
							onChange={handleChange}
							className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300  outline-none text-sm resize-none"
						></textarea>
					</div>

					{/* Submit Button Full Width */}
					<div className="md:col-span-2 mt-2">
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
export default AddNewPost;
