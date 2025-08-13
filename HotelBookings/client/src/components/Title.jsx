const Title = ({ title, subtitle, align }) => {
	return (
		<div className="text-center mb-8" style={{ textAlign: align }}>
			<h1 className="pt-15 text-xl md:text-3xl">{title}</h1>
			<p className="text-md text-gray-500 my-2 max-w-xl">{subtitle}</p>
		</div>
	);
};

export default Title;
