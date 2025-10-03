import RecentPosts from "../pages/RecentPosts";
import PopularPosts from "../pages/PopularPosts";
import { useApp } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
const RightSide = () => {
	const { hadith, navigate } = useApp();

	const [index, setIndex] = useState(0);
	useEffect(() => {
		const today = new Date().getDate();
		setIndex(today - 1);
	}, [index]);

	return (
		<div className="p-4 bg-[#7b011e] text-white hidden h-[87vh] lg:flex flex-col items-center justify-around font-urdu">
			<div className="w-full mb-4 text-center">
				<h2 className="text-sm my-4 font-semibold">
					حال ہی میں اپ لوڈ کی گئی پوسٹس
				</h2>
				<RecentPosts />
			</div>
			<div className="w-full mb-4 text-center">
				<h2 className="text-sm my-6 text-center font-semibold">مقبول پوسٹس</h2>
				<PopularPosts />
			</div>

			<div
				title="click to read full details of hadith"
				onClick={() => navigate(`/hadith-details/${hadith[index].id}`)}
				className="w-full mb-4 text-center space-y-2 rounded p-3"
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
		</div>
	);
};

export default RightSide;
