import { useParams } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

const HadithDetails = () => {
	const { hadith } = useApp();
	const { id } = useParams();

	const filteredHadith = hadith?.filter((h) => {
		return h.id === Number(id);
	});
	return (
		<div className="font-urdu text-right">
			<h2 className="text-2xl font-bold text-center mb-6 pb-2">احادیث</h2>

			{filteredHadith?.map((had) => {
				return (
					<div
						key={had.id}
						className="p-4 border rounded-lg text-black space-y-6"
					>
						{/* Book & Author */}
						<div className="border-b pb-2">
							<h2 className="text-lg font-semibold">
								{had.book.bookName} – Hadith #{had.hadithNumber}
							</h2>
							<p className="text-sm">
								{had.book.writerName} (وفات: {had.book.writerDeath})
							</p>
						</div>

						{/* Narrator */}
						<div>
							<h3 className="text-sm font-medium">راوی:</h3>
							<p className="text-gray-800 leading-relaxed">
								{had.urduNarrator}
							</p>
						</div>

						{/* Arabic */}
						<div className="border-r-4 border-green-500 pr-3">
							<p className="text-lg font-arabic leading-loose">
								{had.hadithArabic}
							</p>
						</div>

						{/* Urdu Translation */}
						<div>
							<h3 className="text-sm font-medium">ترجمہ:</h3>
							<p className="leading-[2rem]">{had.hadithUrdu}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default HadithDetails;
