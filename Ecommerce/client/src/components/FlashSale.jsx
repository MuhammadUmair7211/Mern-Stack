import { IoIosFlash } from "react-icons/io";
import Clock from "./Clock";
import SaleSection from "./SaleSection";
const FlashSale = () => {
	return (
		<section className="mt-6">
			<div className="flex items-center space-x-4">
				<div className="flex items-center gap-2">
					<IoIosFlash className="bg-black text-white rounded-full lg:text-2xl" />
					<span className="text-lg font-bold">Flash Sale</span>
				</div>
				<Clock />
			</div>
			<SaleSection />
		</section>
	);
};

export default FlashSale;
