import LeftSide from "../components/LeftSide";
import PageWrapper from "../components/PageWrapper";
import RightSide from "../components/RightSide";
import { Outlet } from "react-router-dom";
const Home = () => {
	return (
		<div className="max-w-screen-3xl mx-auto grid sm:grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] mt-29 lg:h-[87vh]">
			<LeftSide />
			<div className="p-2 lg:overflow-y-auto">
				<PageWrapper>
					<Outlet />
				</PageWrapper>
			</div>
			<div className="">
				<RightSide />
			</div>
		</div>
	);
};

export default Home;
