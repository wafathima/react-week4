import { useDispatch,useSelector } from "react-redux";
import { addToCart} from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";


export default function ProductList({products}){
    const dispatch = useDispatch();
    const user = useSelector(s=> s.auth.user);
    const navigate = useNavigate();

    const onAdd = (product) => {
      if(!user)  {
        return navigate ("/auth");
      }
      dispatch(addToCart(product))
    };
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

