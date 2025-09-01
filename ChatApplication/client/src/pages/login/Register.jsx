import { Link, useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
	const navigate = useNavigate();
	const [checked, setChecked] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch("http://localhost:3000/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		console.log(res);

		const data = await res.json();

		if (res.ok) {
			toast.success(data.message);
			navigate("/");
		} else {
			toast.error(data.message);
		}
	};
	return (
		<div
			className="px-4 md:px-16 lg:px-52 flex flex-col lg:flex-row items-center justify-evenly min-h-screen gap-10 bg-cover bg-center"
			style={{ backgroundImage: `url(${assets.backgroundImage})` }}
		>
			{/* Logo Section */}
			<div className="w-full flex justify-center lg:justify-start">
				<img
					src={assets.logo_big}
					alt="Logo"
					className="w-48 md:w-72 lg:w-96 object-contain"
				/>
			</div>

			{/* Form Section */}
			<form
				onSubmit={handleFormSubmit}
				className="w-full max-w-md bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-md"
			>
				<h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center lg:text-left">
					Sign Up
				</h2>

				{/* Username */}
				<div className="mb-4">
					<input
						type="text"
						value={formData.username}
						onChange={(e) =>
							setFormData({ ...formData, username: e.target.value })
						}
						placeholder="Username"
						required
						className="border border-gray-300 outline-none rounded-lg w-full px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-blue-400"
					/>
				</div>
				{/* email */}
				<div className="mb-4">
					<input
						type="email"
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
						placeholder="email"
						required
						className="border border-gray-300 outline-none rounded-lg w-full px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				{/* Password */}
				<div className="mb-4">
					<input
						type="password"
						value={formData.password}
						onChange={(e) =>
							setFormData({ ...formData, password: e.target.value })
						}
						required
						placeholder="Password"
						className="border border-gray-300 outline-none rounded-lg w-full px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				{/* Login Button */}
				<button
					disabled={!checked}
					type="submit"
					className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300 text-white py-2 md:py-3 rounded-lg font-medium disabled:bg-blue-500/50 disabled:cursor-not-allowed"
				>
					Create account
				</button>

				{/* Checkbox */}
				<div className="mt-3 flex items-center gap-2 text-sm">
					<input
						type="checkbox"
						checked={checked}
						onChange={() => setChecked(!checked)}
						id="terms"
						className="cursor-pointer"
					/>
					<label htmlFor="terms" className="text-gray-600">
						Agree to the terms of use & privacy policy
					</label>
				</div>

				{/* Links */}
				<div className="mt-4 flex flex-col gap-2 text-sm">
					<p className="text-gray-600">
						Already have an account ?{" "}
						<Link to="/" className="text-blue-500 hover:underline">
							Login here
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Register;
