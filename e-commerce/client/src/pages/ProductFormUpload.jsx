import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductFormUpload = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		price: "",
		rating: "",
		description: "",
		brand: "",
		stock: "",
		returnPolicy: "",
		warranty: "",
		file: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("title", formData.title);
		data.append("price", formData.price);
		data.append("rating", formData.rating);
		data.append("description", formData.description);
		data.append("brand", formData.brand);
		data.append("stock", formData.stock);
		data.append("returnPolicy", formData.returnPolicy);
		data.append("warranty", formData.warranty);
		data.append("image", imageFile);
		try {
			const res = await fetch("http://localhost:3000/api/products/add", {
				method: "POST",
				body: data,
			});
			const result = await res.json();
			if (res.ok) {
				alert("Product uploaded successfully!");
				navigate("/products");
			} else {
				alert(result.error || "Upload failed.");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const [imageFile, setImageFile] = useState(null);
	const [filename, setFileName] = useState("No files Selected");

	return (
		<div className="p-6 min-h-screen">
			<h1 className="text-xl md:text-3xl md:font-bold mb-5">
				🆕 Add a New Product
			</h1>
			<form
				onSubmit={handleSubmit}
				className="max-w-7xl w-full border border-gray-100 bg-white p-6 rounded-lg"
			>
				<div className="flex flex-col md:flex-row items-center gap-4 mt-10">
					<div className=" max-w-lg w-full">
						<label htmlFor="" className="block mb-2">
							Title
						</label>
						<input
							name="title"
							placeholder="title"
							className="w-full bg-slate-200 p-2 rounded-lg"
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
						/>
					</div>
					<div className=" max-w-lg w-full">
						<label htmlFor="" className="block mb-2">
							Price
						</label>
						<input
							name="price"
							placeholder="Price"
							className="w-full bg-slate-200 p-2 rounded-lg"
							onChange={(e) =>
								setFormData({ ...formData, price: e.target.value })
							}
						/>
					</div>
					<div className=" max-w-lg w-full">
						<label htmlFor="" className="block mb-2">
							Rating
						</label>
						<input
							name="rating"
							placeholder="Rating"
							className="w-full bg-slate-200 p-2 rounded-lg"
							onChange={(e) =>
								setFormData({ ...formData, rating: e.target.value })
							}
						/>
					</div>
					<div className=" max-w-lg w-full">
						<label htmlFor="" className="block mb-2">
							Description
						</label>
						<input
							name="description"
							placeholder="Description"
							className="w-full bg-slate-200 p-2 rounded-lg"
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
					</div>
				</div>
				<div className="flex flex-col md:flex-row items-center gap-4 mt-10">
					<div className=" max-w-lg w-full">
						<label htmlFor="" className="block mb-2">
							Brand
						</label>
						<input
							name="brand"
							placeholder="Brand"
							className="w-full bg-slate-200 p-2 rounded-lg"
							onChange={(e) =>
								setFormData({ ...formData, brand: e.target.value })
							}
						/>
					</div>
					<div className=" max-w-lg w-full">
						<label htmlFor="" className="block mb-2">
							Stock
						</label>
						<input
							name="stock"
							placeholder="Stock"
							className="w-full bg-slate-200 p-2 rounded-lg"
							onChange={(e) =>
								setFormData({ ...formData, stock: e.target.value })
							}
						/>
					</div>
					<div className=" max-w-lg w-full">
						<label htmlFor="" className="block mb-2">
							Return Policy
						</label>
						<input
							name="returnPolicy"
							className="w-full bg-slate-200 p-2 rounded-lg"
							placeholder="Return Policy"
							onChange={(e) =>
								setFormData({ ...formData, returnPolicy: e.target.value })
							}
						/>
					</div>
					<div className=" max-w-lg w-full">
						<label htmlFor="" className="block mb-2">
							Warranty
						</label>
						<input
							name="warranty"
							placeholder="Warranty"
							className="w-full bg-slate-200 p-2 rounded-lg"
							onChange={(e) =>
								setFormData({ ...formData, warranty: e.target.value })
							}
						/>
					</div>
				</div>
				<div className="flex items-center space-x-4 mt-10">
					<label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition duration-200">
						Choose File
						<input
							type="file"
							className="hidden"
							onChange={(e) => {
								const file = e.target.files[0];
								setFileName(file ? file.name : "No file selected");
								setImageFile(file);
							}}
						/>
					</label>
					<span className="text-sm text-gray-700">{filename}</span>
				</div>
				<button
					type="submit"
					className="bg-blue-600 hover:bg-blue-700 w-full mt-4 py-2 text-white duration-300 cursor-pointer"
				>
					Upload Product
				</button>
			</form>
		</div>
	);
};

export default ProductFormUpload;
