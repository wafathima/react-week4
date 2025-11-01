import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import {ShoppingCart,LogOut, User,Package, ShoppingBag, UserPlus,Heart} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wishlistCount = useSelector((state)=>state.wishlist.items.length)
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) =>
  state.cart.items.reduce((a, b) => a + b.qty, 0)
  );

  const bagItems = useSelector((state) => state.bag?.items || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (user) navigate("/cart");
    else navigate("/auth");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-8xl mx-auto px-9 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/LIO (1).png"
            alt="logo"
            className="w-30 h-18 object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Cart  */}
          <div
            onClick={handleCartClick}
            className="relative cursor-pointer hover:text-gray-700 transition-colors"
          >
            <ShoppingCart size={26} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white px-2 rounded-full text-xs">
                {cartCount}
              </span>
            )}
          </div>

          {/* Bag  */}
          <Link to="/bag" className="relative hover:text-gray-700">
            <ShoppingBag size={26} />
            {bagItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {bagItems.length}
              </span>
            )}
          </Link>

           {/* {wishlist} */}
          <Link to="/wishlist"  className="relative">
          <Heart className="w-6 h-6 text-gray-700 hover:text-pink-600 transition"/>
          </Link>

          {/* Profile */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <User size={26} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg overflow-hidden">
                    <p className="px-4 py-2 text-gray-600 border-b">
                      Logged in as{" "}
                      <span className="font-semibold">{user.name}</span>
                    </p>

                    <button
                      onClick={() => navigate("/profile")}
                      className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>

                    <button
                      onClick={() => navigate("/orders")}
                      className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      <Package className="w-4 h-4" />
                      Orders
                    </button>

        
                    <button
                     onClick={() => {
                           dispatch(logout()); 
                            setMenuOpen(false);
                            navigate("/auth", { replace: true });
                             }}
                           className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-blue-600"
                        >
                             <UserPlus className="w-4 h-4" />
                          Login Account
                        </button>


                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
             ) : (
             <Link to="/auth" className="hover:text-gray-700">
               Login
             </Link>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
}

