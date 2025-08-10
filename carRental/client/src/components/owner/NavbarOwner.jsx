import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
const NavbarOwner = () => {
	return (
		<div className="flex items-center flex-wrap justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative">
			<Link to="/">
				<img src={assets.logo} alt="logo" className="h-7" />
			</Link>
			<p>Welcome, "Owner"</p>
		</div>
	);
};

export default NavbarOwner;
