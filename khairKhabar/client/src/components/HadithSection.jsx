import { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { ScaleLoader } from "react-spinners";
const HadithSection = () => {
	const { hadith, navigate } = useApp();

	const [index, setIndex] = useState(0);
	useEffect(() => {
		const today = new Date().getDate();
		setIndex(today - 1);
	}, [index]);
	return (
		<div
			title="click to read full details of hadith"
			onClick={() => navigate(`/hadith-details/${hadith[index].id}`)}
			className="w-full mb-4 text-center space-y-2 rounded p-2"
		>
			<h2 className="text-sm font-semibold">روزانہ حدیث</h2>
			{hadith ? (
				<p className="overflow-y-scroll h-[25vh] cursor-pointer hover:text-black duration-300">
					{hadith[index].hadithUrdu}
				</p>
			) : (
				<div className="flex justify-center items-center h-40">
					<ScaleLoader color="#fff" height={25} width={4} />
				</div>
			)}
		</div>
	);
};

export default HadithSection;
