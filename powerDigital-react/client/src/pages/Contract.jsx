import { useEffect, useRef, useState } from "react";

const TradingPage = () => {
	const tvRef = useRef(null);
	const widgetRef = useRef(null);

	const [symbol, setSymbol] = useState("BTCUSDT");
	const [expiry, setExpiry] = useState(60);
	const [livePrice, setLivePrice] = useState("");
	const [lockedPrice, setLockedPrice] = useState("");
	const [amount, setAmount] = useState("");
	const [direction, setDirection] = useState("");
	const [countdown, setCountdown] = useState(null);

	const fetchData = async (symbol) => {
		try {
			const res = await fetch(
				`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
			);
			const data = await res.json();

			return data.price;
		} catch (error) {
			console.error("Error fetching price:", error);
			return null;
		}
	};
	useEffect(() => {
		const getPrice = async () => {
			const price = await fetchData(symbol);
			if (price !== null) {
				setLivePrice(price);
			}
		};
		getPrice();
		const intervalId = setInterval(getPrice, 5000);
		return () => clearInterval(intervalId);
	}, [symbol]);

	const [popup, setPopup] = useState({
		show: false,
		message: "",
		success: true,
	});

	const expiryOptions = [
		{ value: 60, label: "60s", yield: "20" },
		{ value: 120, label: "120s", yield: "30" },
		{ value: 180, label: "180s", yield: "40" },
		{ value: 300, label: "300s", yield: "50" },
		{ value: 360, label: "360s", yield: "60" },
	];

	const quickAmounts = [50, 100, 250, 500, 1000, 2000];

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://s3.tradingview.com/tv.js";
		script.async = true;
		script.onload = () => initChart(symbol);
		document.body.appendChild(script);
	}, [symbol]);

	useEffect(() => {
		if (widgetRef.current?.setSymbol) {
			const tvSymbol = "COINBASE:" + symbol.replace("/", "");
			widgetRef.current.setSymbol(tvSymbol, "5");
		}
	}, [symbol]);

	const initChart = (sym) => {
		const tvSymbol = "COINBASE:" + sym.replace("/", "");
		widgetRef.current = new window.TradingView.widget({
			container_id: "tv_chart",
			width: "100%",
			height: 540,
			symbol: tvSymbol,
			interval: "5",
			timezone: "Etc/UTC",
			theme: "light",
			style: "1",
			locale: "en",
			toolbar_bg: "#1e293b",
			enable_publishing: false,
			withdateranges: true,
			allow_symbol_change: true,
			hide_top_toolbar: false,
			hide_side_toolbar: false,
			studies: ["MACD@tv-basicstudies"],
			details: true,
			hotlist: true,
		});
	};

	const handleTrade = async (e) => {
		e.preventDefault();

		if (!amount || !direction) {
			setPopup({
				show: true,
				message: "All fields are required",
				success: false,
			});
			return;
		}

		const price = await fetchData(symbol);

		if (price === null) {
			setPopup({
				show: true,
				message: "❌ Failed to fetch live price from Binance",
				success: false,
			});
			return;
		}
		setLockedPrice(price);

		const tradeData = {
			pair: symbol,
			expiryTime: expiry,
			yield: expiryOptions.find((opt) => opt.value === expiry)?.yield,
			investmentAmount: amount,
			tradeDirection: direction === "up" ? "Buy Up" : "Buy Down",
			lockedPrice: price,
		};

		const token = localStorage.getItem("token");
		try {
			const res = await fetch("http://localhost:3000/api/userTrade", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(tradeData),
			});

			const result = await res.json();
			console.log(result);
			if (!res.ok) {
				setPopup({
					show: true,
					success: false,
					message: <span className="text-red-500">{result.message}</span>,
				});
				return;
			}
			if (res.ok) {
				setPopup({
					show: true,
					message: "✅ Trade placed successfully",
					success: true,
				});

				setTimeout(() => {
					setPopup((prev) => ({ ...prev, show: !prev.show }));
				}, 1000);
			} else {
				setPopup({
					show: true,
					message: `❌ ${result.message || "Failed to place trade"}`,
					success: false,
				});
			}
		} catch (error) {
			return setPopup({
				show: true,
				message: "❌ Server error",
				success: false,
				error,
			});
		}
		setCountdown(expiry);

		const interval = setInterval(async () => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					const token = localStorage.getItem("token");
					fetch(
						`http://localhost:3000/api/userTrade/trade-result?symbol=${symbol}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						}
					)
						.then((res) => res.json())
						.then((data) => {
							console.log(data);

							setPopup({
								show: true,
								success: true,
								message: (
									<div className="space-y-1 text-sm">
										<div>
											<span className="text-blue-600 font-medium">
												Locked Price:&nbsp;
											</span>
											<span>${data.entry?.$numberDecimal || data.entry}</span>
										</div>
										<div>
											<span className="text-red-600 font-medium">
												Exit Price:&nbsp;
											</span>
											<span>${data.exit}</span>
										</div>
										<div>
											{data.result === "profit" ? (
												<span className="text-green-600 font-semibold">
													Congratulations! You've earned ${data.profit}.
												</span>
											) : (
												<span className="text-red-600 font-semibold">
													Trade ended in a loss of ${data.loss}.
												</span>
											)}
										</div>
									</div>
								),
							});
						});

					return null;
				}
				return prev - 1;
			});
		}, 1000);
	};

	return (
		<div className="p-2 min-h-screen mb-16">
			<div
				id="tv_chart"
				ref={tvRef}
				className="mb-10 overflow-hidden"
				style={{ height: "540px" }}
			/>

			<form
				onSubmit={handleTrade}
				className="max-w-6xl pb-20 mx-auto border border-gray-200 p-6 rounded-xl shadow-lg"
			>
				{/* Trading Pair */}
				<div className="mb-3">
					<label className="block mb-2 text-sm font-medium">
						Select Trading Pair
					</label>
					<select
						value={symbol}
						onChange={(e) => setSymbol(e.target.value)}
						className="w-full p-3 rounded-lg border border-gray-200 cursor-pointer bg-gray-100 "
					>
						{["BTC", "ETH", "BNB", "SOL", "XRP", "ADA", "MATIC"].map((coin) => (
							<option key={coin} value={`${coin}USDT`}>
								{coin}/USDT
							</option>
						))}
					</select>
				</div>
				<div className="mb-3">
					<p className="text-green-600 font-semibold text-sm">
						Live Price: {livePrice ? `$${livePrice}` : "Loading..."}
					</p>
				</div>

				{/* Expiry Time */}
				<div className="mb-6">
					<label className="block mb-2 text-sm font-medium">
						Select Expiry Time
					</label>
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
						{expiryOptions.map((opt) => (
							<label
								key={opt.value}
								className={`p-3 rounded-lg border cursor-pointer ${
									expiry === opt.value
										? "ring-2 ring-blue-400 border-blue-400"
										: "border-gray-600"
								}`}
							>
								<input
									type="radio"
									className="mr-2"
									name="expiry"
									value={opt.value}
									checked={expiry === opt.value}
									onChange={() => setExpiry(opt.value)}
								/>
								{opt.label}{" "}
								<small className="text-xs text-gray-400">
									({opt.yield}% Yield)
								</small>
							</label>
						))}
					</div>
				</div>

				{/* Investment Amount */}
				<div className="mb-6">
					<label className="block mb-2 text-sm font-medium">
						Investment Amount (USDT)
					</label>
					<div className="flex flex-wrap gap-3 my-4">
						{quickAmounts.map((amt) => (
							<button
								type="button"
								key={amt}
								className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition-all ${
									amount === amt
										? "bg-indigo-600 text-white"
										: "bg-gray-700 text-gray-300 hover:bg-gray-600 duration-300"
								}`}
								onClick={() => setAmount(amt)}
							>
								{amt}
							</button>
						))}
					</div>
					<input
						type="number"
						placeholder="Or enter a custom amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className="w-full p-3 rounded-lg border border-gray-300 "
					/>
				</div>

				{/* Trade Direction */}
				<div className="mb-6">
					<label className="block mb-2 text-sm font-medium">
						Trade Direction
					</label>
					<div className="flex gap-4">
						<label
							className={`flex-1 text-center p-3 rounded-lg cursor-pointer duration-300 bg-green-600 text-white hover:bg-green-500 ${
								direction === "up" ? "ring-2 ring-green-300" : ""
							}`}
						>
							<input
								type="radio"
								name="direction"
								value="up"
								checked={direction === "up"}
								onChange={() => setDirection("up")}
								className="mr-2"
							/>
							Buy Up
						</label>
						<label
							className={`flex-1 text-center p-3 rounded-lg cursor-pointer duration-300 bg-red-600 text-white hover:bg-red-500 ${
								direction === "down" ? "ring-2 ring-red-300" : ""
							}`}
						>
							<input
								type="radio"
								name="direction"
								value="down"
								checked={direction === "down"}
								onChange={() => setDirection("down")}
								className="mr-2"
							/>
							Buy Down
						</label>
					</div>
				</div>

				{/* Submit */}
				<button
					type="submit"
					className="w-full mt-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg cursor-pointer duration-300"
				>
					✅ Confirm Trade
				</button>
			</form>

			{/* Countdown Modal */}
			{countdown !== null && (
				<div className="fixed inset-0 flex items-center justify-center text-white bg-black bg-opacity-70 z-50">
					<div className="relative w-100 h-100 flex items-center justify-center text-center">
						{/* Animated Border */}
						<div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-green-500"></div>

						{/* Content */}
						<div className="rounded-full border border-white p-8 w-full h-full flex flex-col items-center justify-center z-10 bg-black bg-opacity-80 backdrop-blur-md">
							<h2 className="text-xl font-semibold mb-4">⏳ Trade Countdown</h2>
							<div className="text-4xl md:text-7xl font-bold text-blue-400">
								{countdown}
							</div>
							<p className="text-gray-400 mt-4">Your trade is active...</p>
							<p className="text-green-600 font-semibold text-lg mt-2">
								Locked Price: {lockedPrice ? `$${lockedPrice}` : "Loading..."}
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Popup Modal */}
			{popup.show && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
						<div
							className={`font-semibold text-base ${
								popup.success ? "text-green-600" : "text-red-600"
							}`}
						>
							{popup.message}
						</div>

						<button
							onClick={() =>
								setPopup({ show: false, message: "", success: true })
							}
							className="mt-4 cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
						>
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default TradingPage;
