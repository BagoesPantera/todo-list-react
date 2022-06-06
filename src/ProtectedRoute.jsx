// this is like middleware
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = ({children}) => {
    
    const { token } = useSelector(state => state.auth);    
    const navigate = useNavigate();
    
    useEffect( () => {
        if(!token) {
            navigate("/login");
        }
        
    }, [token]);
    return children;
}

export const ProtectedLogin = ({children}) => {
    const { token } = useSelector(state => state.auth);    
    const navigate = useNavigate();
    
    useEffect( () => {
        if(token) {
            navigate("/");
        }
        
    }, [token]);
    return children;
}
