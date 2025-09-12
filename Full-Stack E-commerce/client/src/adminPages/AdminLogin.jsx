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
				className="max-w-md w-full flex flex-col gap-4 shadow-[0_0_5px_0] px-4 py-6"
			>
				<h1 className="text-xl font-semibold">Admin Panel</h1>
				<div className="relative">
					<input
						type="email"
						id="email"
						required
						value={formData.adminEmail}
						onChange={(e) =>
							setFormData({ ...formData, adminEmail: e.target.value })
						}
						className="peer w-full border border-gray-200 p-2 outline-none mb-1"
					/>
					<label
						htmlFor="email"
						className={`absolute left-2 transition-all duration-300 
      text-gray-500 text-sm ${
				formData.adminEmail
					? "-top-3 text-black/50 bg-white px-2 py-0"
					: "top-3 text-gray-400 peer-focus:-top-3 peer-focus:text-black/50 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0"
			}`}
					>
						Admin Email
					</label>
				</div>
				<div className="relative">
					<input
						type="password"
						id="password"
						required
						value={formData.adminPassword}
						onChange={(e) =>
							setFormData({ ...formData, adminPassword: e.target.value })
						}
						className="peer w-full border border-gray-200 p-2 outline-none"
					/>
					<label
						htmlFor="password"
						className={`absolute left-2 transition-all duration-300 
      text-gray-500 text-sm ${
				formData.adminPassword
					? "-top-3 text-black/50 bg-white px-2 py-0"
					: "top-3 text-gray-400 peer-focus:-top-3 peer-focus:text-black/50 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0"
			}`}
					>
						Admin Password
					</label>
				</div>
				<div>
					<button
						type="submit"
						className="bg-black w-full text-white py-2 cursor-pointer"
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminLogin;
