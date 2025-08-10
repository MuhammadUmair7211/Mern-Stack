import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const navigate = useNavigate();
	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => setError(""), 3000);
			return () => clearTimeout(timer);
		}
	}, [error]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (data.success) {
				localStorage.setItem("user", JSON.stringify(data.user));
				alert(data.message);
				navigate("/");
			} else {
				setError(data.message);
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("Something went wrong. Try again.");
		}
	};
	return (
		<div className="min-h-screen pt-10 md:pt-18 z-50 flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="max-w-xl w-full flex flex-col bg-white rounded-lg p-6 relative"
			>
				{error && (
					<p className="text-sm text-red-500 message absolute top-5 left-60">
						{error}
					</p>
				)}
				<h1 className="text-2xl md:text-3xl font-semibold my-4 text-center text-gray-600">
					Login
				</h1>
				<div>
					<label htmlFor="email" className="block text-lg text-gray-600 mb-2">
						Email:
					</label>
					<input
						id="email"
						type="email"
						required
						className="w-full bg-slate-100 p-2 outline-none rounded-lg"
						placeholder="someone@gmail.com"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-lg text-gray-600 my-2"
					>
						Password:
					</label>
					<input
						id="password"
						type="password"
						required
						className="w-full bg-slate-100 p-2 outline-none rounded-lg"
						placeholder="enter your password"
						value={form.password}
						onChange={(e) => setForm({ ...form, password: e.target.value })}
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white w-full py-2 mt-10 hover:bg-blue-700 duration-300 cursor-pointer"
				>
					Login
				</button>
				<p className="text-sm mt-4 text-center">
					Don't have an account?{" "}
					<span
						className="text-blue-700 cursor-pointer"
						onClick={() => navigate("/register")}
					>
						Register here
					</span>
				</p>
			</form>
		</div>
	);
};

export default Login;
