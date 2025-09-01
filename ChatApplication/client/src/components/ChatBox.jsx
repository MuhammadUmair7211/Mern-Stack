import assets from "../assets/assets";
import { CiSquareInfo } from "react-icons/ci";
import { TfiGallery } from "react-icons/tfi";
import { IoMdSend } from "react-icons/io";
import { useUser } from "../context/UserContext";
import { IoIosArrowBack } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { useEffect, useRef } from "react";
const ChatBox = () => {
	const {
		setShowSideBar,
		selectChat,
		user,
		newMessage,
		setNewMessage,
		handleFormSubmit,
		allMessages,
		imageUpload,
		setImageUpload,
	} = useUser();
	const messagesEndRef = useRef(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [allMessages]);
	return (
		<div className="bg-white mx-2 lg:mx-0 flex flex-col justify-between">
			<div className="mt-4 text-black flex items-center justify-between py-2 px-6 border-b border-gray-300">
				{selectChat ? (
					<div className="flex items-center gap-2">
						<img
							src={selectChat?.image || assets.avatar_icon}
							className="w-10 h-10 object-cover rounded-full"
						/>
						<div>
							{selectChat ? (
								<p className="text-xl"> {selectChat.username}</p>
							) : (
								<p className="text-xl">Guest</p>
							)}
						</div>
						<GoDotFill className="text-md text-green-500" />
					</div>
				) : (
					<div className="w-full text-center text-gray-400">
						👋 Select a user to start chat
					</div>
				)}

				{selectChat && (
					<div className="hidden lg:flex">
						<CiSquareInfo size={25} />
					</div>
				)}
				<div
					className="flex lg:hidden cursor-pointer"
					onClick={() => setShowSideBar(true)}
				>
					<IoIosArrowBack size={30} />
				</div>
			</div>
			<div className="overflow-y-scroll scrollbar-hide h-[70vh] py-4 px-2">
				{Array.isArray(allMessages) &&
					allMessages.map((message, index) => {
						console.log(message.image);

						return (
							<div
								key={index}
								className={`flex ${
									message.senderId === user._id
										? "flex-row-reverse"
										: "flex-row"
								}  items-end gap-2 mt-4`}
							>
								<img
									src={
										message.senderId === user._id
											? user.image
											: selectChat.image
									}
									alt=""
									className="w-8 h-8 object-center rounded-full"
								/>
								<div
									className={`bg-blue-500 flex flex-col items-end text-white px-4 py-2 
										${
											message.senderId === user._id
												? "rounded-l-[10px] rounded-tr-[10px] "
												: "rounded-r-[10px] rounded-tl-[10px]"
										}`}
								>
									{message.image && (
										<img
											src={message.image}
											alt="chat-img"
											className="w-60 h-40 object-cover rounded cursor-pointer"
											onClick={() => window.open(message.image, "_blank")}
										/>
									)}

									<p className="max-w-[300px]">{message.text}</p>
									<span className="text-xs text-gray-100">
										{new Date(message.createdAt).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</div>
							</div>
						);
					})}
				<div ref={messagesEndRef} />
			</div>
			{imageUpload && (
				<div className="p-2 border-t border-gray-200 flex items-center gap-4">
					<img
						src={URL.createObjectURL(imageUpload)}
						alt="preview"
						className="w-20 h-20 object-cover rounded-lg border"
					/>
					<button
						type="button"
						onClick={() => {
							setImageUpload(null);
							const input = document.getElementById("file-upload");
							if (input) input.value = "";
						}}
						className="text-red-500 text-sm hover:text-red-600 hover:bg-gray-200 px-4 py-2 rounded-lg duration-300 cursor-pointer"
					>
						✕ Remove
					</button>
				</div>
			)}
			<form
				onSubmit={handleFormSubmit}
				className="flex items-center justify-between text-black border border-gray-300 py-3 px-4"
			>
				<input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder={
						selectChat ? "send a message" : "select a chat to type message"
					}
					className="outline-none flex-1"
					disabled={!selectChat}
				/>
				{selectChat && (
					<div className="flex items-center gap-4">
						<label htmlFor="file-upload" className="cursor-pointer">
							<input
								type="file"
								id="file-upload"
								onChange={(e) => setImageUpload(e.target.files[0])}
								accept="image/*"
								className="hidden"
							/>
							<TfiGallery
								size={25}
								className="hover:text-green-500 duration-300 cursor-pointer"
							/>
						</label>
						<button type="submit">
							<IoMdSend
								size={30}
								className="text-blue-600 hover:text-blue-500 duration-300 cursor-pointer"
							/>
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default ChatBox;
