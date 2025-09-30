import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Poetry from "./pages/Poetry";
import Prose from "./pages/Prose";
import Humor from "./pages/Humor";
import Fiction from "./pages/Fiction";
import Analysis from "./pages/Analysis";
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
const App = () => {
	const { pathname } = useLocation();
	const isAdminPath = pathname.includes("/admin");
	return (
		<div>
			{!isAdminPath && (
				<>
					<Header />
					<Navigation />
					<Navbar />
				</>
			)}
			<Routes>
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
					<Route path="analysis" element={<Analysis />} />
					<Route path="character-sketches" element={<CharacterSketch />} />
					<Route path="pakistan" element={<Pakistan />} />
					<Route path="about" element={<About />} />
					<Route path="posts/:id" element={<Posts />} />
				</Route>

				{/* Public route */}
				<Route path="/admin-login" element={<AdminLogin />} />

				{/* Protected routes inside Layout */}
				<Route path="/admin-layout" element={<Layout />}>
					<Route index element={<AllPosts />} />
					<Route path="add-new-posts" element={<AddNewPost />} />
					<Route path="edit-post/:id" element={<EditPost />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
