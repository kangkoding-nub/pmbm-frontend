import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
    const { isLogged } = useAuthContext();
    return !isLogged ? <Navigate to="/auth/masuk" /> : <Outlet />;
};

export default PrivateRoute;