import { useEffect } from "react";
import { useState } from "react";
import { FcApproval } from "react-icons/fc";
const UserDeposit = () => {
	const [deposits, setDeposits] = useState([]);
	const token = localStorage.getItem("token");

	useEffect(() => {
		fetch("http://localhost:3000/api/userDeposit/admin", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setDeposits(data);
			});
	}, [token]);

	const handleDelete = async (deposit) => {
		const confirmed = window.confirm(
			`Are you sure you want to delete ${deposit.amount} deposit history?`
		);
		if (!confirmed) return;

		try {
			const res = await fetch(
				`http://localhost:3000/api/userDeposit/${deposit._id}`,
				{
					method: "DELETE",
				}
			);
			if (res.ok) {
				setDeposits((prevDeposit) =>
					prevDeposit.filter((d) => d._id !== deposit._id)
				);
			} else {
				console.log("failed to delete history");
			}
		} catch (error) {
			console.log("error", error);
		}
	};
	const handleApprove = async (deposit) => {
		try {
			const res = await fetch(
				`http://localhost:3000/api/userDeposit/toggle/${deposit._id}`,
				{
					method: "PATCH",
				}
			);
			const data = await res.json();
			if (res.ok) {
				alert(`${deposit.username} deposit is now ${data.status}`);
			} else {
				console.log("failed to toggle status");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-white py-10 px-4">
			<h1 className="text-xl md:text-3xl font-bold text-blue-500 mb-3 text-center">
				Admin Manage Deposits
			</h1>
			<form
				action=""
				className="mx-auto max-w-3xl flex items-center gap-4 rounded-lg overflow-hidden justify-between border border-gray-200 mb-3"
			>
				<input
					type="search"
					className="w-full px-4 py-2 border-none outline-none bg-gray-100"
					placeholder="search user deposits"
				/>
				<button className="bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer text-white px-4 py-2">
					Search
				</button>
			</form>
			{deposits.length === 0 ? (
				<div className="flex items-center justify-center mt-20">
					<h1 className="text-center text-gray-500">No deposits found</h1>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-md overflow-hidden cursor-pointer text-sm mt-2">
						<thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
							<tr>
								<th className="px-4 py-2 text-left">#</th>
								<th className="px-4 py-2 text-left">Name</th>
								<th className="px-4 py-2 text-left">Email</th>
								<th className="px-4 py-2 text-left">Amount</th>
								<th className="px-4 py-2 text-left">Currency</th>
								<th className="px-4 py-2 text-left">Proof</th>
								<th className="px-4 py-2 text-center">Status</th>
								<th className="px-4 py-2 text-center">Date</th>
								<th className="px-4 py-2 text-center">Action</th>
								<th className="px-4 py-2 text-center">Delete</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 text-gray-700">
							{deposits.map((deposit, index) => {
								return (
									<tr
										key={deposit._id}
										className="hover:bg-gray-50 transition duration-200"
									>
										<td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>
										<td className="px-4 py-2 whitespace-nowrap">
											{deposit.user.username}
										</td>
										<td className="py-2 whitespace-nowrap">
											{deposit.user.email}
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											{deposit.amount}
										</td>
										<td className="px-4 py-2 text-center whitespace-nowrap">
											{deposit.currency}
										</td>
										<td className="px-4 py-2 whitespace-nowrap flex items-center gap-1">
											{deposit.status === "approved" ? <FcApproval /> : ""}
											<a
												href={`http://localhost:3000/uploads/${deposit.proof}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-blue-600 hover:underline"
											>
												View Proof
											</a>
										</td>
										<td className="px-4 py-2 whitespace-nowrap text-center">
											<span
												className={`px-4 py-1 rounded-full cursor-pointer text-sm ${
													deposit.status === "pending"
														? "bg-yellow-500 text-white"
														: deposit.status === "approved"
														? "bg-green-500 text-white"
														: "bg-red-100 text-red-800"
												}`}
											>
												{deposit.status}
											</span>
										</td>
										<td className="px-4 py-2 text-center">
											{new Date(deposit.createdAt).toLocaleString()}
										</td>
										<td className="px-3 py-1 text-center">
											{deposit.status === "pending" ? (
												<button
													onClick={() => handleApprove(deposit)}
													className="px-4 py-1 rounded-full text-sm bg-yellow-500 cursor-pointer hover:bg-yellow-600 duration-300 text-white"
												>
													approve
												</button>
											) : (
												<span className="px-3 py-1 rounded-full text-sm bg-green-500 cursor-pointer text-white">
													approved
												</span>
											)}
										</td>
										<td className="px-4 py-2 whitespace-nowrap text-center">
											<button
												onClick={() => handleDelete(deposit)}
												className="bg-red-500 px-3 py-1 text-white rounded-md hover:bg-red-600 duration-300 cursor-pointer"
											>
												Remove
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default UserDeposit;
