import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/adminAuth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();

			if (!data.token) {
				alert(data.message || "Login failed");
				return;
			}
			alert(data.message);
			localStorage.setItem("token", data.token);
			localStorage.setItem("role", data.user.role);
			localStorage.setItem("adminId", data.user.id);
			localStorage.setItem("admin", data.user.username);
			navigate("/admin-dashboard");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="max-w-lg w-full flex flex-col items-center gap-4 mx-auto p-8 shadow-[0_0_5px_0]">
				<div className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 151 174"
						width="50"
						height="50"
						fill="#d32f2f"
					>
						<path d="M74.5 4.5h27.1l-17.4 55.8h22.6L74.8 148.6l4.7-44.5H57.6l17.1-44.5H57.4L74.5 4.5z" />
						<path d="M75.5 0C34.1 0 0 34.1 0 75.5S34.1 151 75.5 151c41.3 0 75.5-34.1 75.5-75.5 0-21.7-9-41.3-23.5-55.1l-7.5 23.1c9.8 9.9 15.8 23.6 15.8 38.6 0 30.3-24.6 54.9-54.9 54.9S26.1 112.9 26.1 82.6 50.7 27.7 81 27.7l4.5-13.8C82.7 11.1 79.2 10.3 75.5 10.3z" />
					</svg>
					<h2 className="text-xl font-semibold">Admin Login</h2>
				</div>
				<form className="me-auto w-full" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email" className="block text-md">
							Email
						</label>
						<input
							type="email"
							placeholder="Enter your email"
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							className="block border border-gray-500 w-full mt-2 px-2 py-2 rounded-xl bg-slate-100 outline-none"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-md mt-3">
							Password
						</label>
						<input
							type="password"
							placeholder="Enter your password"
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							className="block border border-gray-500 w-full mt-2 px-2 py-2 rounded-xl bg-slate-100 outline-none"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white mt-5 py-2 rounded-lg hover:bg-blue-700 duration-300 cursor-pointer"
					>
						Login
					</button>
					<p className="text-center text-sm mt-4">
						Don't have an account?{" "}
						<Link
							to="/admin-register"
							className="text-blue-500 font-bold hover:text-blue-800 duration-200"
						>
							Register here
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
