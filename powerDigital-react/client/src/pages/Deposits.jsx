import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Deposits = () => {
	const navigate = useNavigate();
	const [preview, setPreview] = useState(null);
	const [formData, setFormData] = useState({
		amount: "",
		method: "Bank Transfer",
		currency: "USD",
		image: null,
	});

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
			setFormData({ ...formData, image: file });
		}
	};

	const handleSubmit = async (e) => {
		const token = localStorage.getItem("token");
		e.preventDefault();
		const data = new FormData();
		data.append("amount", formData.amount);
		data.append("currency", formData.currency);
		data.append("method", formData.method);
		data.append("proof", formData.image);
		try {
			const res = await fetch("http://localhost:3000/api/userDeposit/deposit", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: data,
			});
			if (!res.ok) return res.json({ message: "Failed to submit" });

			alert("Deposit submitted successfully. waiting for admin approval!");
			navigate("/deposit-history");
		} catch (error) {
			alert("Failed to submit deposit", error);
		}
	};
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-2 md:px-8">
			<div className="max-w-5xl mx-auto bg-white p-4 md:p-8 rounded-xl shadow-lg border border-gray-200">
				<h1 className="text-xl md:text-3xl font-bold text-blue-500 my-4 text-center">
					Deposit Funds
				</h1>
				<form onSubmit={handleSubmit} className="space-y-8">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Amount
						</label>
						<div className="flex rounded-lg shadow-sm overflow-hidden border border-gray-300 outline-none">
							<select
								onChange={(e) =>
									setFormData({ ...formData, currency: e.target.value })
								}
								className="bg-gray-100 text-gray-700 text-sm px-3 py-2 border-r border-gray-300 focus:outline-none"
							>
								<option value="USD">USD</option>
								<option value="PKR">PKR</option>
								<option value="EUR">EUR</option>
								<option value="USDT">USDT</option>
							</select>
							<input
								type="number"
								onChange={(e) =>
									setFormData({ ...formData, amount: e.target.value })
								}
								className="w-full px-4 py-2 text-gray-800 focus:outline-none"
								placeholder="Enter amount"
								required
							/>
						</div>
					</div>

					{/* Method Field */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Method
						</label>
						<select
							onChange={(e) =>
								setFormData({ ...formData, method: e.target.value })
							}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none"
						>
							<option value="Bank Transfer">Bank Transfer</option>
							<option value="JazzCash">JazzCash</option>
							<option value="EasyPaisa">EasyPaisa</option>
							<option value="USDT Wallet">USDT Wallet</option>
						</select>
					</div>

					{/* File Upload */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Upload Proof of Payment
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 duration-300 cursor-pointer"
							required
						/>
						{preview && (
							<img
								src={preview}
								alt="Preview"
								className="mt-4 w-full max-h-64 object-contain rounded-lg border border-gray-200 shadow-sm"
							/>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
					>
						Submit Deposit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Deposits;
