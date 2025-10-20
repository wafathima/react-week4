import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {logout} from "../features/auth/authSlice";

export default function Navbar(){
    const user = useSelector(s=> s.auth.user);
    const cartCount = useSelector (s=> s.cart.items.reduce((a,b)=>a+b.qty,0));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow">
            <div className="flex items-center gap-4">
                <Link to="/" className="font-bold text-xl">⨇L I O</Link>
            </div>

            <div className="flex items-center gap-4">
                 <Link to="/cart" className="relative">
                 <button className="py-2 px-3 bg-black text-white rounded">Cart</button>
                 <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 rounded-full text-xs">{cartCount}</span>
                 </Link>

                 {user ? (
                    <>
                    <span className="text-sm">Hi, {user.name}</span>
                    <button onClick={()=> {dispatch(logout());navigate("/");}} className="py-2 px-3 border rounded">Logout</button>
                    </>
                 ):(
                    <Link to="/" className="py-2 px-3 border rounded">Login / Register</Link>
                 )}
            </div>
        </nav>
    );
}

