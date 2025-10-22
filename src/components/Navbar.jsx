import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {logout} from "../features/auth/authSlice";
import {ShoppingCart,Search} from "lucide-react";
import { useState } from "react";

export default function Navbar({onSearch}){
    const [term,setTerm]= useState("")
    const user = useSelector(s=> s.auth.user);
    const cartCount = useSelector (s=> s.cart.items.reduce((a,b)=>a+b.qty,0));
    const [searchTerm,setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCartClick = () =>{
        if(user)navigate("/cart")
        else navigate("/auth");
    };
    
    const handleSearch = ()=>{
        if(searchTerm.trim()){
            navigate(`/shop?search=${searchTerm}`)
            setTerm("");
        }
    }

    return (
    
        <nav className="flex justify-between items-center p-8 bg-white shadow ">
            <Link to="/" className="font-bold text-5xl">⫹L I O</Link>
          

          <div className="flex items-center gap-4">
         {/* {cart icon} */}
         <div onClick={handleCartClick}
         className="relative cursor-pointer hover:scale-110 transition-transform"
         >
            <ShoppingCart size={26} />
            {cartCount >0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 rounded-full text-xs">
                {cartCount}
                </span>
            )}
         </div>

           {/* {search} */}
           <div className="flex items-center border">
            <button onClick={handleSearch}><Search size={22}/></button>
            <input 
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className=" px-3 py-2 w-64 "
            /> 
             </div>

         {/* {user login&logout} */}
         {user ?(
            <>
            <span className="text-sm">Hi,{user.name}</span>
            <button
            onClick={()=>{
                dispatch(logout());
                navigate("/")
            }}
            className="py-2 px-3 border bg-black text-white "
            >
              Logout
            </button>
            </>
         ):(
            <Link to="/auth" className="py-2 px-3 border rounded">
                Login / Register
            </Link>
         )}
          </div>
        </nav>
    );
}

