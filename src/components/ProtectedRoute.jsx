import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ...props }) {
    return props.loggedIn ? children : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
