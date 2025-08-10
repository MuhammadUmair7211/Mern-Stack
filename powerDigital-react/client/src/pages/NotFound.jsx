import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
			<h1 className="text-6xl font-bold text-indigo-600">404</h1>
			<h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
				Page Not Found
			</h2>
			<p className="text-gray-500 mt-2">
				Sorry, the page you are looking for does not exist or has been moved.
			</p>
			<Link
				to="/"
				className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
			>
				Go to Home
			</Link>
		</div>
	);
};

export default NotFound;
