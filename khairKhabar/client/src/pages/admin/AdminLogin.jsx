import { useState } from "react";

export default function AdminLogin() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
				{/* Logo / Title */}
				<h2 className="text-2xl font-bold text-center text-gray-800">
					Admin Login
				</h2>
				<p className="text-sm text-gray-500 text-center mt-2">
					Please sign in to access the dashboard
				</p>

				{/* Form */}
				<form className="mt-6 space-y-5">
					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							value={formData.email}
							required
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							placeholder="admin@example.com"
							className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none transition text-sm"
						/>
					</div>

					{/* Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							placeholder="••••••••"
							value={formData.password}
							required
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-800 focus:border-gray-800 outline-none transition text-sm"
						/>
					</div>

					{/* Remember + Forgot */}
					<div className="flex items-center justify-between text-sm">
						<label className="flex items-center gap-2">
							<input type="checkbox" className="rounded text-gray-800" />
							Remember me
						</label>
						<a href="#" className="text-gray-600 hover:text-gray-900">
							Forgot password?
						</a>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-700 transition font-medium"
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
