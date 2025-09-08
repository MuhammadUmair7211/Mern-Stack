const Title = ({ title1, title2, subtitle }) => {
	return (
		<div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mt-16">
			<div className="flex flex-col items-center text-center">
				<h2 className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-semibold">
					<span className="text-gray-500">{title1}</span>
					<span className="text-gray-700 relative after:content-[''] after:h-[2px] after:bg-gray-600 after:block after:w-12 after:mt-1">
						{title2}
					</span>
				</h2>
				<p className="text-gray-600 text-base sm:text-lg mt-4 mb-6">
					{subtitle}
				</p>
			</div>
		</div>
	);
};

export default Title;
