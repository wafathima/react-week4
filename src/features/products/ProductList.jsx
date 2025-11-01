import { useDispatch,useSelector } from "react-redux";
import { addToCart} from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { addOrder } from "../orders/ordersSlice";
import { addToBag } from "../bag/bagSlice";
import {Heart, TagIcon} from "lucide-react"
import { addToWishlist, removeFromWishlist } from "../wishlist/wishlistSlice";

export default function ProductList({products,searchTerm}){
    const dispatch = useDispatch();
    const user = useSelector(state=> state.auth.user);
    const navigate = useNavigate();
    const wishlist = useSelector((state)=>state.wishlist.items);

    

    const onAdd = (products) => {
      if(!user)  {
         navigate ("/auth");
         return;
      }
      dispatch(addToCart(products));

      toast.success(
            <div className="felx flex-col items-start">
            <span className="font-bold text-white">Added to Cart!</span>
             <span className="text-sm text-white">
                    {products.name} 
                </span>
            </div>,
            {
                duration:2000,
                style:{
                    background:'#0fa445ff',
                    padding:'16px',
                    borderRadius:'12px'
                },
            }
        );
    };

    const onToggleWishlist = (product) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const alreadyInWishlist = wishlist.some((item) => item.id === product.id);

    if (alreadyInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
      }
  };

   const filteredProducts = searchTerm
   ? products.filter((p)=>
   p.name.toLowerCase().includes(searchTerm.toLowerCase())
   ):products;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map(p=>{
             const isWishlisted = wishlist.some((item)=> item.id===p.id)
              return (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition transform duration-200 p-5 flex flex-col items-center text-center">

              <button
              onClick={()=>onToggleWishlist(p)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-pink-50 transition"
              >
              <Heart  className={`w-5 h-5 transition ${
                  isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
                }`} />

              </button>

                <Link to={`/product/${p.id}`} className="w-full">
                <img 
                  src={p.image}
                  alt={p.name}
                  className="w-full h-56 object-contain mb-4 rounded-ld"
                />

                <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                <p className="text-blue-600 font-bold text-base mt-1">${p.price}</p>
                <p className="text-sm text-gray-500 mb-4">{p.category}</p>
                </Link>
                     
                     
                <button
                onClick={()=> onAdd(p)}
                className="mt-auto w-full py-2.5 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition">
                Add to cart
                </button>
              </div>
              )
             })}
        </div>
    );
  };

