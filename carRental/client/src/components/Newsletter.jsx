const Newsletter = () => {
	return (
		<div className="max-w-6xl py-4 mx-auto text-center">
			<h1 className="text-3xl md:text-4xl font-bold">Never Miss a Deal!</h1>
			<p className="text-gray-400 mt-2 text-lg">
				Subscribe to get the latest offers, new arrivals, and exclusive
				discounts
			</p>
			<form
				action=""
				className="mt-10 border border-borderColor max-w-[700px] flex items-center justify-between mx-auto rounded-lg overflow-hidden"
			>
				<input
					type="text"
					placeholder="Enter your email id"
					className="px-3 outline-none flex-1 py-3"
					required
				/>
				<button className="bg-primary text-white px-10 py-3 hover:bg-primary-dull duration-400 cursor-pointer rounded-lg">
					Subscribe
				</button>
			</form>
		</div>
	);
};

export default Newsletter;
