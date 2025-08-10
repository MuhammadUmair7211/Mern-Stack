import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const AllAdmin = () => {
	const adminId = localStorage.getItem("adminId");
	const [admins, setAdmins] = useState([]);
	useEffect(() => {
		fetch("http://localhost:3000/api/allAdmin")
			.then((res) => res.json())
			.then((data) => {
				setAdmins(data);
			});
	}, []);

	const handleDelete = async (adminId) => {
		const confirmed = window.confirm(
			`Are you sure you want to delete ${adminId.username} from admin?`
		);
		if (!confirmed) return;

		try {
			const res = await fetch(`http://localhost:3000/api/allAdmin/${adminId}`, {
				method: "DELETE",
			});
			if (res.ok) {
				setAdmins((prev) => prev.filter((a) => a._id !== adminId));
				alert(`${adminId.username} has been deleted successfully.`);
			} else {
				console.log("failed to delete admin");
			}
		} catch (error) {
			console.log(error);
		}
		console.log("deleted");
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-white py-10 px-4">
			<h1 className="text-center font-bold text-2xl text-blue-500 mb-3">
				Manage All Admins
			</h1>
			<form
				action=""
				className="mx-auto max-w-3xl flex items-center gap-4 rounded-lg overflow-hidden justify-between border border-gray-200 mb-3"
			>
				<input
					type="search"
					className="w-full px-4 py-2 border-none outline-none bg-gray-100"
					placeholder="search admins"
				/>
				<button className="bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer text-white px-4 py-2">
					Search
				</button>
			</form>
			<table className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
				<thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
					<tr>
						<th className="px-4 py-2 text-left">Role</th>
						<th className="px-4 py-2 text-left">Name</th>
						<th className="px-4 py-2 text-left">Email</th>
						<th className="px-4 py-2 text-left">Date Created</th>
						<th className="px-4 py-2 text-left">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{admins.map((admin, index) => (
						<tr
							key={admin._id || index}
							className="hover:bg-gray-100 transition-colors duration-150"
						>
							<td className="px-4 py-2">
								<span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
									{admin.role}
								</span>
							</td>
							<td className="px-4 py-2 mt-1 flex items-center gap-2">
								{adminId === admin._id && (
									<FaCheckCircle
										size={16}
										className="text-green-500"
										title="Logged in admin"
									/>
								)}
								<span className="text-sm font-medium text-gray-800">
									{admin.username}
								</span>
							</td>
							<td className="px-4 py-2 text-sm text-gray-600">{admin.email}</td>
							<td className="px-4 py-2 text-sm text-gray-600">
								{new Date(admin.createdAt).toLocaleString()}
							</td>
							<td className="px-4 py-2">
								<button
									disabled={admin._id === adminId}
									onClick={() => handleDelete(admin)}
									className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1.5 rounded-md transition cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AllAdmin;
