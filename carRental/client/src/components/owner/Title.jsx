const Title = ({ title, subtitle }) => {
	return (
		<div>
			<h1 className="text-2xl md:text-3xl my-2 font-medium">{title}</h1>
			<p className="text-gray-500 text-medium max-w-[580px]">{subtitle}</p>
		</div>
	);
};

export default Title;
