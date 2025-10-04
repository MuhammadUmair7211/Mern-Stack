import { useState, useEffect } from "react";
import FollowButton from "./FollowButton";

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
		<div className="bg-[#7b011e] text-white text-xs py-1 w-full flex flex-col items-center justify-center">
			<span>{gregorian}</span>
			<span>{islamic}</span>
		</div>
	);
};

export default Header;
