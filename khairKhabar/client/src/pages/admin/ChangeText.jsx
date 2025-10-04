import { useApp } from "../../contexts/AppContext";

const ChangeText = () => {
	const { text, setText, navigate } = useApp();
	const handleTextSave = () => {
		localStorage.setItem("text", text);
		alert("text changed!");
		navigate("/");
	};

	return (
		<div className="w-full h-full px-2 flex items-center justify-center bg-gray-400 font-urdu">
			<div className="flex flex-col items-center shadow max-w-md w-full p-4 rounded-md bg-white space-y-4">
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="w-full resize-none text-right outline-none p-2"
					rows={10}
				/>
				<button
					onClick={handleTextSave}
					className="bg-blue-500 text-white w-full pb-2 rounded hover:bg-blue-600 duration-300 cursor-pointer"
				>
					Done
				</button>
			</div>
		</div>
	);
};

export default ChangeText;
