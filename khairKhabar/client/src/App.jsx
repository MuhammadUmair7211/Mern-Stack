import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import CenterContent from "./components/CenterContent";
import { Toaster } from "react-hot-toast";
import { RiArrowLeftSFill } from "react-icons/ri";
import { useApp } from "./contexts/AppContext";
import { AnimatePresence } from "framer-motion";
import FollowButton from "./components/FollowButton";
import { lazy, Suspense } from "react";
import { ScaleLoader } from "react-spinners";

const Home = lazy(() => import("./pages/Home"));
const Poetry = lazy(() => import("./pages/Poetry"));
const Prose = lazy(() => import("./pages/Prose"));
const Humor = lazy(() => import("./pages/Humor"));
const Fiction = lazy(() => import("./pages/Fiction"));
const About = lazy(() => import("./pages/About"));
const PersonalBlog = lazy(() => import("./pages/PersonalBlog"));
const CharacterSketch = lazy(() => import("./pages/CharacterSketch"));
const Travelogue = lazy(() => import("./pages/Travelogue"));
const LiteraryCriticism = lazy(() => import("./pages/LiteraryCriticism"));
const LearnUrdu = lazy(() => import("./pages/LearnUrdu"));
const HistoryOfUrdu = lazy(() => import("./pages/HistoryOfUrdu"));
const Idioms = lazy(() => import("./pages/Idioms"));
const Pakistan = lazy(() => import("./pages/Pakistan"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Layout = lazy(() => import("./pages/admin/Layout"));
const AllPosts = lazy(() => import("./pages/admin/AllPosts"));
const AddNewPost = lazy(() => import("./pages/admin/AddNewPost"));
const EditPost = lazy(() => import("./pages/admin/EditPost"));
const Posts = lazy(() => import("./pages/Posts"));
const RecentPosts = lazy(() => import("./components/RecentPosts"));
const PopularPosts = lazy(() => import("./components/PopularPosts"));
const HadithDetails = lazy(() => import("./pages/HadithDetails"));
const ChangeText = lazy(() => import("./pages/admin/ChangeText"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminRoute = lazy(() => import("./pages/admin/AdminRoute"));
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
					className="lg:hidden fixed top-30 -right-2 z-50"
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
					className="flex flex-col lg:hidden fixed top-38 right-2 w-64 p-4 bg-[#7b011e] text-white shadow-lg rounded-md z-40 font-urdu text-center font-semibold"
				>
					<div className="leading-[2rem]">
						<h2 className="text-sm my-4 ">حال ہی میں اپ لوڈ کی گئی پوسٹس</h2>
						<RecentPosts />
					</div>
					<div className="leading-[2rem]">
						<h2 className="text-sm my-4 text-center">مقبول پوسٹس</h2>
						<PopularPosts />
					</div>
					<button
						onClick={() => {
							navigate("/admin-login");
							setShowSideBar(false);
						}}
						className="bg-[#f5f1e6] px-2 mt-3 lg:px-5 py-2 mb-2 rounded-full text-[#7b011e] border hover:bg-[#7b011e] hover:text-[#f5f1e6] hover:border-[#f5f1e6] duration-300 cursor-pointer text-xs"
					>
						Admin Dashboard
					</button>
					<p onClick={() => setShowSideBar(false)}>
						<FollowButton />
					</p>
				</div>
			)}
			<Suspense fallback={<ScaleLoader color="#fff" height={25} width={4} />}>
				<AnimatePresence mode="wait">
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={<Home />}>
							<Route index element={<CenterContent />} />
							<Route path="personal-blog" element={<PersonalBlog />} />
							<Route path="travelogues" element={<Travelogue />} />
							<Route
								path="literary-criticism"
								element={<LiteraryCriticism />}
							/>
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
			</Suspense>
		</div>
	);
};

export default App;
