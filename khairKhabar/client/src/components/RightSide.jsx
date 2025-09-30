import RecentPosts from "../pages/RecentPosts";
import PopularPosts from "../pages/PopularPosts";

const RightSide = () => {
	const names = [
		{ _id: 1, title: "احمد", gender: "لڑکا" },
		{ _id: 2, title: "عائشہ", gender: "لڑکی" },
		{ _id: 3, title: "علی", gender: "لڑکا" },
		{ _id: 4, title: "مریم", gender: "لڑکی" },
		{ _id: 5, title: "فہد", gender: "لڑکا" },
		{ _id: 6, title: "زینب", gender: "لڑکی" },
	];

	return (
		<div className="flex flex-col items-center font-urdu">
			<div className="w-full mb-4 text-center space-y-1">
				<h2 className="text-sm my-4 font-semibold text-black ">
					حال ہی میں اپ لوڈ کی گئی پوسٹس
				</h2>
				<RecentPosts />
			</div>
			<div className="w-full mb-4 text-center space-y-1">
				<h2 className="text-sm my-6 text-center font-semibold text-black">
					مقبول پوسٹس
				</h2>
				<PopularPosts />
			</div>
			<div className="w-full mb-4 text-center  space-y-1">
				<h2 className="text-sm my-4 font-semibold text-black">
					مقبول اردو نام
				</h2>

				{names.map((name) => {
					return (
						<div
							className="grid grid-cols-2 border-b border-gray-300 font-urdu text-blue-500"
							key={name._id}
						>
							<div className="flex items-center justify-center gap-4">
								<p key={name._id} className="pb-2">
									{name.gender}
								</p>
								<p>:جنس</p>
							</div>
							<div className="flex items-center justify-center gap-4 ">
								<p key={name._id} className="pb-2">
									{name.title}
								</p>
								<p>:نام</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RightSide;
