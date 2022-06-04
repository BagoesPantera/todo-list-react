// this is like middleware
import { useContext } from "react"
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthProvider";

export const ProtectedRoute = ({children}) => {
    const {token} = useContext(AuthContext);

    if(!token) {
        return <Navigate to="/login" />
    }

    return children;
}

export const ProtectedLogin = ({children}) => {
    const {token} = useContext(AuthContext);

    if(token) {
        return <Navigate to="/" />
    }

    return children;
}
