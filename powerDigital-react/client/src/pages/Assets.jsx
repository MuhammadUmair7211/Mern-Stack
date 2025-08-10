import { FaUserTie } from "react-icons/fa";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
const Assets = () => {
	const user = useUser();
	const [trades, setTrades] = useState([]);
	const fetchTrades = async () => {
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(
				"http://localhost:3000/api/userTrade/user-trade-history",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`, // ✅ Send token here
					},
				}
			);

			const data = await res.json();
			console.log(data);
			setTrades(data);
		} catch (error) {
			console.error("Error fetching trades:", error);
		}
	};
	useEffect(() => {
		fetchTrades();
	}, []);
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-white py-6 px-4">
			{user && (
				<div className="px-5 py-2 inline-block rounded-xl mb-2 cursor-pointer hover:shadow-[0_0_5px_0] duration-300">
					<h3 className="text-2xl font-semibold flex items-center mb-2">
						Account Summary
					</h3>
					<p className="flex items-center gap-2 text-lg md:text-2xl font-semibold">
						<FaUserTie />
						<span>{user?.user.username}</span>
					</p>
					<p>
						<strong>Total Balance:</strong>
						<span className="text-green-500 font-mono font-bold text-xl ml-2">
							$
							{parseInt(user.user.profit) +
								parseInt(user.user.deposit) +
								parseInt(user.user.credit)}
						</span>
					</p>
					<div className="mt-2 text-sm flex flex-wrap gap-2">
						<span className="font-semibold">Deposit:</span>
						<span className="text-blue-400 font-bold">
							${user.user.deposit}
						</span>
						<span className="text-gray-500">|</span>
						<span className="font-semibold">Profit:</span>
						<span className="text-yellow-400 font-bold">
							${user.user.profit}
						</span>
						<span className="text-gray-500">|</span>
						<span className="font-semibold">Credit:</span>
						<span className="text-purple-400 font-bold">
							${user.user.credit}
						</span>
					</div>
				</div>
			)}
			<h2 className="text-center text-2xl my-3">📊 Your Trades</h2>
			{trades.length > 0 ? (
				<table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-md overflow-hidden cursor-pointer text-sm">
					<thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
						<tr>
							<th className="px-4 py-2 text-left">#</th>
							<th className="px-4 py-2 text-left">Email</th>
							<th className="px-4 py-2 text-left">Pair</th>
							<th className="px-4 py-2 text-left">Direction</th>
							<th className="px-4 py-2 text-center">Amount (USDT)</th>
							<th className="px-4 py-2 text-center">Expiry (s)</th>
							<th className="px-4 py-2 text-center">Yield (%)</th>
							<th className="px-4 py-2 text-center">Value</th>
							<th className="px-4 py-2 text-center">Status</th>
							<th className="px-4 py-2 text-center">Result</th>
							<th className="px-4 py-2 text-center">Created At</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 font-semibold text-gray-700">
						{trades.map((trade, index) => (
							<tr
								key={trade._id}
								className="hover:bg-gray-50 transition-all duration-200"
							>
								<td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
								<td className="px-4 py-2 whitespace-nowrap">
									{trade.user.email}
								</td>
								<td className="px-4 py-2 font-semibold whitespace-nowrap">
									{trade.pair}
								</td>
								<td className="px-4 py-2 whitespace-nowrap font-semibold">
									{trade.tradeDirection === "Buy Up" ? (
										<span className="text-green-600">📈 Buy Up</span>
									) : (
										<span className="text-red-600">📉 Buy Down</span>
									)}
								</td>
								<td className="px-4 py-2 font-semibold whitespace-nowrap text-center">
									${parseFloat(trade.investmentAmount).toFixed(2)}
								</td>
								<td className="px-4 py-2 font-semibold whitespace-nowrap text-center">
									{trade.expiryTime}s
								</td>
								<td className="px-4 py-2 whitespace-nowrap text-center">
									{trade.result === "profit" ? (
										<span className="bg-green-500 text-white text-sm px-5 py-1 rounded-full">
											{trade.yield}%
										</span>
									) : trade.result === "pending" ? (
										<span className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">
											pending
										</span>
									) : (
										<span className="bg-red-600 text-white text-s px-5 py-1 font-semibold rounded-full">
											loss
										</span>
									)}
								</td>
								<td className="px-4 py-2 whitespace-nowrap text-center">
									{trade.result === "profit" ? (
										<span className="text-green-500 font-semibold">
											${trade.profit}
										</span>
									) : trade.result === "loss" ? (
										<span className=" text-red-500 font-semibold">
											-${trade.loss}
										</span>
									) : (
										<span className="text-yellow-500 font-semibold">
											pending
										</span>
									)}
								</td>
								<td className="px-4 py-2 whitespace-nowrap text-center">
									{trade.status === "open" ? (
										<span className="text-green-500 font-semibold">open</span>
									) : (
										<span className="text-red-500 font-semibold">closed</span>
									)}
								</td>
								<td className="px-4 py-2 whitespace-nowrap text-center">
									{trade.result === "pending" ? (
										<span className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">
											pending
										</span>
									) : trade.result === "profit" ? (
										<span className="bg-green-500 text-white text-sm px-4 py-1 rounded-full">
											profit
										</span>
									) : (
										<span className="bg-red-500 text-white text-sm px-5 py-1 rounded-full">
											loss
										</span>
									)}
								</td>

								<td className="px-4 py-2 whitespace-nowrap text-center">
									{new Date(trade.createdAt).toLocaleString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className="text-center text-slate-400 mt-6">
					You have no trades yet.
				</p>
			)}
		</div>
	);
};

export default Assets;
