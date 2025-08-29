import { useState } from "react";
import assets from "../../assets/assets";

const ProfileUpdate = () => {
	const [preview, setPreview] = useState(assets.avatar_icon);
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const handleFormSubmit = (e) => {
		e.preventDefault();
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	};
	return (
		<div
			className="px-2 md:px-16 lg:px-52 flex items-center justify-center min-h-screen bg-cover bg-center"
			style={{ backgroundImage: `url(${assets.backgroundImage})` }}
		>
			<div className="max-w-3xl w-full p-8 bg-white rounded-lg">
				<h1 className="font-medium">Profile Details</h1>
				<form
					onSubmit={handleFormSubmit}
					className="flex flex-col md:flex-row items-center justify-between"
				>
					<div className="my-4 w-full md:w-1/2">
						<label
							htmlFor="avatar"
							className="flex items-center gap-2 cursor-pointer"
						>
							<input
								type="file"
								id="avatar"
								accept=".jpg, .jpeg, .png"
								hidden
								onChange={handleImageChange}
							/>
							<img
								src={preview}
								alt="profile"
								className="rounded-full w-20 h-20 object-cover border border-gray-300 cursor-pointer"
							/>
							<span className="text-sm text-gray-400 hover:underline">
								Upload profile image
							</span>
						</label>
						<div className="my-4">
							<input
								type="text"
								placeholder="Your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="border border-gray-300 px-4 py-2 outline-none w-full"
							/>
						</div>
						<div>
							<textarea
								rows={4}
								placeholder="Write profile bio"
								required
								value={bio}
								onChange={(e) => setBio(e.target.value)}
								className="border border-gray-300 px-4 py-2 outline-none w-full"
							></textarea>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 mt-4 cursor-pointer text-white py-2 hover:bg-blue-600 duration-300"
						>
							Save
						</button>
					</div>
					<div className="w-full md:w-1/2 flex items-center justify-center">
						<img
							src={preview}
							alt="profile-preview"
							className="w-64 object-contain"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileUpdate;
