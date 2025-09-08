import { useParams } from "react-router-dom";
import { assets, products } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";

const Products = () => {
	const { id } = useParams();
	const { cartItemsHandle } = useApp();

	const product = products.find((p) => p._id === id);
	const [selectedImage, setSelectedImage] = useState(product?.image[0]);
	useEffect(() => {
		setSelectedImage(product.image[0]);
	}, [product]);

	if (!product) {
		return (
			<h2 className="text-center mt-10 text-red-500">Product not found</h2>
		);
	}
	const handleFormSubmit = (e) => {
		e.preventDefault();
		cartItemsHandle(product);
	};
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-10">
			<div className="flex flex-col md:flex-row items-start gap-6 border-t border-gray-200 pt-10">
				{/* ✅ Thumbnail images (left side on desktop) */}
				<div className="flex flex-col gap-4 w-[100px]">
					{product.image.map((img, index) => {
						return (
							<img
								key={index}
								src={img}
								onClick={() => setSelectedImage(img)}
								className={`w-full h-auto border rounded cursor-pointer hover:opacity-80 ${
									selectedImage === img ? "border-2 border-black" : ""
								}`}
							/>
						);
					})}
				</div>

				{/* ✅ Main Product Image */}
				<div className="order-2 md:order-1 w-full md:w-1/2">
					<img
						src={selectedImage}
						alt={product.name}
						className="w-full max-w-[600px] rounded"
					/>
				</div>

				{/* ✅ Product Info */}
				<div className="order-2 md:order-1 w-full md:w-1/2 px-4">
					<div className="border-b border-gray-200 pb-6">
						<h1 className="text-2xl font-bold mb-2">{product.name}</h1>

						{/* Rating */}
						<div className="flex items-center gap-2 mb-3">
							{Array(5)
								.fill(0)
								.map((_, index) => (
									<img
										key={index}
										src={assets.star_icon}
										alt="rating"
										className="w-4"
									/>
								))}
							<span className="text-sm text-gray-500">(122)</span>
						</div>

						<p className="text-xl font-semibold text-green-700 mb-3">
							${product.price}
						</p>
						<p className="text-gray-600 mb-6 max-w-xl">{product.description}</p>

						{/* Sizes */}
						<div className="mt-4">
							<p className="text-gray-500 mb-2">Select Size</p>
							<form
								onSubmit={handleFormSubmit}
								className="flex flex-col items-start gap-3 mt-2"
							>
								<div className="flex items-center mt-2 gap-4">
									{product.sizes.map((size, index) => (
										<label
											key={index}
											className="relative flex items-center justify-center w-10 h-10 cursor-pointer rounded border border-gray-300 bg-gray-100 text-gray-500"
										>
											<input
												type="radio"
												name="product-size"
												value={size}
												required
												className="absolute opacity-0 peer"
											/>
											<span className="peer-checked:bg-black peer-checked:text-white peer-checked:border-black w-full h-full flex items-center justify-center rounded">
												{size}
											</span>
										</label>
									))}
								</div>
								<button
									type="submit"
									className="bg-black px-6 py-2 text-white mt-8 hover:bg-gray-800 cursor-pointer duration-300"
								>
									ADD TO CART
								</button>
							</form>
						</div>
					</div>

					{/* Highlights Section */}
					<div className="mt-6 text-gray-700 space-y-1">
						<p className="text-sm">100% Original product.</p>
						<p className="text-sm">Cash on delivery available.</p>
						<p className="text-sm">Easy return & exchange within 7 days.</p>
					</div>
				</div>
			</div>
			<RelatedProducts p={product} />
		</div>
	);
};

export default Products;
