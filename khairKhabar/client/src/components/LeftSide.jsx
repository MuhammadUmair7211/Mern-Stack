import { NavLink } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import toast from "react-hot-toast";
const LeftSide = () => {
	const { followers, filter, setFilter, navigate } = useApp();

	const handleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			const newUser = {
				username: user.displayName,
				email: user.email,
				image: user.photoURL,
			};

			const res = await fetch("http://localhost:3000/api/user/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});
			const data = await res.json();

			if (data.success) {
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (err) {
			console.error("Login failed:", err);
		}
	};
	return (
		<div className="p-4 bg-[#f5f1e6] text-[#7b011e] hidden lg:flex flex-col items-center justify-around">
			<div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
				<svg
					className="w-15 h-15 text-gray-600"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
				</svg>
			</div>
			<div className="flex items-center gap-2 flex-wrap">
				{/* Primary Button */}
				<button
					onClick={() => navigate("/about")}
					className="bg-[#7b011e] text-[#f5f1e6] hover:bg-[#f5f1e6] hover:text-[#7b011e] border hover:border-gray-300 px-2 lg:px-5 py-2 rounded-full cursor-pointer duration-300 text-xs"
				>
					View My Profile
				</button>

				{/* Secondary Button */}
				<button
					onClick={() => navigate("/admin-login")}
					className="bg-[#f5f1e6] text-[#7b011e] hover:bg-[#7b011e] hover:text-[#f5f1e6] border border-gray-300 px-2 lg:px-5 py-2 rounded-full duration-300 cursor-pointer text-xs"
				>
					Admin Dashboard
				</button>
			</div>
			<div className="w-full">
				<label htmlFor="search" className="text-sm block mb-2">
					Search posts by Date:
				</label>
				<input
					id="search"
					type="date"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="w-full p-2 shadow-[0_0_5px_0] text-sm outline-none"
				/>
			</div>

			<div className="p-2">
				<h2 className="text-xs font-bold pb-4">
					Followers : {followers?.length}
				</h2>
				<div className="text-[#f5f1e6] grid h-[300px] grid-cols-3 overflow-y-scroll md:grid-cols-3 lg:grid-cols-7 gap-2">
					{followers?.map((follower) => {
						return (
							<div
								key={follower._id}
								onClick={() => navigate(`/profile/${follower._id}`)}
							>
								{/* Avatar */}
								<img
									src={follower.image}
									alt={follower.username}
									className="w-10 rounded-full object-center object-cover cursor-pointer"
								/>
							</div>
						);
					})}
				</div>
			</div>
			<button
				onClick={handleLogin}
				className="bg-[#7b011e] text-white px-4 py-2 text-sm rounded-md hover:bg-[#4b0717] hover:text-[#f5f1e6] cursor-pointer duration-300"
			>
				Follow <NavLink to="/">khairKhabar.com</NavLink>
			</button>
		</div>
	);
};

export default LeftSide;
