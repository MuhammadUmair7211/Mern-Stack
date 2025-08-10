import { useState } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
const ManageTrades = () => {
	const [trades, setTrades] = useState([]);
	const [select, setSelect] = useState({});

	const fetchTrades = async () => {
		const token = localStorage.getItem("token");

		try {
			const res = await fetch(
				"http://localhost:3000/api/userTrade/admin-manage-trade",
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
	const handleDelete = async (tradeId) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this trade?"
		);
		if (!confirmed) return;
		const res = await fetch(`http://localhost:3000/api/userTrade/${tradeId}`, {
			method: "DELETE",
		});
		if (res.ok) {
			setTrades((prevTrade) => prevTrade.filter((d) => d._id !== tradeId._id));
			fetchTrades();
		}
	};

	const handleFormSubmit = async (e, tradeId) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		try {
			const res = await fetch(
				`http://localhost:3000/api/userTrade/admin-mark-result/${tradeId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ result: select[tradeId] }),
				}
			);
			const data = await res.json();
			if (!res.ok) {
				alert("Failed: " + data.message);
				return;
			}
			fetchTrades();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-white py-10 px-4">
			<h1 className="text-center font-bold text-2xl text-blue-500 mb-3">
				Admin Manage Trades
			</h1>
			<form
				action=""
				className="mx-auto max-w-3xl flex items-center gap-4 rounded-lg overflow-hidden justify-between border border-gray-200 mb-3"
			>
				<input
					type="search"
					className="w-full px-4 py-2 border-none outline-none bg-gray-100"
					placeholder="search users"
				/>
				<button className="bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer text-white px-4 py-2">
					Search
				</button>
			</form>
			<div className="overflow-x-auto">
				{trades.length > 0 ? (
					<table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-md overflow-hidden cursor-pointer text-sm">
						<thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
							<tr>
								<th className="px-4 py-2 text-left">User</th>
								<th className="px-4 py-2 text-left">Pair</th>
								<th className="px-4 py-2 text-left">Direction</th>
								<th className="px-4 py-2 text-center">Amount</th>
								<th className="px-4 py-2 text-center">Yield (%)</th>
								<th className="px-4 py-2 text-center">Expiry (s)</th>
								<th className="px-4 py-2 text-right">Value</th>
								<th className="px-4 py-2 text-center">Status</th>
								<th className="px-4 py-2 text-center">Result</th>
								<th className="px-4 py-2 text-center">Created At</th>
								<th className="px-4 py-2 text-center">Action</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 text-gray-700">
							{trades.map((trade) => {
								return (
									<tr
										key={trade._id}
										className="hover:bg-gray-50 transition duration-200"
									>
										<td className="px-4 py-2 whitespace-nowrap">
											{trade.user.username}
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											{trade.pair}
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											{trade.tradeDirection === "Buy Up" ? (
												<span className="text-green-500 font-semibold">
													📈 Buy Up
												</span>
											) : (
												<span className="text-red-500 font-semibold">
													📉 Buy Down
												</span>
											)}
										</td>
										<td className="px-4 py-2 text-center whitespace-nowrap">
											${trade.investmentAmount}
										</td>
										<td className="px-4 text-center py-2 whitespace-nowrap">
											{trade.result === "profit" ? (
												<span className="bg-green-500 text-white px-5 py-1 rounded-lg">
													{trade.yield}%
												</span>
											) : trade.result === "pending" ? (
												<span className="bg-yellow-500 text-white px-2 py-1 rounded-lg">
													pending
												</span>
											) : (
												<span className="bg-red-600 text-white px-5 py-1 font-semibold rounded-lg">
													loss
												</span>
											)}
										</td>
										<td className="px-4 py-2 font-semibold whitespace-nowrap text-center">
											{trade.expiryTime}s
										</td>
										<td className="px-4 py-2 whitespace-nowrap text-right">
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
												<span className="text-green-500 font-semibold">
													open
												</span>
											) : (
												<span className="text-red-500 font-semibold">
													closed
												</span>
											)}
										</td>
										<td className="px-4 py-2 whitespace-nowrap text-center">
											{trade.result === "pending" ? (
												<span className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-lg">
													pending
												</span>
											) : trade.result === "profit" ? (
												<span className="bg-green-500  text-white text-sm px-4 py-1 rounded-lg">
													profit
												</span>
											) : (
												<span className="bg-red-500 text-white text-sm px-5 py-1 rounded-lg">
													loss
												</span>
											)}
										</td>
										<td className="px-4 py-2 text-center whitespace-nowrap">
											{new Date(trade.createdAt).toLocaleString()}
										</td>
										<td className="px-4 py-2 whitespace-nowrap flex items-center gap-2 text-center">
											{trade.status === "open" ? (
												<form
													onSubmit={(e) => handleFormSubmit(e, trade._id)}
													className="flex items-center gap-2"
												>
													<select
														className="px-2 py-1 border border-gray-500 outline-none cursor-pointer"
														value={select[trade._id]}
														onChange={(e) =>
															setSelect((prev) => ({
																...prev,
																[trade._id]: e.target.value,
															}))
														}
													>
														<option hidden>Select Result</option>
														<option value="profit">profit</option>
														<option value="loss">loss</option>
													</select>
													<button
														type="submit"
														className="bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-700 duration-300 text-white px-3 py-1"
													>
														Submit
													</button>
												</form>
											) : (
												<button
													onClick={() => handleDelete(trade._id)}
													className="flex  items-center gap-1 bg-red-500 text-white hover:bg-red-600 duration-300 px-4 py-1 rounded-lg cursor-pointer"
												>
													<MdDelete />
													Delete
												</button>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : (
					<div className="flex items-center justify-center mt-20">
						<p className="text-gray-500 md:text-2xl font-semibold">
							No Trade history available...
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ManageTrades;
