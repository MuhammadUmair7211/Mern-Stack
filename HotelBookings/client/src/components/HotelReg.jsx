import { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const HotelReg = () => {
	const { setShowHotelReg, getToken, axios, setIsOwner } = useAppContext();
	const [formData, setFormData] = useState({
		name: "",
		contact: "",
		address: "",
		city: "",
	});
	const handleFormSubmit = async (e) => {
		const token = await getToken();
		try {
			e.preventDefault();
			const { data } = await axios.post("/api/hotels/", formData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (data.success) {
				toast.success(data.message);
				setIsOwner(true);
				setShowHotelReg(false);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};
	return (
		<div
			onClick={() => setShowHotelReg(false)}
			className="w-full fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-black/80 z-100"
		>
			<form
				onSubmit={handleFormSubmit}
				onClick={(e) => e.stopPropagation()}
				className="flex max-w-4xl bg-white rounded-xl max-md:mx-2"
			>
				<img
					src={assets.regImage}
					alt="hotel-image"
					className="w-1/2 rounded-xl hidden md:block"
				/>

				<div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
					<img
						onClick={() => setShowHotelReg(false)}
						src={assets.closeIcon}
						alt="close-icon"
						className="w-4 h-4 absolute top-4 right-4 cursor-pointer "
					/>
					<p className="font-semibold text-lg md:text-2xl mt-6">
						Register Your Hotel
					</p>
					<div className="w-full mt-4">
						<label htmlFor="hotel-name" className="text-gray-700">
							Hotel Name
						</label>
						<input
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							type="text"
							required
							className="border border-gray-200 rounded-lg w-full mt-2 p-2"
							placeholder="Type here"
						/>
					</div>
					<div className="w-full mt-4">
						<label htmlFor="phone" className="text-gray-700">
							Phone
						</label>
						<input
							type="tel"
							value={formData.contact}
							onChange={(e) =>
								setFormData({ ...formData, contact: e.target.value })
							}
							required
							className="border border-gray-200 rounded-lg w-full mt-2 p-2"
							placeholder="Type here"
						/>
					</div>
					<div className="w-full mt-4">
						<label htmlFor="phone" className="text-gray-600">
							Address
						</label>
						<textarea
							value={formData.address}
							onChange={(e) =>
								setFormData({ ...formData, address: e.target.value })
							}
							rows={3}
							required
							className="border border-gray-200 rounded-lg w-full mt-2 p-2 resize-none"
							placeholder="Type here"
						></textarea>
					</div>
					<div className="w-full mt-4">
						<label htmlFor="phone" className="text-gray-600 block">
							City
						</label>
						<select
							value={formData.city}
							onChange={(e) =>
								setFormData({ ...formData, city: e.target.value })
							}
							required
							className="mt-2 w-full outline-none border border-gray-300 p-2 rounded-lg"
						>
							<option hidden>Select City</option>
							<option className="text-gray-500" value="Dubai">
								Dubai
							</option>
							<option className="text-gray-500" value="Singapore">
								Singapore
							</option>
							<option className="text-gray-500" value="Thailand">
								Thailand
							</option>
							<option className="text-gray-500" value="New York">
								New York
							</option>
							<option className="text-gray-500" value="London">
								London
							</option>
						</select>
					</div>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer text-white me-auto px-5 py-2 rounded-lg mt-4"
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export default HotelReg;
