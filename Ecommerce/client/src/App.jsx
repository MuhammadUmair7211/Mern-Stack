import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import BeautyAndHealth from "./pages/BeautyAndHealth";
import BooksAndStationary from "./pages/BooksAndStationary";
import Electronics from "./pages/Electronics";
import FashionAndApparel from "./pages/FashionAndApparel";
import GroceriesAndFoods from "./pages/GroceriesAndFoods";
import HomeAndKitchen from "./pages/HomeAndKitchen";
import SportsAndFitness from "./pages/SportsAndFitness";
import ToysAndBaby from "./pages/ToysAndBaby";
import About from "./pages/About";
import Care from "./pages/Care";
import Promo from "./pages/Promo";

const App = () => {
	const showSideBar = useSelector((state) => state.ui.showSideBar);

	return (
		<div>
			<Navbar />
			<SearchBar />
			{showSideBar && <Sidebar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/care" element={<Care />} />
				<Route path="/promo" element={<Promo />} />
				<Route path="/beauty-health" element={<BeautyAndHealth />} />
				<Route path="/books-stationary" element={<BooksAndStationary />} />
				<Route path="/electronics" element={<Electronics />} />
				<Route path="/fashion-apparel" element={<FashionAndApparel />} />
				<Route path="/groceries-food" element={<GroceriesAndFoods />} />
				<Route path="/home-kitchen" element={<HomeAndKitchen />} />
				<Route path="/sports-fitness" element={<SportsAndFitness />} />
				<Route path="/toys-baby" element={<ToysAndBaby />} />
			</Routes>
		</div>
	);
};

export default App;
