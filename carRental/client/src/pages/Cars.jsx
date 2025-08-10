import { useState } from "react";
import { assets } from "../assets/assets";
import AllCars from "../components/AllCars";

const Cars = () => {
	const [input, setInput] = useState("");
	return (
		<>
			<div className="bg-light cursor-pointer py-10 flex flex-col text-center items-center justify-center">
				<div className="text-center">
					<h1 className="text-3xl md:text-4xl font-bold mt-10">
						Available Cars
					</h1>
					<p className="text-gray-500 text-base my-2">
						Browse our selection of premium vehicles available for your next
						adventure
					</p>
				</div>
				<div className="flex items-center justify-between max-w-2xl shadow-[0px_0px_8px_0px] px-4 py-3 rounded-full bg-white w-full flex-wrap mx-auto mt-2">
					<img src={assets.search_icon} alt="search" />
					<input
						type="search"
						placeholder="Search by make, model, or features"
						className="flex-1 px-3 outline-none"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<img src={assets.filter_icon} alt="" />
				</div>
			</div>
			<AllCars input={input} setInput={setInput} />
		</>
	);
};

export default Cars;
