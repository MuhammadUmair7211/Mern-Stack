import Hero from "../components/Hero";
import Subscription from "../components/Subscription";
import Title from "../components/Title";
import BestSeller from "./BestSeller";
import Collection from "./Collection";
import Offer from "./Offer";

const Home = () => {
	return (
		<>
			<Hero />
			<Title
				title1="LATEST"
				title2="COLLECTIONS"
				subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."
			/>
			<Collection />
			<Title
				title1="BEST"
				title2="SELLERS"
				subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."
			/>
			<BestSeller />
			<Offer />
			<Subscription />
		</>
	);
};

export default Home;
