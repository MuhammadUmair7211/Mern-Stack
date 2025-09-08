const AdminLogin = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<form className="max-w-md w-full shadow-[0_0_5px_0] px-4 py-6">
				<h1 className="text-xl font-semibold my-2">Admin Panel</h1>
				<div>
					<label htmlFor="email" className="block text-gray-700 mb-2">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						className="w-full border border-gray-200 p-2 outline-none mb-1"
						placeholder="enter admin email"
					/>
				</div>
				<label htmlFor="password" className="block text-gray-700 mb-2">
					Password
				</label>
				<input
					type="password"
					id="password"
					className="w-full border border-gray-200 p-2 outline-none"
					placeholder="enter admin password"
				/>
				<div>
					<button className="bg-black w-full text-white mt-4 py-2 cursor-pointer">
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminLogin;
