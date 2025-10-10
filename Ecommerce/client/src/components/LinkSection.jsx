import { Link } from "react-router-dom";

const LinkSection = ({ link }) => {
	return (
		<Link
			to={link.path}
			key={link.id}
			className="bg-black text-sm rounded-md text-white px-4 py-1"
		>
			{link.name}
		</Link>
	);
};

export default LinkSection;
