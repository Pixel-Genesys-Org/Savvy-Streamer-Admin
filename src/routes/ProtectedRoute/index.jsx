import { Navigate, Outlet } from "react-router-dom";
import { extractData } from "../../utils/storage";

const ProtectedRoute = () => {

    const isAuthenticated = () => {
        return !!extractData("user")
    }

    return isAuthenticated() ? <Navigate to="/dashboard" /> : <Outlet />

};

export default ProtectedRoute