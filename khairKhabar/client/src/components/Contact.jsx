import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Contact = ({ paragraph }) => {
	const links = [
		{
			path: "https://instagram.com/muhammadumair7211/",
			icon: <FaInstagram size={25} color="#E1306C" />,
		},
		{
			path: "mailto:muhammadumair7211@gmail.com",
			icon: <MdEmail size={25} color="#EA4335" />,
		},
		{
			path: "https://x.com/muhammadumair7211", // updated to X
			icon: <FaXTwitter size={25} color="#000000" />,
		},
		{
			path: "https://wa.me/923239385125",
			icon: <FaWhatsapp size={25} color="#25D366" />,
		},
	];
	return (
		<section className="mx-auto text-center">
			<div className="flex justify-center gap-2 lg:gap-4">
				{links.map((link, index) => (
					<a
						key={index}
						href={link.path}
						target="_blank"
						rel="noopener noreferrer"
						className="hover:scale-120 duration-300"
						title={link.path}
					>
						{link.icon}
					</a>
				))}
			</div>
			{paragraph}
		</section>
	);
};

export default Contact;
