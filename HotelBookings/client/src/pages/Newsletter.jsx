import Title from "../components/Title";

const Newsletter = () => {
	return (
		<div className="flex flex-col items-center px-6 pt-20 pb-20 md:px-16 lg:px-24 xl:px-32">
			<div className="max-w-5xl w-full rounded-xl bg-gray-800 px-6 py-2 text-white">
				<Title
					title="Stay Inspired"
					subtitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
				/>
				<form className="mx-auto flex items-center flex-wrap justify-between max-w-lg ">
					<input
						type="email"
						placeholder="Enter your email"
						className="border border-gray-700 flex-1 px-4 py-2 outline-none"
					/>
					<button className="flex items-center gap-1 cursor-pointer hover:bg-black/70 duration-300 bg-black px-5 py-2">
						Subscribe
					</button>
				</form>
				<p className="text-center text-xs text-gray-500 my-8">
					By subscribing, you agree to our Privacy Policy and consent to receive
					updates.
				</p>
			</div>
		</div>
	);
};

export default Newsletter;
