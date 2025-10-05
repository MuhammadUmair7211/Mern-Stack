import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import Contact from "./Contact";
const Navbar = () => {
	const { text } = useApp();

	return (
		<nav className="bg-[#f5f1e6] shadow-md w-full text-sm z-50">
			<div className="max-w-screen-2xl mx-auto px-2 lg:px-8">
				<div className="flex flex-row-reverse justify-between items-center">
					<Link to="/" className="text-[#7b011e]">
						<p className="text-2xl lg:text-4xl">خیرخبر</p>
					</Link>
					<marquee
						behavior="scroll"
						direction="right"
						scrollamount="3"
						className="py-2 font-urdu"
					>
						{text}
					</marquee>
					<div className="px-2 lg:hidden">
						<Contact />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
