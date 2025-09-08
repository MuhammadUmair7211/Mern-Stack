const Subscription = () => {
	return (
		<form className="mt-16 space-y-3 text-center mb-16">
			<h1 className="text-lg md:text-2xl text-gray-800 font-semibold">
				Subscribe now & get 20% off
			</h1>
			<p className="text-gray-400">
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry.
			</p>
			<div className="mt-4 flex items-center border border-gray-200 max-w-3xl mx-auto">
				<input
					type="email"
					placeholder="Enter your email"
					className="w-full px-4 py-2.5 outline-none"
				/>
				<button
					type="submit"
					className="bg-black px-3 md:px-6 py-3 text-white uppercase text-sm cursor-pointer hover:bg-black/90 duration-300"
				>
					Subscribe
				</button>
			</div>
		</form>
	);
};

export default Subscription;
