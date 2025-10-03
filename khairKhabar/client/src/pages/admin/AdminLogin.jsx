import { useState } from "react";
import toast from "react-hot-toast";
import { useApp } from "../../contexts/AppContext";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
export default function AdminLogin() {
	const { navigate } = useApp();
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch("http://localhost:3000/api/auth", {
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
			navigate("/admin-layout");
		} else {
			toast.error(data.message);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
				{/* Logo / Title */}
				<p className="leading-4 text-center my-4 text-[#7b011e] md:leading-5 md:text-lg px-2">
					Khair <br />
					Khabar.com
				</p>
				<h2 className="text-2xl font-bold text-center text-gray-800">
					Admin Login
				</h2>
				<p className="text-sm text-gray-500 text-center mt-2">
					Please sign in to access the dashboard
				</p>

				{/* Form */}
				<form onSubmit={handleFormSubmit} className="mt-6 space-y-5 ">
					{/* Email */}
					<div className="relative">
						<input
							type="email"
							id="email"
							value={formData.email}
							required
							placeholder=" "
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className="peer mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 outline-none text-sm"
						/>
						<label
							htmlFor="email"
							className={`absolute left-3 text-gray-400 text-sm duration-300
      ${
				formData.email ? "-top-1 text-xs bg-white px-2" : "top-3 text-sm"
			}         
      peer-focus:-top-1 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2 cursor-pointer`}
						>
							Enter Email
						</label>
					</div>

					{/* Password */}
					<div className="relative">
						<input
							type={`${showPassword ? "text" : "password"}`}
							value={formData.password}
							required
							id="password"
							placeholder=" "
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							className="peer mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 outline-none text-sm cursor-pointer"
						/>
						<span className="absolute top-3 right-3 cursor-pointer">
							{showPassword ? (
								<IoMdEye
									size={20}
									onClick={() => setShowPassword(!showPassword)}
								/>
							) : (
								<IoMdEyeOff
									size={20}
									onClick={() => setShowPassword(!showPassword)}
								/>
							)}
						</span>
						<label
							htmlFor="password"
							className={`absolute left-3 text-gray-400 text-sm duration-300 ${
								formData.password
									? "-top-1 text-xs bg-white px-2"
									: "top-3 text-sm"
							} peer-focus:-top-1 peer-focus:text-xs peer-focus:bg-white peer-focus:px-2`}
						>
							Enter Password
						</label>
					</div>
					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-[#7b011e]  text-[#f5f1e6] py-2.5 rounded-lg hover:bg-[#f5f1e6] hover:text-[#7b011e] duration-300 cursor-pointer font-medium"
					>
						Sign In
					</button>
				</form>

				{/* Footer */}
				<p className="text-xs text-gray-500 text-center mt-6">
					© {new Date().getFullYear()} Admin Dashboard. All rights reserved.
				</p>
			</div>
		</div>
	);
}
