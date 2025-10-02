import RecentPosts from "../pages/RecentPosts";
import PopularPosts from "../pages/PopularPosts";
import { useApp } from "../contexts/AppContext";
import { useEffect, useState } from "react";

const RightSide = () => {
	const { hadith, navigate } = useApp();

	const [index, setIndex] = useState(0);
	useEffect(() => {
		const today = new Date().getDate();
		setIndex(today - 1);
	}, [index]);

	return (
		<div className="p-4 bg-[#0181B0] hidden h-[86vh] lg:flex flex-col items-center justify-around font-urdu">
			<div className="w-full mb-4 text-center">
				<h2 className="text-sm my-4 font-semibold text-black ">
					حال ہی میں اپ لوڈ کی گئی پوسٹس
				</h2>
				<RecentPosts />
			</div>
			<div className="w-full mb-4 text-center">
				<h2 className="text-sm my-6 text-center font-semibold text-black">
					مقبول پوسٹس
				</h2>
				<PopularPosts />
			</div>

			<div
				title="click to read full details of hadith"
				onClick={() => navigate(`/hadith-details/${hadith[index].id}`)}
				className="w-full mb-4 text-center space-y-2 rounded p-3"
			>
				<h2 className="text-sm font-semibold text-black">روزانہ حدیث</h2>
				{hadith ? (
					<p className="overflow-y-scroll h-[25vh] cursor-pointer hover:text-white duration-300">
						{hadith[index].hadithUrdu}
					</p>
				) : (
					<p>loading</p>
				)}
			</div>
		</div>
	);
};

export default RightSide;
