import Hero from "../components/Hero";
import FeaturedDestination from "./FeaturedDestination";
import Newsletter from "./Newsletter";
import Offers from "./Offers";
import Testimonials from "./Testimonials";

const Home = () => {
	return (
		<div>
			<Hero />
			<FeaturedDestination />
			<Offers />
			<Testimonials />
			<Newsletter />
		</div>
	);
};

export default Home;
