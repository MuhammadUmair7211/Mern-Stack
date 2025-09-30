import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const Header = () => {
	const [dateTime, setDateTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setDateTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const gregorian = dateTime.toLocaleString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
	const islamic = dateTime.toLocaleDateString("en-TN-u-ca-islamic", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return (
		<div
			style={{ backgroundImage: `url(${assets.headerBg})` }}
			className="bg-repeat bg-contain lg:h-10 text-white text-xs py-1 w-full flex flex-col items-center"
		>
			<span>{gregorian}</span>
			<span>{islamic}</span>
		</div>
	);
};

export default Header;
