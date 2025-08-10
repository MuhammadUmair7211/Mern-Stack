import { useUser } from "../contexts/UserContext";
import { FcApproval } from "react-icons/fc";
const DepositHistory = () => {
	const { deposits } = useUser();
	console.log(deposits);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-white py-10 px-4">
			<h1 className="text-xl md:text-3xl font-bold text-blue-500 mb-4 text-center">
				Deposit History
			</h1>
			{deposits.length === 0 ? (
				<div className="flex items-center justify-center mt-20">
					<h1 className="text-center text-gray-500">No deposits found</h1>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-md overflow-hidden cursor-pointer text-sm">
						<thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
							<tr>
								<th className="px-4 py-2 text-left font-semibold">#</th>
								<th className="px-4 py-2 text-left font-semibold">Name</th>
								<th className="px-4 py-2 text-left font-semibold">Email</th>
								<th className="px-4 py-2 text-left font-semibold">Amount</th>
								<th className="px-4 py-2 text-left  font-semibold">Currency</th>
								<th className="px-4 py-2 text-left font-semibold">Proof</th>
								<th className="px-4 py-2 text-center font-semibold">Status</th>
								<th className="px-4 py-2 text-center font-semibold">Date</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 text-gray-700">
							{deposits.map((deposit, index) => {
								return (
									<tr
										key={deposit._id}
										className="hover:bg-gray-50 transition duration-200"
									>
										<td className="px-4 py-2">{index + 1}</td>
										<td className="px-4 py-2">{deposit.user.username}</td>
										<td className="px-4 py-2">{deposit.user.email}</td>
										<td className="px-4 py-2">{deposit.amount}</td>
										<td className="px-4 py-2">{deposit.currency}</td>
										<td className="px-4 py-2 flex items-center gap-1">
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
										<td className="px-4 py-2 text-center">
											{deposit.status === "pending" ? (
												<span className="bg-yellow-500 text-white px-3 py-1 rounded-full">
													pending
												</span>
											) : (
												<span className="bg-green-500 text-white px-2 py-1 rounded-full">
													approved
												</span>
											)}
										</td>
										<td className="px-4 py-2 text-center">
											{new Date(deposit.createdAt).toLocaleString()}
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

export default DepositHistory;
