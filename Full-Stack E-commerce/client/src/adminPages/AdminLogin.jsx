import { useState } from "react";

import toast from "react-hot-toast";
import { useApp } from "../context/AppContext";
const AdminLogin = () => {
	const { navigate, setAdminEmail } = useApp();
	const [formData, setFormData] = useState({
		adminEmail: "",
		adminPassword: "",
	});
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/api/admin/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			console.log(data);
			if (data.success) {
				toast.success(data.message);
				setAdminEmail(data.admin);
				localStorage.setItem("admin", JSON.stringify(data.admin));
				setFormData({ adminEmail: "", adminPassword: "" });
				navigate("/admin");
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="flex items-center justify-center h-screen">
			<form
				onSubmit={handleFormSubmit}
				className="max-w-md w-full shadow-[0_0_5px_0] px-4 py-6"
			>
				<h1 className="text-xl font-semibold my-2">Admin Panel</h1>
				<div>
					<label htmlFor="email" className="block text-gray-700 mb-2">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						required
						value={formData.adminEmail}
						onChange={(e) =>
							setFormData({ ...formData, adminEmail: e.target.value })
						}
						className="w-full border border-gray-200 p-2 outline-none mb-1"
						placeholder="enter admin email"
					/>
				</div>
				<label htmlFor="password" className="block text-gray-700 mb-2">
					Password
				</label>
				<input
					type="password"
					id="password"
					required
					value={formData.adminPassword}
					onChange={(e) =>
						setFormData({ ...formData, adminPassword: e.target.value })
					}
					className="w-full border border-gray-200 p-2 outline-none"
					placeholder="enter admin password"
				/>
				<div>
					<button
						type="submit"
						className="bg-black w-full text-white mt-4 py-2 cursor-pointer"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminLogin;
