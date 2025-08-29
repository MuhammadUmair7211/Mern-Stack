import { Route, Routes } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Register from "./pages/login/Register";
import ResetPassword from "./pages/login/ResetPassword";
import Login from "./pages/login/Login";
import ProfileUpdate from "./pages/profileUpdate/ProfileUpdate";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/profile" element={<ProfileUpdate />} />
				<Route path="/register" element={<Register />} />
				<Route path="/reset-password" element={<ResetPassword />} />
			</Routes>
		</>
	);
}

export default App;
