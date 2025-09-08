const OfferCard = ({ card }) => {
	return (
		<div className="mx-auto flex flex-col items-center">
			<img src={card.icon} alt="offer-icon" className="w-12" />
			<p className="mt-5 text-gray-700 font-semibold">{card.title}</p>
			<p className="text-gray-400 mb-2">{card.subtitle}</p>
		</div>
	);
};

export default OfferCard;
