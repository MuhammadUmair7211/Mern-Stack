import { useEffect, useState } from "react";

const Market = () => {
	const [marketData, setMarketData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setLoading(false);
				setMarketData(data);
			});
	}, []);

	return (
		<div className="pt-2 mb-14">
			<h2 className="text-xl md:text-2xl font-bold text-center my-4 tracking-wide">
				📊 Live Crypto Market
			</h2>
			<div className="overflow-x-auto p-2 pb-4">
				<table className="min-w-full border border-gray-200 text-sm text-left">
					<thead className="uppercase text-xs text-gray-400">
						<tr>
							<th className="p-2 md:p-4 text-left">Coin</th>
							<th className="p-2 md:p-4 text-right">Price</th>
							<th className="p-2 md:p-4 text-right">24h Change</th>
							<th className="p-2 md:p-4 text-right">Volume</th>
						</tr>
					</thead>
					{loading ? (
						<tbody>
							<tr>
								<td colSpan="4" className="text-center md:text-3xl p-4">
									Loading...
								</td>
							</tr>
						</tbody>
					) : null}
					<tbody>
						{marketData.map((coin) => {
							return (
								<tr
									key={coin.id}
									className="border-t border-gray-200 hover:bg-[#444] hover:text-white transition"
								>
									<td className="p-2 md:p-4 flex items-center gap-2">
										<img
											src={coin.image}
											alt={coin.symbol}
											className="w-6 h-6"
										/>{" "}
										{coin.symbol.toUpperCase()}
									</td>
									<td className="px-4 py-3 text-right">
										${coin.current_price.toLocaleString()}
									</td>
									<td
										className={`px-4 py-3 text-right ${
											coin.price_change_percentage_24h >= 0
												? "text-green-400"
												: "text-red-400"
										}`}
									>
										{coin.price_change_percentage_24h?.toFixed(2)}%
									</td>
									<td className="px-4 py-3 text-right">
										${coin.total_volume.toLocaleString()}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Market;
