import { useDispatch,useSelector } from "react-redux";
import { addToCart} from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { addOrder } from "../orders/ordersSlice";


export default function ProductList({products,searchTerm}){
    const dispatch = useDispatch();
    const user = useSelector(state=> state.auth.user);
    const navigate = useNavigate();

    const onAdd = (product) => {
      if(!user)  {
         navigate ("/auth");
         return;
      }
      dispatch(addToCart(product));

      toast.success(
            <div className="felx flex-col items-start">
            <span className="font-bold text-white">Added to Cart!🎉</span>
             <span className="text-sm text-white">
                    {product.name} 
                </span>
            </div>,
            {
                duration:2000,
                style:{
                    background:'#890b0bff',
                    padding:'16px',
                    borderRadius:'12px'
                },
            }
        );
    };

const handleOrderNow = (product)=>{
  if(!user){
    navigate("/auth");
    return;
  }
  const order = {
    id:Date.now(),
    userEmail :user.email,
    items:[
      {
        id:product.id,
        name:product.name,
        price:product.price,
        image:product.image,
        qty:1,
      },
    ],
    total:product.price,
    timestamp:Date.now(),
  };
  dispatch(addToOrder(order));

  toast.success(
      <div className="flex flex-col items-start">
        <span className="font-bold text-white">✨ Order Placed!</span>
        <span className="text-sm text-white">
          {product.name} - ${product.price.toFixed(2)}
        </span>
      </div>,
      {
        duration: 2000,
        style: {
          background: "#136913ff",
          padding: "16px",
          borderRadius: "12px",
        },
      }
    );
  };


   const filteredProducts = searchTerm
   ? products.filter((p)=>
   p.name.toLowerCase().includes(searchTerm.toLowerCase())
   ):products;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p=>(
              <div key={p.id} className="border rounded p-4 hover:shadow transition">

                <Link to={`/product/${p.id}`}>
                <img 
                  src={p.image}
                  alt={p.name}
                  className="w-full h-60 object-cover mb-3 rounde"
                />

                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-blue-500 font-bold">${p.price}</p>
                </Link>

                <p className="text-sm text-gray-600">{p.category}</p>
                <button
                onClick={()=> onAdd(p)}
                className="mt-3 w-full py-2 bg-black text-white rounded">
                Add to cart
                </button>
              </div>
            ))}
        </div>
    );
  };

