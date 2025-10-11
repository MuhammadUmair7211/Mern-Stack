import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import RelatedProducts from "../components/RelatedProducts";
import { addItemsToCart } from "../store/features/CartSlice";
const ProductDetailsPage = () => {
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams();
	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.product.products);
	const product = productDetails.find((product) => product._id === Number(id));

	return (
		<div className="px-4 md:px-8 lg:px-18 py-2">
			<div className="max-w-6xl mx-auto grid p-6 md:grid-cols-2 gap-12 shadow-[0_0_5px_0]">
				{/* Image Section */}
				<div className="flex relative justify-center items-center bg-gray-100">
					<img
						src={product?.image}
						alt={product?.title}
						className="w-full max-h-[300px] object-contain rounded-xl hover:scale-110 duration-300"
					/>
				</div>

				{/* Details Section */}
				<div className="flex flex-col justify-center md:p-10">
					<h1 className="text-2xl font-bold mb-2">{product?.title}</h1>
					<p className="text-gray-500 text-sm">{product?.category}</p>

					{/* Rating */}
					<div className="flex items-center mb-2">
						{Array.from({ length: 5 }).map((_, index) => (
							<FaStar
								key={index}
								size={20}
								className={`${
									index < Math.round(product?.rating)
										? "text-yellow-400"
										: "text-gray-300"
								}`}
							/>
						))}
						<span className="text-gray-600 font-medium">
							{product?.rating.toFixed(1)}
						</span>
					</div>

					{/* Description */}
					<p className="text-gray-700 leading-relaxed">
						{product?.description}
					</p>

					{/* Price */}
					<div className="text-2xl font-bold text-blue-600 mb-2">
						Rs {product?.price.toFixed(2)}
					</div>

					{/* Stock */}
					<p
						className={`font-medium ${
							product?.stock > 0 ? "text-green-600" : "text-red-500"
						}`}
					>
						{product?.stock > 0
							? `${product.stock} items in stock`
							: "Out of stock"}
					</p>

					{/* Quantity Selector */}
					<div className="flex items-center gap-4 my-4">
						<button
							onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
							className="px-4 py-1 bg-gray-200 rounded-md text-xl font-semibold hover:bg-gray-300 duration-300 cursor-pointer"
						>
							-
						</button>

						<input
							type="number"
							value={quantity}
							onChange={(e) => {
								const value = Number(e.target.value);
								if (value >= 1 && value <= 10) setQuantity(value);
							}}
							min={1}
							max={10}
							className="w-12 py-1.5 text-gray-500 text-center border border-gray-300 rounded-md"
						/>

						<button
							onClick={() => setQuantity((prev) => Math.min(prev + 1, 10))}
							className="px-4 py-1 bg-gray-200 rounded-md text-xl font-semibold hover:bg-gray-300 duration-300 cursor-pointer"
						>
							+
						</button>
					</div>
					<p className="text-sm text-gray-500 my-2">
						Total Payable Amount: Rs {(product.price * quantity).toFixed(2)}{" "}
					</p>

					{/* Add to Cart */}
					<button
						onClick={() => dispatch(addItemsToCart({...product, quantity}))}
						className="bg-blue-600 hover:bg-blue-700 duration-300 cursor-pointer text-white px-6 py-3 rounded-xl"
					>
						Add to Cart
					</button>

					{/* Flash Sale Badge */}
					{product?.flashSale && (
						<div className="mt-6 text-red-500 font-semibold text-base">
							🔥 Flash Sale! {product.boughtWithRatio}/10 people buy this
						</div>
					)}
				</div>
			</div>
			<RelatedProducts />
		</div>
	);
};

export default ProductDetailsPage;
