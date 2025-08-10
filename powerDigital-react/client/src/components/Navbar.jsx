import { useUser } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
const Navbar = () => {
	const navigate = useNavigate();

	const { user } = useUser();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/user-login");
	};
	return (
		<nav className="fixed top-0 w-full bg-gray-800 flex items-center justify-between h-14 text-white p-4">
			<Link to="/" className="flex items-center gap-2">
				<svg
					className="mt-2"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 151 174"
					width="50"
					height="50"
					fill="#d32f2f"
				>
					<path d="M74.5 4.5h27.1l-17.4 55.8h22.6L74.8 148.6l4.7-44.5H57.6l17.1-44.5H57.4L74.5 4.5z" />
					<path d="M75.5 0C34.1 0 0 34.1 0 75.5S34.1 151 75.5 151c41.3 0 75.5-34.1 75.5-75.5 0-21.7-9-41.3-23.5-55.1l-7.5 23.1c9.8 9.9 15.8 23.6 15.8 38.6 0 30.3-24.6 54.9-54.9 54.9S26.1 112.9 26.1 82.6 50.7 27.7 81 27.7l4.5-13.8C82.7 11.1 79.2 10.3 75.5 10.3z" />
				</svg>
				<h1 className="text-2xl md:text-3xl md:font-semibold text-[#65e4e4]">
					Power Digital
				</h1>
			</Link>
			<div className="flex items-center gap-6">
				<div className="text-sm cursor-pointer font-mono">
					<p>Welcome,</p>
					<h1 className="text-indigo-400">{user?.username}</h1>
				</div>
				<div onClick={handleLogout}>
					<IoLogOutOutline className="text-xl md:text-3xl text-red-500 hover:text-red-800 cursor-pointer duration-300" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
