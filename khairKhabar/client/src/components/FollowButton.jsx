import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { auth, provider } from "../../firebase";
import { NavLink } from "react-router-dom";

const FollowButton = () => {
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
		<button
			onClick={handleLogin}
			className="bg-[#7b011e] text-white w-full px-4 py-2 text-sm hover:bg-[#4b0717] hover:text-[#f5f1e6] cursor-pointer duration-300 rounded-full"
		>
			Follow <NavLink to="/">khairKhabar.com</NavLink>
		</button>
	);
};

export default FollowButton;
