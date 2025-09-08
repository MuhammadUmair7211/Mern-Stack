import { assets } from "../assets/frontend_assets/assets";
import OfferCard from "../components/OfferCard";

const Offer = () => {
	const offers = [
		{
			icon: assets.exchange_icon,
			title: "Easy Exchange Policy",
			subtitle: "We offer hassle free exchange policy",
		},
		{
			icon: assets.quality_icon,
			title: "7 Days Return Policy",
			subtitle: "We provide 7 days free return policy",
		},
		{
			icon: assets.support_img,
			title: "Best customer support",
			subtitle: "we provide 24/7 customer support",
		},
	];
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-10 py-16">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{offers.slice(0, 5).map((card, index) => {
					return <OfferCard card={card} key={index} />;
				})}
			</div>
			
		</div>
	);
};

export default Offer;
