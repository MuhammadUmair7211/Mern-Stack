import { assets } from "../assets/frontend_assets/assets";
import Subscription from "../components/Subscription";
import Offer from "./Offer";

const About = () => {
	const qualitiesArray = [
		{
			name: "Quality Assurance",
			desc: "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
		},
		{
			name: "Convenience",
			desc: "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
		},
		{
			name: "Exceptional Customer Service",
			desc: "Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.",
		},
	];
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
			<div className="flex items-center justify-center my-8">
				<p className="flex items-center gap-2 text-2xl">
					<span className="text-gray-500">ABOUT</span>
					<span className="text-gray-600 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-medium flex items-center gap-2">
						US
					</span>
				</p>
			</div>
			<div className="flex flex-col md:flex-row items-center gap-16">
				{/* About Image */}
				<img
					src={assets.about_img}
					alt="about-image"
					className="max-w-lg w-full md:w-1/2 rounded-lg shadow"
				/>

				{/* About Content */}
				<div className="max-w-3xl text-gray-700 space-y-6">
					<p>
						Forever was born out of a passion for innovation and a desire to
						revolutionize the way people shop online. Our journey began with a
						simple idea: to provide a platform where customers can easily
						discover, explore, and purchase a wide range of products from the
						comfort of their homes.
					</p>

					<p>
						Since our inception, we've worked tirelessly to curate a diverse
						selection of high-quality products that cater to every taste and
						preference. From fashion and beauty to electronics and home
						essentials, we offer an extensive collection sourced from trusted
						brands and suppliers.
					</p>

					<h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
					<p>
						Our mission at Forever is to empower customers with choice,
						convenience, and confidence. We're dedicated to providing a seamless
						shopping experience that exceeds expectations, from browsing and
						ordering to delivery and beyond.
					</p>
				</div>
			</div>

			<div className="flex flex-col items-start pt-10">
				<p className="flex items-center gap-2 text-2xl">
					<span className="text-gray-500">WHY</span>
					<span className="text-gary-700 after:content-[''] after:h-[1.5px] after:bg-gray-600 after:block after:w-12 font-semibold flex items-center gap-2">
						CHOOSE US
					</span>
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{qualitiesArray.map((quality, index) => {
					return (
						<div key={index} className="border border-gray-200 p-20 mt-8">
							<p className="text-lg font-semibold">{quality.name}:</p>
							<p className="text-gray-500 text-sm mt-2">{quality.desc}</p>
						</div>
					);
				})}
			</div>
			<Subscription />
		</div>
	);
};

export default About;
