import { useLocation } from "react-router-dom";

const Thanks = () => {
	const { state } = useLocation();
	const { user, total } = state || {};
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h2>Thank you, {user?.fullname}!</h2>
				<p>Your order of ${total.toFixed(2)} has been received.</p>
				<p>You will receive your order in a week from now.!</p>
				<h2 className="text-2xl font-semibold p-6 text-center text-gray-700">
					Hope you enjoyed with us... 👋
				</h2>
			</div>
		</div>
	);
};

export default Thanks;
