const AboutMe = () => {
	return (
		<section
			className="min-h-screen flex items-center text-gray-800 py-12 pt-20 px-4 md:px-12"
			id="about"
		>
			<div className="max-w-5xl mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
					👨‍💻 About Me
				</h2>
				<p className="text-lg md:text-xl text-gray-600 mb-6">
					Hi, I'm{" "}
					<span className="font-semibold text-blue-700">Muhammad Umair</span>, a
					passionate and self-taught{" "}
					<span className="font-semibold">MERN Stack Developer</span> from
					Mardan, Pakistan. I specialize in building fast, responsive, and
					user-friendly web apps using{" "}
					<span className="text-blue-600">
						MongoDB, Express, React, and Node.js
					</span>
					.
				</p>
				<p className="text-gray-600 text-base mb-6">
					My love for coding started with curiosity — how websites really work —
					and quickly turned into a career path. Today, I’m building full-stack
					applications, creating digital experiences, and working on a dream:
					launching my own{" "}
					<span className="font-semibold">dry fruits business</span> while
					continuing to grow as a web developer.
				</p>
				<p className="text-gray-600 text-base">
					I’m always learning, always experimenting, and always open to
					opportunities for collaboration. Let’s build something great together!
				</p>
			</div>
		</section>
	);
};

export default AboutMe;
