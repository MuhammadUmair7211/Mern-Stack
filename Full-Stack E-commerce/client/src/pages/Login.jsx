import { useState } from "react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
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
			console.log(data);

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
		<div className="min-h-[calc(100vh-400px)] flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-white shadow p-6">
				<p className="text-gray-700 text-xl md:text-2xl after:content-[''] after:h-[1.5px] after:bg-gray-600 font-prata after:block after:w-12 flex items-center gap-2 my-4">
					{isLoginPage ? "Login" : "Sign Up"}
				</p>
				<form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
					{!isLoginPage && (
						<>
							<div>
								<input
									type="text"
									placeholder="First Name"
									required
									value={formData.firstName}
									onChange={(e) =>
										setFormData({ ...formData, firstName: e.target.value })
									}
									className="w-full outline-none border border-gray-300 p-2"
								/>
							</div>
							<div>
								<input
									type="text"
									placeholder="Last Name"
									required
									value={formData.lastName}
									onChange={(e) =>
										setFormData({ ...formData, lastName: e.target.value })
									}
									className="w-full outline-none border border-gray-300 p-2"
								/>
							</div>
						</>
					)}
					<div>
						<input
							type="email"
							placeholder="Email"
							required
							value={formData.emailAddress}
							onChange={(e) =>
								setFormData({ ...formData, emailAddress: e.target.value })
							}
							className="w-full outline-none border border-gray-300 p-2"
						/>
					</div>
					<div className="">
						<input
							type="password"
							placeholder="Password"
							required
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							className="w-full outline-none border border-gray-300 p-2"
						/>
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
