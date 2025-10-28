import {useSelector} from "react-redux";
import {Navigate,useLocation} from "react-router-dom";

export default function ProtectedRoute ({children}){
    const user = useSelector(state => state.auth.user);
    const location = useLocation();
    if(!user){
        return <Navigate to="/auth" replace state={{from:location.pathname}}/>
    }
    return children;
}

