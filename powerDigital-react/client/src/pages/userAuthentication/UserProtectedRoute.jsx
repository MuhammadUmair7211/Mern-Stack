import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const UserProtectedRoute = ({ children }) => {
	const { user } = useUser();
	const token = localStorage.getItem("token");
	if (!user || !token) {
		return <Navigate to="/user-login" />;
	}
	return children;
};

export default UserProtectedRoute;
