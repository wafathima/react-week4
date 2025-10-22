import { useDispatch,useSelector } from "react-redux";
import { addToCart} from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function ProductList({products,searchTerm}){
    const dispatch = useDispatch();
    const user = useSelector(s=> s.auth.user);
    const navigate = useNavigate();

    const onAdd = (product) => {
      if(!user)  {
         navigate ("/auth");
         return;
      }
      dispatch(addToCart(product));
      toast.success(`${product.name}Added to cart✨`)
    };
     
   const filteredProducts = searchTerm
   ? products.filter((p)=>
   p.name.toLowerCase().includes(searchTerm.toLowerCase())
   ):products;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p=>(
              <div key={p.id} className="border rounded p-4 hover:shadow transition">
                <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-2" />
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-blue-600 font-bold">${p.price}</p>
                <p className="text-sm text-gray-600">{p.category}</p>
                <button onClick={()=> onAdd(p)} className="mt-3 w-full py-2 bg-black text-white rounded">Add to cart</button>
              </div>
            ))}
        </div>
    );
}

