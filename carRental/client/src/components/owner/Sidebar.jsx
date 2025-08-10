import { NavLink, useLocation } from "react-router-dom";
import { assets, dummyUserData, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";

const Sidebar = () => {
	const user = dummyUserData;
	const location = useLocation();

	const [image, setImage] = useState();
	const updateImage = async () => {
		user.image = URL.createObjectURL(image);
		setImage("");
	};
	return (
		<div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
			<div className="group relative">
				<label htmlFor="image">
					<img
						src={image ? URL.createObjectURL(image) : user?.image}
						alt="user"
						className="h-10 ms-2 md:ms-0 md:h-16 rounded-full overflow-hidden"
					/>
					<input
						type="file"
						id="image"
						accept="image/*"
						hidden
						onChange={(e) => setImage(e.target.files[0])}
					/>
					<div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
						<img src={assets.edit_icon} alt="edit-icon" />
					</div>
				</label>
			</div>
			{image && (
				<button className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer">
					Save
					<img src={assets.check_icon} width={13} onClick={updateImage} />
				</button>
			)}
			<p className="mt-2 text-base max-md:hidden">{user?.name}</p>
			<div className="w-full mt-4">
				{ownerMenuLinks.map((link, index) => {
					return (
						<NavLink
							to={link.path}
							key={index}
							className={`flex items-center relative py-3 w-full pl-4 gap-2 ${
								link.path === location.pathname && "bg-primary/10 text-primary"
							}`}
						>
							<img
								src={
									link.path === location.pathname ? link.coloredIcon : link.icon
								}
								alt="link-icon"
							/>
							<span className="hidden md:flex">{link.name}</span>
							<div
								className={`${
									link.path === location.pathname && "bg-primary"
								} w-1.5 h-8 rounded-l absolute right-0`}
							></div>
						</NavLink>
					);
				})}
			</div>
		</div>
	);
};

export default Sidebar;
