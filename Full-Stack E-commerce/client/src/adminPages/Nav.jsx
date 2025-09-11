import { assets } from "../assets/frontend_assets/assets";
import { useApp } from "../context/AppContext";

const Nav = () => {
	const { adminEmail, navigate, setAdminEmail } = useApp();
	return (
		<nav className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-b border-gray-200 py-2">
			<div className="flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="flex flex-col items-start">
					<img src={assets.logo} alt="logo" className="max-w-[170px]" />
					<span className="uppercase text-[#cb92ae] text-sm font-medium -mt-2">
						Admin Panel
					</span>
				</div>
				<div className="flex flex-col md:flex-row items-center gap-4">
					<div>
						<p className="font-prata text-lg">
							You are loggedIn as:{" "}
							<span className="text-blue-600">"{adminEmail}"</span>
						</p>
					</div>
					<button
						onClick={() => {
							localStorage.removeItem("admin");
							setAdminEmail(null);
							navigate("/admin-login");
						}}
						className="bg-black px-6 py-2 cursor-pointer text-white"
					>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
