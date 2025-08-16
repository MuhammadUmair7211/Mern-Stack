const Title = ({ title, subtitle, align }) => {
	return (
		<div className="text-center mb-8" style={{ textAlign: align }}>
			<h1 className="pt-12 text-xl md:text-4xl">{title}</h1>
			<p className="text-md text-gray-400 my-2 max-w-xl">{subtitle}</p>
		</div>
	);
};

export default Title;
