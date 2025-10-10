import { assets } from "../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
	const navigate = useNavigate();
	const images = [
		{
			src: assets.carouselImg1,
			title: "New Arrivals 2025",
			subtitle: "Explore the latest fashion trends for this season.",
			buttonText: "Shop Now",
			buttonLink: "/fashion-apparel",
		},
		{
			src: assets.carouselImg2,
			title: "Mega Electronics Sale",
			subtitle: "Up to 50% off on gadgets, phones, and accessories.",
			buttonText: "Browse Deals",
			buttonLink: "/electronics",
		},
		{
			src: assets.carouselImg3,
			title: "Beauty & Health Essentials",
			subtitle: "Nourish your skin with premium beauty products.",
			buttonText: "Discover More",
			buttonLink: "/beauty-health",
		},
		{
			src: assets.carouselImg4,
			title: "Home & Kitchen Upgrades",
			subtitle: "Transform your home with modern appliances and décor.",
			buttonText: "Shop Collection",
			buttonLink: "/home-kitchen",
		},
		{
			src: assets.carouselImg13,
			title: "Mega Discount Week",
			subtitle: "Unbelievable deals on top brands — limited time only!",
			buttonText: "Grab Now",
			buttonLink: "/groceries-food",
		},
		{
			src: assets.carouselImg10,
			title: "Women’s Trendy Looks",
			subtitle: "Chic outfits for every mood and moment.",
			buttonText: "Shop Women",
			buttonLink: "/sports-fitness",
		},
		{
			src: assets.carouselImg5,
			title: "Groceries & Daily Needs",
			subtitle: "Fresh groceries delivered right to your doorstep.",
			buttonText: "Order Now",
			buttonLink: "/groceries-food",
		},
		{
			src: assets.carouselImg6,
			title: "Books & Stationery",
			subtitle: "Inspire your mind — read more, create more.",
			buttonText: "Start Reading",
			buttonLink: "/books-stationary",
		},
		{
			src: assets.carouselImg7,
			title: "Sports & Fitness Gear",
			subtitle: "Stay fit with the best sportswear and accessories.",
			buttonText: "View Collection",
			buttonLink: "/sports-fitness",
		},
		{
			src: assets.carouselImg8,
			title: "Baby & Toys Collection",
			subtitle: "Joyful toys and baby essentials for your little ones.",
			buttonText: "Explore Now",
			buttonLink: "/toys-baby",
		},
		{
			src: assets.carouselImg9,
			title: "Men’s Exclusive Fashion",
			subtitle: "Sharp styles for every occasion.",
			buttonText: "Shop Men",
			buttonLink: "/fashion-apparel",
		},

		{
			src: assets.carouselImg11,
			title: "Smart Home Essentials",
			subtitle: "Bring intelligence and comfort to your living space.",
			buttonText: "See Devices",
			buttonLink: "/electronics",
		},
		{
			src: assets.carouselImg12,
			title: "Kitchen Essentials",
			subtitle: "Cook with confidence — explore premium cookware.",
			buttonText: "Shop Kitchen",
			buttonLink: "/home-kitchen",
		},
	];

	const settings = {
		dots: true,
		infinite: true,
		speed: 2500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		pauseOnHover: false,
		appendDots: (dots) => (
			<div
				style={{
					position: "absolute",
					bottom: "0px",
					width: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<ul style={{ margin: "0px" }} className="hidden lg:block">
					{" "}
					{dots}{" "}
				</ul>
			</div>
		),
		customPaging: () => (
			<div
				style={{
					width: "8px",
					height: "8px",
					borderRadius: "50%",
					backgroundColor: "white",
					opacity: 0.7,
				}}
			/>
		),
	};

	return (
		<div className="relative w-full lg:h-[60vh] overflow-hidden">
			<Slider {...settings} className="h-[100%]">
				{images.map((img, index) => {
					return (
						<div key={index} className="relative">
							{/* Background Image */}
							<img
								src={img.src}
								alt={img.title}
								className="h-[200px] md:h-full object-cover"
							/>

							{/* Overlay */}
							<div className="absolute inset-0 bg-black/40"></div>

							{/* Text Content */}
							<div
								className={`absolute top-[30%] lg:top-[20%] ${
									index <= 5
										? "-right-[3%] lg:right-[10%] items-end"
										: "left-[0] items-start lg:left-[10%]"
								} flex flex-col justify-center text-center text-white px-6`}
							>
								<h2 className="text-lg md:text-4xl font-bold md:mb-4">
									{img.title}
								</h2>
								<p className="text-sm md:text-2xl text-start opacity-90">
									{img.subtitle}
								</p>
								<button
									onClick={() => navigate(`${img.buttonLink}`)}
									className="mt-2 lg:mt-6 bg-white text-black px-4 text-sm lg:text-lg lg:px-6 py-2 rounded-full font-semibold hover:bg-gray-200 duration-300 cursor-pointer"
								>
									Shop Now
								</button>
							</div>
						</div>
					);
				})}
			</Slider>
		</div>
	);
};

export default Carousel;
