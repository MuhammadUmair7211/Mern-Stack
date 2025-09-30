import { NavLink } from "react-router-dom";

const Navigation = () => {
	const links = [
		{ name: "Home", path: "/" },
		{ name: "Personal Blog", path: "/personal-blog" },
		{ name: "Poetry", path: "/poetry" },
		{ name: "Travelogues", path: "/travelogues" },
		{ name: "Literary Criticism", path: "/literary-criticism" },
		{ name: "Prose", path: "/prose" },
		{ name: "Humor & Satire", path: "/humor" },
		{ name: "Fiction", path: "/fiction" },
		{ name: "Learn Urdu", path: "/learn-urdu" },
		{ name: "History of Urdu", path: "/history-of-urdu" },
		{ name: "Idioms & Proverbs", path: "/idioms-proverbs" },
		{ name: "Character Sketches", path: "/character-sketches" },
		{ name: "Pakistan", path: "/pakistan" },
	];

	return (
		<div className="bg-black lg:h-10 text-white text-sm overflow-x-auto">
			<div className="flex items-center justify-around md:px-4 whitespace-nowrap ">
				{links.map((link, index) => (
					<NavLink
						key={index}
						to={link.path}
						end={link.path === "/"}
						aria-label={link.name}
						className={({ isActive }) =>
							`uppercase px-4 py-2 md:font-bold hover:bg-gray-100 hover:text-[#66441a] hover:translate-x-2 duration-300 text-xs md:text-sm ${
								isActive
									? "text-[#66441a] border-b border-[#66441a] bg-gray-100"
									: "text-white"
							}`
						}
					>
						{link.name}
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default Navigation;
