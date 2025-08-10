import { useState, useEffect } from "react";

const ManageUser = () => {
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/api/allUser")
			.then((res) => res.json())
			.then((data) => {
				setAllUsers(data);
			});
	}, []);
	const handleChange = (index, field, value) => {
		console.log(index, field, value);
		const updatedUser = [...allUsers];
		updatedUser[index][field] = value;
		setAllUsers(updatedUser);
	};

	const handleUpdate = async (user) => {
		try {
			const res = await fetch(`http://localhost:3000/api/allUser/${user._id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					credit: parseFloat(user.credit) || 0,
					profit: parseFloat(user.profit) || 0,
					deposit: parseFloat(user.deposit) || 0,
				}),
			});

			const data = await res.json();
			console.log(data);

			if (!res.ok) throw new Error(data.message || "Failed to update user");
			alert(`${data.message}`);
		} catch (err) {
			console.error("Update error:", err);
			alert("Failed to update user.");
		}
	};

	const handleReset = async (user) => {
		try {
			const res = await fetch(
				`http://localhost:3000/api/allUser/${user._id}/reset-balances`,
				{
					method: "PUT",
				}
			);
			if (!res.ok) throw new Error("Reset failed");
			const updated = await res.json();
			setAllUsers((prevUsers) =>
				prevUsers.map((u) => (u._id === updated._id ? updated : u))
			);
			setTimeout(() => {
				alert(`${user.username}'s balances have been reset.`);
			}, 1000);
		} catch (err) {
			console.error("Reset error:", err);
			alert("Failed to reset balances.");
		}
	};

	const handleDelete = async (user) => {
		const confirmed = window.confirm(
			`Are you sure you want to delete ${user.username}?`
		);
		if (!confirmed) return;

		try {
			const res = await fetch(`http://localhost:3000/api/allUser/${user._id}`, {
				method: "DELETE",
			});
			if (res.ok) {
				setAllUsers((users) => users.filter((u) => u._id !== user._id));
				setTimeout(() => {
					alert(`${user.username} has been deleted successfully.`);
				}, 1000);
			} else {
				console.log("failed to delete user");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-white py-10 px-4">
			<h1 className="text-center font-bold text-2xl text-blue-500 mb-3">
				Manage All Users
			</h1>
			<form
				action=""
				className="mx-auto max-w-3xl flex items-center gap-4 rounded-lg overflow-hidden justify-between border border-gray-200 mb-4"
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
				<table className="min-w-full divide-y divide-gray-200 bg-white rounded-md shadow-md overflow-hidden text-sm">
					<thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
						<tr>
							<th className="px-4 py-2 text-left">#</th>
							<th className="px-4 py-2 text-left">Username</th>
							<th className="px-4 py-2 text-left">Email</th>
							<th className="px-4 py-2 text-left">Credit</th>
							<th className="px-4 py-2 text-left">Profit</th>
							<th className="px-4 py-2 text-left">Deposit</th>
							<th className="px-4 py-2 text-left">Joined</th>
							<th className="px-4 py-2 text-center">Update</th>
							<th className="px-4 py-2 text-center">Reset</th>
							<th className="px-4 py-2 text-center">Delete</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{allUsers.map((user, index) => (
							<tr className="hover:bg-gray-50" key={index}>
								<td className="px-4 py-2">{index + 1}</td>
								<td className="px-4 py-2">{user.username}</td>
								<td className="px-4 py-2">{user.email}</td>
								<td className="px-4 py-2">
									<input
										type="number"
										value={user.credit}
										onChange={(e) =>
											handleChange(index, "credit", e.target.value)
										}
										className="w-20 sm:w-24 px-2 py-1 border border-gray-300 rounded-md outline-none"
									/>
								</td>
								<td className="px-4 py-2">
									<input
										type="number"
										value={user.profit}
										onChange={(e) =>
											handleChange(index, "profit", e.target.value)
										}
										className="w-20 sm:w-24 px-2 py-1 border border-gray-300 rounded-md outline-none"
									/>
								</td>
								<td className="px-4 py-2">
									<input
										type="number"
										value={user.deposit}
										onChange={(e) =>
											handleChange(index, "deposit", e.target.value)
										}
										className="w-20 sm:w-24 px-2 py-1 border border-gray-300 rounded-md outline-none"
									/>
								</td>
								<td className="px-4 py-2">
									{new Date(user.createdAt).toLocaleString()}
								</td>
								<td className="px-4 py-2 text-center">
									<button
										onClick={() => handleUpdate(user)}
										className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer duration-300"
									>
										Update
									</button>
								</td>
								<td className="px-4 py-2 text-center">
									<button
										onClick={() => handleReset(user)}
										className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md cursor-pointer duration-300"
									>
										Reset
									</button>
								</td>
								<td className="px-4 py-2 text-center">
									<button
										onClick={() => handleDelete(user)}
										className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md cursor-pointer duration-300"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageUser;
