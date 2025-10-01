import { useState, useEffect } from "react";

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
			style={{background: "linear-gradient(90deg, #221d3c, #461f47) 0 0 no-repeat padding-box"}}
			className=" text-white text-xs py-1 w-full flex flex-col items-center justify-center"
		>
			<span>{gregorian}</span>
			<span>{islamic}</span>
		</div>
	);
};

export default Header;
