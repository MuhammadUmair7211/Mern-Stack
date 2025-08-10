import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");
	const isAdmin = token && role === "admin";
	return isAdmin ? children : <Navigate to="/admin-login" replace />;
};

export default AdminPrivateRoute;
