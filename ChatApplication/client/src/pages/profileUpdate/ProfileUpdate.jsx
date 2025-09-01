import { useEffect, useState } from "react";
import assets from "../../assets/assets";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
const ProfileUpdate = () => {
	const { user } = useUser();
	const [preview, setPreview] = useState(user?.image || assets.avatar_icon);
	const [imageFile, setImageFile] = useState(null);
	const [username, setUserName] = useState("");
	const [bio, setBio] = useState("");
	const navigate = useNavigate();
	const handleFormSubmit = async (e) => {
		const formData = new FormData();
		formData.append("username", username);
		formData.append("bio", bio);
		if (imageFile) {
			formData.append("image", imageFile);
		}
		e.preventDefault();
		const res = await fetch(`http://localhost:3000/api/profile/${user._id}`, {
			method: "PUT",
			body: formData,
		});
		const data = await res.json();
		console.log(data);
		if (res.ok) {
			toast.success(data.message);
			navigate("/chat");
		} else {
			toast.error(data.message);
		}
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImageFile(file);
			setPreview(URL.createObjectURL(file));
		}
	};
	useEffect(() => {
		if (user) {
			setUserName(user.username || "Guest");
			setBio(user.bio || "Hey, I am using chatApp");
		}
	}, [user]);
	return (
		<div
			className="px-2 md:px-16 lg:px-52 flex items-center justify-center min-h-screen bg-cover bg-center"
			style={{ backgroundImage: `url(${assets.backgroundImage})` }}
		>
			<div className="max-w-3xl w-full p-8 relative bg-white rounded-lg">
				<h1 className="font-medium">Profile Details</h1>
				<div className="absolute top-5 right-5">
					<IoMdClose
						size={25}
						className="cursor-pointer hover:text-[#2e3f61] duration-300 animate-bounce"
						onClick={() => navigate("/chat")}
					/>
				</div>
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
								className="rounded-full w-20 h-20 object-cover cursor-pointer"
							/>
							<span className="text-sm text-gray-400 hover:underline">
								Upload profile image
							</span>
						</label>
						<div className="my-4">
							<input
								type="text"
								placeholder="Your name"
								value={username}
								onChange={(e) => setUserName(e.target.value)}
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
							className="w-64 h-64 object-cover rounded-full"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileUpdate;
