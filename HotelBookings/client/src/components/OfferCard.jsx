import { assets } from "../assets/assets";

const OfferCard = ({ offer }) => {
	return (
		<div
			key={offer._id}
			style={{ backgroundImage: `url(${offer.image})` }}
			className="bg-no-repeat bg-cover flex flex-col items-start justify-between bg-center relative group rounded-xl overflow-hidden"
		>
			<div className="p-4 text-white max-w-md">
				<p className="text-xs bg-white text-black inline-block px-2 py-1 rounded-full mb-8">
					{offer.priceOff}% OFF
				</p>
				<h1 className="text-xl font-semibold">{offer.title}</h1>
				<p className="text-sm">{offer.description}</p>
				<p className="text-xs text-gray-300 my-2">
					Expires on: {new Date(offer.expiryDate).toLocaleDateString()}
				</p>
				<button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
					View Offers
					<img
						src={assets.arrowIcon}
						alt="View more arrow icon"
						className="group-hover:translate-x-1 transition-all"
					/>
				</button>
			</div>
		</div>
	);
};

export default OfferCard;
