import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {logout} from "../features/auth/authSlice";
import {ShoppingCart,Search,ShoppingBag,Home } from "lucide-react";
import { useState } from "react";

export default function Navbar({onSearch}){
    const [term,setTerm]= useState("")
    const user = useSelector(state=> state.auth.user);
    const cartCount = useSelector (state=> state.cart.items.reduce((a,b)=>a+b.qty,0));
    const [searchTerm,setSearchTerm] = useState("");
    const orderItems = useSelector((state)=>state.orders.items);

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
    const handleKeyPress = (e) =>{
        if(e.key === "Enter"){
            handleSearch()
        }
    };

    return (
            
        <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
             <div className="max-w-9xl mx-auto px-9 py-5 flex justify-between items-center">
            <Link to="/" className="font-bold text-5xl text-blue-900">⫹L I O</Link>
          
          <div className="flex items-center gap-4">
          {/* {home} */}
            <button
            onClick={()=> navigate("/")}
            className="hover:text-blue-400 transition-color"
            >
              <Home size={22}/>
            </button>

        {/* {search} */}
           <div className="flex items-center border">
            <button
             onClick={handleSearch}
             className="p-2"
             aria-label="search"
            >
            <Search size={22}/>
            </button>
    
            <input 
            type="text"
            placeholder="SEARCH"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className=" flex-1 px-3 py-2 outline-none "
            /> 
              </div>

            {/* {cart icon} */}
            <div onClick={handleCartClick}
            className="relative cursor-pointer hover:text-blue-400 transition-color"
            >
            <ShoppingCart size={26} />
            {cartCount >0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 rounded-full text-xs">
                {cartCount}
                </span>
            )}
         </div>

         {/* {orders} */}
         <Link to="/orders" className="relative">
         <ShoppingBag  className="w-6 h-6 relative cursor-pointer hover:text-blue-400 transition-color"/>
         {orderItems.length >0 &&(
            <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full text-xs px-2">
            {orderItems.length}
            </span>
         )}
         </Link>

         {/* {user login&logout} */}
         {user ?(
            <>
            <span className="text-sm ">Hi,{user.name}</span>
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
            <Link to="/auth" className="py-2 px-3 border ">
                Login 
            </Link>
         )}
          </div>
          </div>
        </nav>
    );
}

