import { useEffect, useState } from "react";

const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const hours = time.getHours().toString().padStart(2, "0");
	const minutes = time.getMinutes().toString().padStart(2, "0");
	const seconds = time.getSeconds().toString().padStart(2, "0");

	return (
		<div className="flex items-center">
			<p className="flex items-center space-x-2 font-mono">
				<span className="text-white bg-red-500 p-2 rounded-full text-xs w-8 md:w-12 md:text-sm text-center">
					{hours}
				</span>
				<span className="text-black text-lg lg:text-2xl font-bold">:</span>
				<span className="text-white bg-red-500 p-2 rounded-full text-xs w-8 md:w-12 md:text-sm text-center">
					{minutes}
				</span>
				<span className="text-black text-lg lg:text-2xl font-bold">:</span>
				<span className="text-white bg-red-500 p-2 rounded-full text-xs w-8 md:w-12 md:text-sm text-center">
					{seconds}
				</span>
			</p>
		</div>
	);
};

export default Clock;
