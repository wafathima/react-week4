import { useDispatch,useSelector } from "react-redux";
import { addToCart} from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { addOrder } from "../orders/ordersSlice";
import { addToBag } from "../bag/bagSlice";


export default function ProductList({products,searchTerm}){
    const dispatch = useDispatch();
    const user = useSelector(state=> state.auth.user);
    const navigate = useNavigate();

   const handleAddToBag =()=>{
    dispatch(addToBag(product));
    toast.success("Added to Bag!")
    navigate("/bag");
   }

    const onAdd = (product) => {
      if(!user)  {
         navigate ("/auth");
         return;
      }
      dispatch(addToCart(product));

      toast.success(
            <div className="felx flex-col items-start">
            <span className="font-bold text-white">Added to Cart!</span>
             <span className="text-sm text-white">
                    {product.name} 
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

   const filteredProducts = searchTerm
   ? products.filter((p)=>
   p.name.toLowerCase().includes(searchTerm.toLowerCase())
   ):products;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(p=>(
              <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition transform duration-200 p-5 flex flex-col items-center text-center">

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
            ))}
        </div>
    );
  };

