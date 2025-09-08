import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
	const footerList = [
		{
			title: "Company",
			list: [
				{ name: "Home", link: "/" },
				{ name: "About us", link: "/about" },
				{ name: "Delivery", link: "/delivery" },
				{ name: "Privacy policy", link: "/privacy" },
			],
		},
		{
			title: "Get in Touch",
			list: [
				{ name: "+92-3239385125", link: "tel:+923239385125" },
				{
					name: "muhammadumair7211@gmail.com",
					link: "mailto:muhammadumair7211@gmail.com",
				},
				{
					name: "Github: MuhammadUmair7211",
					link: "https://github.com/MuhammadUmair7211",
				},
				{ name: "Linkedin: umair11", link: "https://linkedin.com/in/umair11" },
			],
		},
	];

	return (
		<footer className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-gray-50 py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Left Section */}
				<div>
					<img
						src={assets.logo}
						alt="logo"
						className="w-[120px] md:w-[145px]"
					/>

					<p className="mt-4 text-gray-600 text-sm max-w-xl">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s.
					</p>
				</div>

				{/* Right Section */}
				<div className="flex flex-wrap justify-around md:justify-end gap-8">
					{footerList.map((section, index) => (
						<div key={index}>
							<h1 className="text-lg font-semibold mb-3">{section.title}</h1>
							<ul className="space-y-2">
								{section.list.map((item, idx) => (
									<li key={idx}>
										<a
											href={item.link}
											className="text-gray-500 text-sm hover:text-black transition"
											target={item.link.startsWith("http") ? "_blank" : "_self"}
											rel="noopener noreferrer"
										>
											{item.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>

			{/* Bottom copyright */}
			<p className="text-center mt-8 text-sm text-gray-700  border-t border-gray-200 pt-4">
				© {new Date().getFullYear()} muhammadumair7211@gmail.com – All Rights
				Reserved.
			</p>
		</footer>
	);
};

export default Footer;
