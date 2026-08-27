import { Navigate, Outlet } from "react-router-dom";
import { extractData } from "../../utils/storage";

const PrivateRoute = () => {

    const isAuthenticated = () => {
        return !!extractData("user")
    }

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />

};

export default PrivateRoute