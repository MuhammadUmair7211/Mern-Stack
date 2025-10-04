import RecentPosts from "../pages/RecentPosts";
import PopularPosts from "../pages/PopularPosts";
import HadithSection from "./HadithSection";
const RightSide = () => {
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

			<div>
				<HadithSection />
			</div>
		</div>
	);
};

export default RightSide;
