import { useParams } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const Profile = () => {
	const { id } = useParams();
	const { followers, navigate } = useApp();

	const user = followers.find((f) => String(f._id) === id);

	if (!user) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<p className="text-gray-500 text-lg">User not found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-4">
			{/* Main Heading */}
			<h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
				User Profile Details
			</h1>
			<p className="text-gray-600 mb-8 text-center">
				View detailed information about the selected user
			</p>

			{/* Profile Card */}
			<div className="max-w-lg w-full bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transition-transform transform hover:scale-105">
				<h2 className="text-xl font-medium text-gray-700 mb-4">Profile Info</h2>
				<img
					src={user.image || "/default-profile.png"}
					alt={user.username}
					className="w-48 h-48 rounded-full object-cover mb-4 border-2 border-gray-300"
				/>
				<h1 className="text-2xl font-semibold mb-1 text-gray-800">
					{user.username}
				</h1>
				<p className="text-gray-600 mb-4">{user.email}</p>
				<button
					onClick={() => navigate(-1)}
					className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
				>
					Back
				</button>
			</div>
		</div>
	);
};

export default Profile;
