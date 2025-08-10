import Navbar from "./components/Navbar";
import Base from "./components/Base";
import Home from "./pages/Home";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Deposits from "./pages/Deposits";
import Withdraw from "./pages/Withdraw";
import Ieo from "./pages/CustomerSupport";
import Staking from "./pages/Staking";
import Market from "./pages/Market";
import Mining from "./pages/Mining";
import Contract from "./pages/Contract";
import Assets from "./pages/Assets";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import AdminLogin from "./pages/adminAuthentication/AdminLogin";
import AdminRegister from "./pages/adminAuthentication/AdminRegister";
import UserLogin from "./pages/userAuthentication/UserLogin";
import UserRegister from "./pages/userAuthentication/UserRegister";
import NotFound from "./pages/NotFound";
import AdminPrivateRoute from "./pages/adminAuthentication/AdminPrivateRoute";
import AllAdmin from "./pages/adminPages/AllAdmin";
import ManageUser from "./pages/adminPages/ManageUser";
import ApproveDeposit from "./pages/adminPages/ApproveDeposit";
import UserWithdrawal from "./pages/adminPages/UserWithdrawal";
import UserDeposit from "./pages/adminPages/UserDeposit";
import UserProtectedRoute from "./pages/userAuthentication/UserProtectedRoute";
import ManageTrades from "./pages/adminPages/ManageTrades";
import DepositHistory from "./pages/DepositHistory";
import AddAdvertisement from "./pages/adminPages/AddAdvertisement";

function App() {
	const location = useLocation();
	const hideNavbarRoutes = ["/contract", "/assets", "/market", "/mining"];
	const hideAllRoutes = [
		"/user-login",
		"/user-register",
		"/admin-login",
		"/admin-register",
		"/admin-dashboard",
		"/manage-users",
		"/all-admins",
		"/approve-deposit",
		"/user-withdrawal",
		"/manage-trades",
		"/user-deposits",
		"/add-advertisement",
		"/deposits",
		"/withdraw",
		"/customer-support",
		"/staking",
		"/deposit-history",
		"/",
		"*",
	];

	const isNotFound = location.pathname === "*";
	const showNavbar =
		!hideNavbarRoutes.includes(location.pathname) &&
		!hideAllRoutes.includes(location.pathname) &&
		!isNotFound;
	const showBase = !hideAllRoutes.includes(location.pathname) && !isNotFound;
	return (
		<div>
			{showNavbar && <Navbar />}
			<Routes>
				<Route path="/" element={<Navigate to="/user-login" />} />
				<Route path="/user-login" element={<UserLogin />} />
				<Route path="/user-register" element={<UserRegister />} />
				<Route path="/admin-login" element={<AdminLogin />} />
				<Route path="/admin-register" element={<AdminRegister />} />
				<Route path="/manage-users" element={<ManageUser />} />
				<Route path="/all-admins" element={<AllAdmin />} />
				<Route path="/approve-deposit" element={<ApproveDeposit />} />
				<Route path="/user-withdrawal" element={<UserWithdrawal />} />
				<Route path="/manage-trades" element={<ManageTrades />} />
				<Route path="/user-deposits" element={<UserDeposit />} />
				<Route path="/deposit-history" element={<DepositHistory />} />

				<Route
					path="/admin-dashboard"
					element={
						<AdminPrivateRoute>
							<AdminDashboard />
						</AdminPrivateRoute>
					}
				/>

				<Route path="*" element={<NotFound />} />
				<Route
					path="/home"
					element={
						<UserProtectedRoute>
							<Home />
						</UserProtectedRoute>
					}
				/>
				<Route path="/deposits" element={<Deposits />} />
				<Route path="/withdraw" element={<Withdraw />} />
				<Route path="/customer-support" element={<Ieo />} />
				<Route path="/staking" element={<Staking />} />
				<Route path="/add-advertisement" element={<AddAdvertisement />} />
				<Route path="/market" element={<Market />} />
				<Route path="/mining" element={<Mining />} />
				<Route path="/contract" element={<Contract />} />
				<Route
					path="/assets"
					element={
						<Assets
							totalBalance={1000}
							totalDeposit={500}
							totalProfit={200}
							credit={300}
						/>
					}
				/>
			</Routes>
			{showBase && <Base />}
		</div>
	);
}

export default App;
