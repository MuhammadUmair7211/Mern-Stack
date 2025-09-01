import LeftSidebar from "../../components/LeftSidebar";
import ChatBox from "../../components/ChatBox";
import RightSidebar from "../../components/RightSidebar";
import SideBar from "../../components/SideBar";
import { useUser } from "../../context/UserContext";

const Chat = () => {
	const { showSideBar } = useUser();
	return (
		<div className="min-h-screen flex justify-center items-center bg-[#5666f6]">
			<div className="max-w-[1300px] min-h-[80vh] w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]">
				<LeftSidebar />
				<ChatBox />
				<RightSidebar />
				{showSideBar && <SideBar />}
			</div>
		</div>
	);
};

export default Chat;
