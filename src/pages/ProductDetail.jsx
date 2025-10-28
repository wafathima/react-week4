import { useParams,useNavigate } from "react-router-dom";
import { use, useEffect,useState } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
// import { addOrder } from "../features/orders/ordersSlice";
import { addToBag } from "../features/bag/bagSlice";

export default function ProductDetail(){
    const {id} = useParams();
    const [product,setProduct]= useState(null);
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        axios
        .get(`http://localhost:5001/products/${id}`)
        .then((res)=>{
            setProduct(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.error(err);
            setLoading(false);
        });
    },[id]);

    const handleAddToCart = ()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(!user){
            navigate("/");
            return;
        }
        dispatch(addToCart(product));
         toast.success(
            <div className="felx flex-col items-start">
            <span className="font-bold text-white">Added to Cart!</span>
             
            </div>,
            {
                duration:2000,
                style:{
                    background:'#3c9d08ff',
                    padding:'16px',
                    borderRadius:'12px'
                },
            }
        );
    };

        const handleAddToBag =()=>{
            const user =JSON.parse(localStorage.getItem("user"));
            if(!user){
                navigate("/auth")
                return;
            }
            dispatch(addToBag(product));
            toast.success(
                <div className="flex flex-col items-start">
                    <span className="font-bold text-white">Added to Bag!</span>
                    </div>,
                        {
                            duration:2000,
                            style:{
                                background:'#3c9d08ff',
                                padding:'16px',
                                borderRadius:'12px'
                            }
                        }
            )
        }

    if(loading) return <div className="p-10 text-center">Loading...</div>
    if(!product) return <div className="p-10 text-center">Product not found</div>

    return(
        <>
        <Navbar/>
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 mt-7">
            <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
            />

            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-2xl font-bold mb-4 text-blue-700">${product.price}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description || "no description available"}
                </p>
                   
                <div className="flex gap-4">
                <button 
                onClick={handleAddToCart}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-700">
                 Add to Cart
                </button>
                <div>
                 
                <button onClick={ handleAddToBag }
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-700"
                >
                Add to Bag   
                </button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
