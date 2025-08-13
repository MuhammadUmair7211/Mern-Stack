import { testimonials } from "../assets/assets";
import Title from "../components/Title";
import { FaStar } from "react-icons/fa";
const Testimonials = () => {
	return (
		<div className="flex flex-col items-center bg-slate-50 px-6 pt-20 pb-20 md:px-16 lg:px-24 xl:px-32">
			<Title
				title="What Our Guests Say"
				subtitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
			/>
			<div className="flex flex-wrap items-center justify-between gap-6">
				{testimonials.map((testimonial) => {

					return (
						<div
							key={testimonial.id}
							className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-md mx-auto"
						>
							<img
								src={testimonial.image}
								className="w-20 h-20 rounded-full object-cover mb-4"
							/>
							<h2 className="text-lg font-semibold text-gray-800">
								{testimonial.name}
							</h2>
							<p className="text-sm text-gray-500 mb-2">
								{testimonial.address}
							</p>

							<div className="flex items-center justify-center mb-4">
								{Array.from({ length: 5 }).map((_, index) => (
									<FaStar
										key={index}
										className={`h-4 w-4 ${
											index < testimonial.rating
												? "text-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>

							<p className="text-gray-600 text-sm italic">
								"{testimonial.review}"
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Testimonials;
