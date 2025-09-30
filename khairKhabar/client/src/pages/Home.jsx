import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { Outlet } from "react-router-dom";
const Home = () => {
	return (
		<div className="max-w-screen-3xl mx-auto">
			<div className="grid sm:grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] mt-32 lg:h-[86vh]">
				<LeftSide />
				<div className="bg-blue-100 p-2 lg:p-4 lg:overflow-y-auto">
					<Outlet />
				</div>
				<div className="bg-amber-200 p-2 hidden lg:block">
					<RightSide />
				</div>
			</div>
		</div>
	);
};

export default Home;
