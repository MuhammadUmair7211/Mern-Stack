import { useState } from "react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
const Login = () => {
	const [inputType, setInputType] = useState(false);
	const {
		isLoginPage,
		setIsLoginPage,
		navigate,
		setIsLoggedIn,
		setUser,
		setToken,
	} = useApp();
	const endPoint = isLoginPage ? "login" : "register";
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		emailAddress: "",
		password: "",
	});
	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch(`http://localhost:3000/api/auth/${endPoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (data.success) {
				toast.success(data.message);
				const newUser = {
					firstName: data.user.firstName,
					lastName: data.user.lastName,
					emailAddress: data.user.emailAddress,
				};
				setIsLoggedIn(true);
				setUser(newUser);
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", JSON.stringify(newUser));
				setToken(data.token);
				if (isLoginPage) {
					navigate("/");
				}
				setFormData({
					firstName: "",
					lastName: "",
					emailAddress: "",
					password: "",
				});
			} else {
				toast.error(data.message || "Something went wrong");
			}
		} catch (error) {
			console.error("❌ Error submitting form:", error);
			toast.error("Server error, please try again later");
		}
	};

	return (
		<div className="min-h-[calc(100vh-375px)] flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-white p-6">
				<p className="text-gray-700 text-xl md:text-2xl after:content-[''] after:h-[1.5px] after:bg-gray-600 font-prata after:block after:w-12 flex items-center gap-2 my-4">
					{isLoginPage ? "Login" : "Sign Up"}
				</p>
				<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
					{!isLoginPage && (
						<>
							<div className="relative mt-2">
								<input
									type="text"
									id="first-name"
									required
									placeholder=" "
									value={formData.firstName}
									onChange={(e) =>
										setFormData({ ...formData, firstName: e.target.value })
									}
									className="peer w-full outline-none border border-gray-300 p-2"
								/>
								<label
									htmlFor="first-name"
									className={`absolute left-2 transition-all duration-300 
      text-gray-500 text-sm ${
				formData.firstName
					? "-top-3 text-black/50 bg-white px-2 py-0"
					: "top-3 text-gray-400 peer-focus:-top-3 peer-focus:text-black/50 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0"
			}`}
								>
									First Name
								</label>
							</div>
							<div className="relative">
								<input
									type="text"
									id="last-name"
									required
									placeholder=" "
									value={formData.lastName}
									onChange={(e) =>
										setFormData({ ...formData, lastName: e.target.value })
									}
									className="peer w-full outline-none border border-gray-300 p-2"
								/>
								<label
									htmlFor="last-name"
									className={`absolute left-2 transition-all duration-300 
      text-gray-500 text-sm ${
				formData.lastName
					? "-top-3 text-black/50 bg-white px-2 py-0"
					: "top-3 text-gray-400 peer-focus:-top-3 peer-focus:text-black/50 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0"
			}`}
								>
									Last Name
								</label>
							</div>
						</>
					)}
					<div className="relative mt-2">
						<input
							type="email"
							id="email"
							required
							placeholder=" "
							value={formData.emailAddress}
							onChange={(e) =>
								setFormData({ ...formData, emailAddress: e.target.value })
							}
							className="peer w-full outline-none border border-gray-300 p-2"
						/>
						<label
							htmlFor="email"
							className={`absolute left-2 transition-all duration-300 
      text-gray-500 text-sm
      ${
				formData.emailAddress
					? "-top-3 text-black/50 bg-white px-2 py-0"
					: "top-3 text-gray-400 peer-focus:-top-3 peer-focus:text-black/50 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0"
			}`}
						>
							Email
						</label>
					</div>
					<div className="relative">
						<input
							className="peer flex-1 outline-none w-full border border-gray-300 p-2"
							type={inputType ? "text" : "password"}
							id="password"
							placeholder=" "
							required
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
						/>

						<label
							htmlFor="password"
							className={`absolute left-2 transition-all duration-300 
      text-gray-500 text-sm
      ${
				formData.password
					? "-top-3 text-black/50 bg-white px-2 py-0"
					: "top-3 text-gray-400 peer-focus:-top-3 peer-focus:text-black/50 peer-focus:bg-white peer-focus:px-2 peer-focus:py-0"
			}`}
						>
							Password
						</label>

						{inputType ? (
							<FaEye
								className="absolute right-3 top-3 cursor-pointer text-xl text-gray-600"
								onClick={() => setInputType(false)}
							/>
						) : (
							<FaEyeSlash
								className="absolute right-3 top-3 cursor-pointer text-xl text-gray-600"
								onClick={() => setInputType(true)}
							/>
						)}
					</div>

					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">Forgot your password?</p>
						<p
							onClick={() => setIsLoginPage(!isLoginPage)}
							className="text-sm text-gray-500 cursor-pointer"
						>
							{isLoginPage ? "Create account" : "Login Here"}
						</p>
					</div>
					<button
						type="submit"
						className="bg-black w-full py-2 text-white mt-2 cursor-pointer"
					>
						{isLoginPage ? "Sign In" : "Sign Up"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
