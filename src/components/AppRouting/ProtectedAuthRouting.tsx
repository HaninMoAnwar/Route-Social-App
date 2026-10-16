import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

export default function ProtectedAuthRouting() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to={'/auth/login'} />

    }

    return <Outlet />
}
