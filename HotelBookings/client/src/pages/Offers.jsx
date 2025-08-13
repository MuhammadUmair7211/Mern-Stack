import { assets, exclusiveOffers } from "../assets/assets";
import OfferCard from "../components/OfferCard";

const Offers = () => {
	return (
		<div className="flex flex-col items-center px-6 pt-20 pb-20 md:px-16 lg:px-24 xl:px-32">
			<div className="flex flex-wrap items-center justify-between gap-4 w-full">
				<div>
					<h1 className="text-xl md:text-3xl font-semibold">
						Exclusive Offers
					</h1>
					<p className="text-md text-gray-500 max-w-2xl mt-2">
						Take advantage of our limited-time offers and special packages to
						enhance your stay and create unforgettable memories.
					</p>
				</div>
				<div className="border border-gray-300 px-4 py-2 hover:bg-gray-100 transition duration-300 rounded">
					<button className="group cursor-pointer flex items-center gap-2 text-sm font-medium">
						View All Offers
						<img
							src={assets.arrowIcon}
							alt="forward-arrow"
							className="group-hover:translate-x-1 transition-all duration-200"
						/>
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 w-full">
				{exclusiveOffers.map((offer) => (
					<OfferCard key={offer._id} offer={offer} />
				))}
			</div>
		</div>
	);
};

export default Offers;
