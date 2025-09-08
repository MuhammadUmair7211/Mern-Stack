import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";

const AddItems = () => {
	const [images, setImages] = useState({
		1: null,
		2: null,
		3: null,
		4: null,
	});

	return (
		<form className="px-4 text-gray-600 max-w-xl w-full">
			{/* Image Upload Section */}
			<div className="mt-6">
				<p className="text-gray-600 font-medium mb-2">Upload Images</p>
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
								id={`roomImage ${key}`}
								onChange={(e) =>
									setImages({ ...images, [key]: e.target.files[0] })
								}
							/>
						</label>
					))}
				</div>

				<div className="mt-2">
					<label htmlFor="product-name" className="block mb-2">
						Product name
					</label>
					<input
						type="text"
						placeholder="Type here"
						className="border border-gray-300 outline-none p-2 w-full mb-2"
					/>
				</div>
				<div>
					<label htmlFor="product-desc" className="block mb-2">
						Product description
					</label>
					<textarea
						name=""
						id="product-desc"
						placeholder="Write content here"
						className="border border-gray-300 outline-none p-2 w-full mb-2 resize-none"
					></textarea>
				</div>
				<div className="flex items-center gap-4">
					<div>
						<label htmlFor="product-category">Product category</label>
						<select
							name=""
							id=""
							className="border border-gray-300 outline-none p-2 w-full my-2"
						>
							<option value="">Men</option>
							<option value="">Women</option>
							<option value="">Kids</option>
						</select>
					</div>
					<div>
						<label htmlFor="product-subcategory">Sub category</label>
						<select
							name=""
							id=""
							className="border border-gray-300 outline-none p-2 w-full my-2"
						>
							<option value="">Top Wear</option>
							<option value="">Bottom Wear</option>
							<option value="">Winter Wear</option>
						</select>
					</div>
					<div>
						<label htmlFor="product-price">Product Price</label>
						<input
							type="number"
							placeholder="30"
							className="border border-gray-300 outline-none p-2 w-full my-2"
						/>
					</div>
				</div>
				<div className="mt-2">
					<label htmlFor="product-size" className="block">
						Product Sizes
					</label>
					<div className="flex items-center gap-6 mt-2">
						{["S", "M", "L", "XL", "XXL"].map((size, index) => (
							<label
								key={size}
								className={`flex items-center justify-center gap-1 cursor-pointer w-8 h-8 bg-gray-300 text-gray-600`}
							>
								<input
									type="checkbox"
									name="sizes"
									value={size}
									hidden
									className="accent-pink-500"
								/>
								{size}
							</label>
						))}
					</div>
				</div>
				<div className="mt-4 flex items-center gap-2">
					<input type="checkbox" id="bestseller" />
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
