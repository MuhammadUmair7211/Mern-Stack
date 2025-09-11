import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import toast from "react-hot-toast";
const AddItems = () => {
	const [images, setImages] = useState({
		1: null,
		2: null,
		3: null,
		4: null,
	});
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		category: "",
		subCategory: "",
		price: "",
		sizes: [],
		bestseller: false,
		images: [],
	});

	const handleSizes = (size) => {
		setFormData((prev) => ({
			...prev,
			sizes: prev.sizes.includes(size)
				? prev.sizes.filter((s) => s !== size)
				: [...prev.sizes, size],
		}));
	};
	const handleImageChange = (file, key) => {
		const newImages = { ...images, [key]: file };
		setImages(newImages);
		setFormData((prev) => ({
			...prev,
			images: Object.values(newImages).filter((img) => img !== null),
		}));
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("name", formData.name);
		data.append("description", formData.description);
		data.append("category", formData.category);
		data.append("subCategory", formData.subCategory);
		data.append("price", formData.price);
		data.append("bestseller", formData.bestseller);

		// append sizes array
		formData.sizes.forEach((size) => data.append("sizes", size));

		// append images
		formData.images.forEach((img) => data.append("images", img));

		try {
			const res = await fetch("http://localhost:3000/api/products", {
				method: "POST",
				body: data,
			});
			const result = await res.json();
			console.log(result);
			if (result.success) {
				toast.success(result.message);
				setFormData({
					name: "",
					description: "",
					category: "",
					subCategory: "",
					price: "",
					sizes: [],
					bestseller: false,
					images: [],
				});
				setImages({ 1: null, 2: null, 3: null, 4: null });
			} else {
				toast.error(result.message);
			}
		} catch (error) {
			toast.error(error);
			console.error("Error uploading product:", error);
		}
	};
	return (
		<form
			onSubmit={handleFormSubmit}
			className="px-4 text-gray-600 max-w-xl w-full"
		>
			{/* Image Upload Section */}
			<div className="mt-6">
				<p className="text-gray-600 font-medium mb-2 text-sm">Upload Images</p>
				<div className="flex items-center gap-4 flex-wrap">
					{Object.keys(images).map((key) => (
						<label
							key={key}
							htmlFor={`roomImage ${key}`}
							className="cursor-pointer rounded-lg flex items-center justify-center hover:border-blue-400 transition"
						>
							<img
								className="max-h-20"
								src={
									images[key]
										? URL.createObjectURL(images[key])
										: assets.upload_area
								}
								alt="Upload"
							/>
							<input
								type="file"
								accept="image/*"
								hidden
								required
								id={`roomImage ${key}`}
								onChange={(e) => handleImageChange(e.target.files[0], key)}
							/>
						</label>
					))}
				</div>

				<div className="mt-2">
					<label htmlFor="product-name" className="block mb-2 text-sm">
						Product name
					</label>
					<input
						type="text"
						placeholder="Product name here"
						value={formData.name}
						required
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className="border border-gray-300 outline-none p-2 w-full mb-2"
					/>
				</div>
				<div>
					<label htmlFor="product-description" className="block mb-2 text-sm">
						Product description
					</label>
					<textarea
						id="product-description"
						value={formData.description}
						required
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
						rows={3}
						placeholder="Write content here"
						className="border border-gray-300 outline-none p-2 w-full mb-2 resize-none"
					></textarea>
				</div>
				<div className="flex items-center gap-4">
					<div>
						<label htmlFor="product-category" className="text-sm">
							Product category
						</label>
						<select
							value={formData.category}
							required
							onChange={(e) =>
								setFormData({ ...formData, category: e.target.value })
							}
							className="border text-sm border-gray-300 outline-none p-2 w-full my-2"
						>
							<option hidden>Select category</option>
							<option value="Men">Men</option>
							<option value="Women">Women</option>
							<option value="Kids">Kids</option>
						</select>
					</div>
					<div>
						<label htmlFor="product-subcategory" className="text-sm">
							Sub category
						</label>
						<select
							value={formData.subCategory}
							required
							onChange={(e) =>
								setFormData({ ...formData, subCategory: e.target.value })
							}
							className="border text-sm border-gray-300  outline-none p-2 w-full my-2"
						>
							<option value="Top Wear">Top Wear</option>
							<option value="Bottom Wear">Bottom Wear</option>
							<option value="Winter Wear">Winter Wear</option>
						</select>
					</div>
					<div>
						<label htmlFor="product-price" className="text-sm">
							Product Price
						</label>
						<input
							type="number"
							placeholder="30"
							value={formData.price}
							required
							onChange={(e) =>
								setFormData({ ...formData, price: e.target.value })
							}
							className="border text-sm border-gray-300 outline-none p-2 w-full my-2"
						/>
					</div>
				</div>
				<div className="mt-2">
					<label htmlFor="product-size" className="block text-sm">
						Product Sizes
					</label>
					<div className="flex items-center gap-6 mt-2 text-sm">
						{["S", "M", "L", "XL", "XXL"].map((size) => (
							<label key={size} className="cursor-pointer relative">
								<input
									type="checkbox"
									name="sizes"
									value={size}
									onChange={() => handleSizes(size)}
									checked={formData.sizes.includes(size)}
									className="peer hidden"
								/>
								<div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-gray-600 peer-checked:bg-pink-500 peer-checked:text-white transition">
									{size}
								</div>
							</label>
						))}
					</div>
				</div>
				<div className="mt-4 flex items-center gap-2">
					<input
						type="checkbox"
						id="bestseller"
						checked={formData.bestseller}
						onChange={() =>
							setFormData({ ...formData, bestseller: !formData.bestseller })
						}
					/>
					<label htmlFor="bestseller" className="cursor-pointer">
						Add to bestseller
					</label>
				</div>
				<div className="mt-4">
					<button
						type="submit"
						className="bg-black max-w-[200px] w-full py-2 text-white cursor-pointer"
					>
						ADD
					</button>
				</div>
			</div>
		</form>
	);
};

export default AddItems;
