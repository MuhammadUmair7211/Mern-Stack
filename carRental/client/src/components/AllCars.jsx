import { dummyCarData } from "../assets/assets";
import CarCard from "./CarCard";

const AllCars = ({ input, setInput }) => {
	console.log(input);
	return (
		<div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
			<p className="text-gray-500 px-20 my-2">
				Showing {dummyCarData.length} cars
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
				{dummyCarData.map((cars) => {
					return (
						<div>
							<CarCard car={cars} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AllCars;
