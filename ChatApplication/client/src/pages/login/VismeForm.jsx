import { useEffect } from "react";

const VismeForm = () => {
	useEffect(() => {
		// Load Visme embed script dynamically
		const script = document.createElement("script");
		script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			// cleanup if component unmounts
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div
			className="visme_d"
			data-title="Email Capture Form Template"
			data-url="8kvpvwgk-email-capture-form-template?fullPage=true"
			data-domain="forms"
			data-full-page="true"
			data-min-height="100vh"
			data-form-id="143090"
		></div>
	);
};

export default VismeForm;
