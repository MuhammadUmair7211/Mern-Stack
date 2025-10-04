import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Poetry from "./pages/Poetry";
import Prose from "./pages/Prose";
import Humor from "./pages/Humor";
import Fiction from "./pages/Fiction";
import About from "./pages/About";
import PersonalBlog from "./pages/PersonalBlog";
import CharacterSketch from "./pages/CharacterSketch";
import Navigation from "./components/Navigation";
import Travelogue from "./pages/Travelogue";
import LiteraryCriticism from "./pages/LiteraryCriticism";
import LearnUrdu from "./pages/LearnUrdu";
import HistoryOfUrdu from "./pages/HistoryOfUrdu";
import Idioms from "./pages/Idioms";
import Pakistan from "./pages/Pakistan";
import CenterContent from "./components/CenterContent";
import AdminLogin from "./pages/admin/AdminLogin";
import Layout from "./pages/admin/Layout";
import AllPosts from "./pages/admin/AllPosts";
import AddNewPost from "./pages/admin/AddNewPost";
import EditPost from "./pages/admin/EditPost";
import Posts from "./pages/Posts";
import { Toaster } from "react-hot-toast";
import { RiArrowLeftSFill } from "react-icons/ri";
import { useApp } from "./contexts/AppContext";
import RecentPosts from "./pages/RecentPosts";
import PopularPosts from "./pages/PopularPosts";
import HadithDetails from "./pages/HadithDetails";
import ChangeText from "./pages/admin/ChangeText";
import { AnimatePresence } from "framer-motion";
import Profile from "./pages/Profile";
import AdminRoute from "./pages/admin/AdminRoute";
import FollowButton from "./components/FollowButton";
const App = () => {
	const location = useLocation();
	const { pathname } = location;
	const isAdminPath =
		pathname.includes("/admin") || pathname.includes("/profile");
	const { setShowSideBar, showSideBar, navigate } = useApp();
	return (
		<div>
			<Toaster position="top-right" reverseOrder={false} />
			{!isAdminPath && (
				<div className="fixed top-0 w-full z-100">
					<Header />
					<Navigation />
					<Navbar />
				</div>
			)}
			{/* Sidebar toggle icon */}
			{!isAdminPath && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="lg:hidden fixed top-32 -right-2 z-50"
				>
					<p
						onClick={() => setShowSideBar(!showSideBar)}
						className="text-xs font-light flex items-center text-[#7b011e] underline animate-pulse duration-1000 cursor-pointer"
					>
						useful <br /> links
						<RiArrowLeftSFill className="text-2xl" />
					</p>
				</div>
			)}
			{/* Sidebar */}
			{showSideBar && (
				<div
					onClick={(e) => e.stopPropagation()}
					className="flex flex-col space-y-6 lg:hidden fixed top-40 right-2 w-64 p-4 bg-[#7b011e] text-white shadow-lg rounded-md z-40 font-urdu text-center font-semibold"
				>
					<div className="leading-[2rem]">
						<h2 className="text-sm my-4 ">حال ہی میں اپ لوڈ کی گئی پوسٹس</h2>
						<RecentPosts />
					</div>
					<div className="leading-[2rem]">
						<h2 className="text-sm my-6 text-center">مقبول پوسٹس</h2>
						<PopularPosts />
					</div>
					<button
						onClick={() => {
							navigate("/admin-login");
							setShowSideBar(false);
						}}
						className="bg-[#f5f1e6] px-2 lg:px-5 py-2 mb-2 rounded-full text-[#7b011e] border hover:bg-[#7b011e] hover:text-[#f5f1e6] hover:border-[#f5f1e6] duration-300 cursor-pointer text-xs"
					>
						Admin Dashboard
					</button>
					<p onClick={() => setShowSideBar(false)}>
						<FollowButton />
					</p>
				</div>
			)}
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />}>
						<Route index element={<CenterContent />} />
						<Route path="personal-blog" element={<PersonalBlog />} />
						<Route path="travelogues" element={<Travelogue />} />
						<Route path="literary-criticism" element={<LiteraryCriticism />} />
						<Route path="learn-urdu" element={<LearnUrdu />} />
						<Route path="history-of-urdu" element={<HistoryOfUrdu />} />
						<Route path="idioms-proverbs" element={<Idioms />} />
						<Route path="poetry" element={<Poetry />} />
						<Route path="prose" element={<Prose />} />
						<Route path="humor" element={<Humor />} />
						<Route path="fiction" element={<Fiction />} />
						<Route path="character-sketches" element={<CharacterSketch />} />
						<Route path="pakistan" element={<Pakistan />} />
						<Route path="about" element={<About />} />
						<Route path="hadith-details/:id" element={<HadithDetails />} />
						<Route path="posts/:id" element={<Posts />} />
					</Route>

					<Route path="/profile/:id" element={<Profile />} />

					{/* Public route */}
					<Route path="/admin-login" element={<AdminLogin />} />

					{/* Protected routes inside Layout */}
					<Route element={<AdminRoute />}>
						<Route path="/admin-layout" element={<Layout />}>
							<Route index element={<AllPosts />} />
							<Route path="add-new-posts" element={<AddNewPost />} />
							<Route path="change-text" element={<ChangeText />} />
							<Route path="edit-post/:id" element={<EditPost />} />
						</Route>
					</Route>
				</Routes>
			</AnimatePresence>
		</div>
	);
};

export default App;
