import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export default function ProtectedRoute ({children}){
    const user = useSelector(state => state.auth.user);
    if(!user){
        return <Navigate to="/auth" replace state={{from:location.pathname}}/>
    }
    return children;
}

