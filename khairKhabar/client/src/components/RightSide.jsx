import RecentPosts from "../pages/RecentPosts";
import PopularPosts from "../pages/PopularPosts";
import { useApp } from "../contexts/AppContext";

const RightSide = () => {
	const { hadith, navigate } = useApp();

	return (
		<div className="p-4 bg-[#0181B0] hidden lg:flex flex-col items-center justify-around font-urdu">
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

			<div className="w-full mb-4 text-center space-y-2 rounded p-3">
				<h2 className="text-sm font-semibold text-black">روزانہ حدیث</h2>
				{hadith ? (
					<>
						<p>{hadith[0].hadithUrdu}</p>
						<button
							onClick={() => navigate(`/hadith-details/${hadith[0].id}`)}
							className="cursor-pointer hover:text-white duration-300 font-semibold text-xs mt-1"
						>
							مزید پڑھیں
						</button>
						<br />
					</>
				) : (
					<p>loading</p>
				)}
			</div>
		</div>
	);
};

export default RightSide;
