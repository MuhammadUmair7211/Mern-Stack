import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [error, setError] = useState("");
	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => setError(""), 3000);
			return () => clearTimeout(timer);
		}
	}, [error]);
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3000/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await res.json();
			if (data.success) {
				alert(data.message);
				navigate("/login");
			} else {
				setError(data.message || "Registration failed");
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
			console.error("Error during registration:", error.message);
		}
	};
	return (
		<div className="min-h-screen w-full backdrop:blur-2xl pt-18 z-50 flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="max-w-xl w-full flex flex-col bg-white rounded-lg p-6 relative"
			>
				{error && (
					<p className="text-sm text-red-500 message absolute top-2 left-1/2 -translate-x-1/2">
						{error}
					</p>
				)}

				<h1 className="text-2xl md:text-3xl font-semibold my-4 text-center text-gray-600">
					Sign Up
				</h1>
				<div>
					<label htmlFor="name" className="block text-lg text-gray-600 mb-2">
						Full Name:
					</label>
					<input
						id="name"
						type="text"
						required
						value={form.name}
						className="w-full bg-slate-100 p-2 outline-none rounded-lg"
						placeholder="Enter your name"
						onChange={(e) => setForm({ ...form, name: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor="email" className="block text-lg text-gray-600 mb-2">
						Email:
					</label>
					<input
						id="email"
						type="email"
						required
						value={form.email}
						className="w-full bg-slate-100 p-2 outline-none rounded-lg"
						placeholder="someone@gmail.com"
						onChange={(e) => setForm({ ...form, email: e.target.value })}
					/>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-lg text-gray-600 mb-2"
					>
						Password:
					</label>
					<input
						id="password"
						type="password"
						required
						value={form.password}
						className="w-full bg-slate-100 p-2 outline-none rounded-lg"
						placeholder="Enter your password"
						onChange={(e) => setForm({ ...form, password: e.target.value })}
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white w-full py-2 mt-10 hover:bg-blue-700 duration-300 cursor-pointer"
				>
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
