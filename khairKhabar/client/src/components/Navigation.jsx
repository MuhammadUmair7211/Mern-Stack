import { NavLink } from "react-router-dom";

const Navigation = () => {
	const links = [
		{ name: "صفحۂ اول", path: "/" },
		{ name: "ذاتی بلاگ", path: "/personal-blog" },
		{ name: "شاعری", path: "/poetry" },
		{ name: "سفرنامے", path: "/travelogues" },
		{ name: "ادبی تنقید", path: "/literary-criticism" },
		{ name: "نثر", path: "/prose" },
		{ name: "طنز و مزاح", path: "/humor" },
		{ name: "افسانے", path: "/fiction" },
		{ name: "اردو سیکھیں", path: "/learn-urdu" },
		{ name: "اردو کی تاریخ", path: "/history-of-urdu" },
		{ name: "محاورے و ضرب الامثال", path: "/idioms-proverbs" },
		{ name: "کردار نگاری", path: "/character-sketches" },
		{ name: "پاکستان", path: "/pakistan" },
	];

	return (
		<div className="font-urdu bg-gray-900 text-white text-sm overflow-x-auto">
			<div className="flex flex-row-reverse items-center justify-around md:px-2 whitespace-nowrap ">
				{links.map((link, index) => (
					<NavLink
						key={index}
						to={link.path}
						end={link.path === "/"}
						aria-label={link.name}
						className={({ isActive }) =>
							`uppercase px-4 py-2 font-light lg:font-bold hover:translate-x-2 duration-300 text-xs md:text-sm ${
								isActive ? "text-[#f5f1e6] bg-[#7b011e]" : "text-[#f5f1e6]"
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
