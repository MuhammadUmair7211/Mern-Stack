import { useEffect } from "react";
import { useState } from "react";
import { FaIdCard, FaMoneyBillWave } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RiAdminLine } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlineChartSquareBar } from "react-icons/hi";
import {
	MdCampaign,
	MdVerifiedUser,
	MdAccountBalanceWallet,
	MdDashboard,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
	const navigate = useNavigate();
	const [admin, setAdmin] = useState("");
	const [userLength, setUserLength] = useState("");
	const [adminLength, setAdminLength] = useState("");
	const cardData = [
		{
			title: "Manage Users",
			value: userLength,
			desc: "View and edit user profiles and scores",
			icon: <HiUserGroup className="w-8 h-8 text-indigo-600" />,
			bg: "bg-indigo-50",
			link: "/manage-users",
		},
		{
			title: "All Admins",
			value: adminLength,
			desc: "Manage registered admin accounts",
			icon: <RiAdminLine className="w-8 h-8 text-blue-600" />,
			bg: "bg-blue-50",
			link: "/all-admins",
		},
		{
			title: "Manage Trades",
			value: userLength,
			desc: "Update token sale plans",
			icon: <HiOutlineChartSquareBar className="w-8 h-8 text-teal-600" />,
			bg: "bg-teal-50",
			link: "/manage-trades",
		},
		{
			title: "Add Advertisement",
			value: "3",
			desc: "Upload promotional banners",
			icon: <MdCampaign className="w-8 h-8 text-yellow-600" />,
			bg: "bg-yellow-50",
			link: "/add-advertisement",
		},
		{
			title: "User Withdrawals",
			value: "30",
			desc: "Review users withdrawals",
			icon: <FaMoneyBillWave className="w-8 h-8 text-red-600" />,
			bg: "bg-red-50",
			link: "/user-withdrawal",
		},

		{
			title: "Users Deposit",
			value: "5",
			desc: "View user deposit proofs",
			icon: <MdAccountBalanceWallet className="w-8 h-8 text-orange-600" />,
			bg: "bg-orange-50",
			link: "/user-deposits",
		},
	];

	useEffect(() => {
		const adminName = localStorage.getItem("admin");
		setAdmin(adminName || "Admin");
	}, []);
	useEffect(() => {
		fetch("http://localhost:3000/api/allUser")
			.then((res) => res.json())
			.then((data) => {
				setUserLength(data.length);
			});
	}, []);

	useEffect(() => {
		fetch("http://localhost:3000/api/allAdmin")
			.then((res) => res.json())
			.then((data) => {
				setAdminLength(data.length);
			});
	}, []);
	const handleLogout = () => {
		localStorage.removeItem("admin");
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		navigate("/admin-login");
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-white py-10 px-4 flex flex-col items-center">
			<h1 className="text-3xl md:text-4xl font-bold text-blue-700 flex items-center gap-3">
				<MdDashboard className="w-8 h-8 text-blue-600" />
				Admin Panel
			</h1>
			<p className="text-sm text-center text-gray-500 mt-3 font-mono">
				Welcome to Power Digital Admin Panel – You're Logged in as {""}
				<span className="font-semibold text-blue-500 text-lg">{admin}</span>
			</p>
			<button
				onClick={handleLogout}
				className="flex items-center md:gap-1 px-2 py-1 md:px-4 md:py-2 text-white bg-blue-600 hover:bg-blue-800 rounded-full cursor-pointer mt-4 duration-300"
			>
				<IoMdLogOut size={24} />
				<span className="text-sm font-medium">Logout</span>
			</button>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl mt-7 px-2">
				{cardData.map((card, index) => (
					<Link to={card.link} key={index}>
						<div
							className={`rounded-2xl p-5 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-200 cursor-pointer ${card.bg}`}
						>
							<div className="flex items-center justify-between mb-3">
								<h2 className="text-lg font-semibold text-slate-800">
									{card.title}
								</h2>
								{card.icon}
							</div>
							<p className="text-sm text-slate-600">{card.desc}</p>
							<p className="text-3xl font-bold text-slate-900 mt-4">
								{card.value}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default AdminDashboard;
