import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PiHandDepositFill } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { BsStack } from "react-icons/bs";
const NavLinks = [
	{ path: "/deposits", label: "Deposits", icon: <PiHandDepositFill /> },
	{ path: "/withdraw", label: "Withdraw", icon: <PiHandWithdrawFill /> },
	{
		path: "/customer-support",
		label: "Customer Support",
		icon: <RiCustomerService2Fill />,
	},
	{ path: "/staking", label: "Stacking", icon: <BsStack /> },
];
const Home = () => {
	const [fetchData, setFetchData] = useState([]);
	useEffect(() => {
		fetch(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
		)
			.then((res) => res.json())
			.then((data) => {
				setFetchData(data);
			});
	}, []);
	return (
		<div>
			<div className="grid grid-cols-1 text-white md:grid-cols-4 gap-3 p-2 pt-16">
				{NavLinks.map((link) => {
					return (
						<div key={link.path}>
							<NavLink
								to={link.path}
								className="bg-gray-800 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-700 transition duration-300"
							>
								<div className="flex flex-col items-center py-4">
									<span className="text-2xl md:text-4xl mb-2">{link.icon}</span>
									<span className="text-sm font-semibold">{link.label}</span>
								</div>
							</NavLink>
						</div>
					);
				})}
			</div>
			<div className="px-2 pb-17">
				<div className="overflow-x-auto rounded-lg border border-gray-700">
					<table className="min-w-full divide-y divide-gray-700 bg-[#1e1e1e] rounded-md overflow-hidden">
						<thead className="bg-[#2c2c2c] text-gray-400 text-sm uppercase tracking-wider">
							<tr>
								<th className="px-6 py-4 text-left">Trading Pair</th>
								<th className="px-6 py-4 text-center">Latest Price</th>
								<th className="px-6 py-4 text-right">24h Change</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700 text-white">
							{fetchData.map((coin) => (
								<tr
									key={coin.symbol}
									className="hover:bg-[#333] transition duration-150 ease-in-out"
								>
									<td className="px-6 py-4 flex items-center gap-3 font-medium">
										<img
											src={coin.image}
											alt={coin.symbol}
											className="w-6 h-6 rounded-full"
										/>
										<span>{coin.symbol.toUpperCase()}/USD</span>
									</td>
									<td className="px-6 py-4 text-center font-semibold">
										$
										{coin.current_price.toLocaleString(undefined, {
											minimumFractionDigits: 2,
										})}
									</td>
									<td
										className={`px-6 py-4 text-right font-semibold ${
											coin.price_change_percentage_24h >= 0
												? "text-green-400"
												: "text-red-400"
										}`}
									>
										{coin.price_change_percentage_24h >= 0 ? "+" : ""}
										{coin.price_change_percentage_24h.toFixed(2)}%
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Home;
