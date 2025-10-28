import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import {logout} from "../features/auth/authSlice";
import {ShoppingCart,LogOut,User,Package,LogIn,ShoppingBag, UserPlus} from "lucide-react";
import { useState } from "react";

export default function Navbar(){
    const [menuOpen,setMenuOpen] = useState(false)
    const user = useSelector(state=> state.auth.user);
    const cartCount = useSelector (state=> state.cart.items.reduce((a,b)=>a+b.qty,0));
    const orderItems = useSelector((state)=>state.orders.items);
    const bagItems = useSelector((state)=>state.bag?.items||[]);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCartClick = () =>{
        if(user)navigate("/cart")
        else navigate("/auth");
    };

   const handleLogout =()=>{
        dispatch(logout());
        localStorage.removeItem("user");
        navigate("/")
    };
    const handleLogoin = ()=>{
        navigate("/auth");
    }
    
    return (
            
        <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
             <div className="max-w-8xl mx-auto px-9 py-5 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
            <img
            src="/LIO (1).png"
            alt="logo"
            className="w-30 h-18 object-contain"
            />
            </Link>
          
          <div className="flex items-center gap-4">

            {/* {cart icon} */}
            <div onClick={handleCartClick}
            className="relative cursor-pointer hover:text-gray-700 transition-color"
            >
            <ShoppingCart size={26} />
            {cartCount >0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white px-2 rounded-full text-xs">
                {cartCount}
                </span>
            )}
         </div>

         {/* {bag} */}
         <Link to="/bag" className="relative hover:text-gray-700">
         <ShoppingBag size={26}/>
         {bagItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {bagItems.length}
            </span>
         )}
         </Link>

         {/* {{profile}} */}
         <div className="relative">
            <User onClick={()=>setMenuOpen(!menuOpen)}
            className="w-6 h-6 cursor-pointer"/>
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg p-2 z-50">

               {user ?(
                <>
                <button
                onClick={()=>navigate("/profile")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded"
                >
                    <User className="w-4 h-4"/>
                       Profile
                </button>

                <button
                onClick={()=> navigate("/orders")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded"
                >
                <Package className="w-4 h-4"/>
                Orders 
                </button>

                <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-red-600"
                >
                 <LogOut className="w-4 h-4"/>
                 Logout
                </button>
                </>

               ):(

                <>
                <button
                onClick={()=> navigate ("/auth")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-green-600"
                >
                 <LogIn className="w-4 h-4"/>
                 Login 
                </button>

                <button
                onClick={()=> navigate("/signup")}
                 className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-blue-600"
                >
                <UserPlus className="w-4 h-4"/>
                Sign Up
                </button>

                </>
               )}
             </div>
            )}
         </div>
          </div>
          </div>
        </nav>
    );
}

