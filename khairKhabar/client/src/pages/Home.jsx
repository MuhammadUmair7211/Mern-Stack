import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { Outlet } from "react-router-dom";
const Home = () => {
	return (
		<div className="max-w-screen-3xl mx-auto p-2">
			<div className="grid sm:grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] lg:h-[84vh]">
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
