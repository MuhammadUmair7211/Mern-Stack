import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const ResetPassword = () => {
	const navigate = useNavigate();
	const [otp] = useState([1, 2, 3, 4, 5]);
	const [countDownMin, setCountDownMin] = useState(1);
	const [countDownSec, setCountDownSec] = useState(59);
	const timerRef = useRef(null);

	useEffect(() => {
		clearInterval(timerRef.current);

		timerRef.current = setInterval(() => {
			setCountDownSec((prevSec) => {
				if (prevSec === 0) {
					setCountDownMin((prevMin) => {
						if (prevMin === 0) {
							clearInterval(timerRef.current);
							return 0;
						}
						return prevMin - 1;
					});
					return 59;
				}
				return prevSec - 1;
			});
		}, 1000);
		return () => clearInterval(timerRef.current); // cleanup on unmount
	}, []);
	return (
		<div
			className="px-4 md:px-16 lg:px-52 flex flex-col lg:flex-row items-center justify-evenly min-h-screen gap-10 bg-cover bg-center"
			style={{ backgroundImage: `url(${assets.backgroundImage})` }}
		>
			{/* Logo Section */}
			<div className="w-full flex justify-center lg:justify-start">
				<img
					src={assets.logo_big}
					alt="Logo"
					className="w-48 md:w-72 lg:w-96 object-contain"
				/>
			</div>
			<form className="max-w-lg w-full bg-white/90 p-6 rounded-lg">
				<h1 className="text-xl text-center my-2">Enter OTP</h1>
				<div className=" flex items-center justify-between">
					{otp.map((_, i) => {
						return (
							<div key={i}>
								<input
									type="text"
									className="w-20 h-20 md:w-14 md:h-14 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						);
					})}
				</div>
				<div className="mt-4 text-sm text-red-500 flex items-center justify-between">
					<p>
						A confirmation code has been sent to your registered email address
					</p>
					<p>
						{countDownMin} :{" "}
						{countDownSec < 10 ? "0" + countDownSec : countDownSec}
					</p>
				</div>
				<button
					className="bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer mt-8 text-white px-4 py-2"
					onClick={() => navigate("/")}
				>
					Back to Login
				</button>
			</form>
		</div>
	);
};

export default ResetPassword;
