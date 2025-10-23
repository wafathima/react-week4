import { useParams,useNavigate } from "react-router-dom";
import { use, useEffect,useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

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
        toast.success(`${product.name } Added to cart✨`);
    };

    if(loading) return <div className="p-10 text-center">Loading...</div>
    if(!product) return <div className="p-10 text-center">Product not found</div>

    return(
        <>
        <Navbar/>
        <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
            <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
            />

            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-2xl font-semibold mb-4 text-brown-700">${product.price}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    {product.description || "no description available"}
                </p>

                <button 
                onClick={handleAddToCart}
                className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-700">
                 Add to Cart
                </button>
            </div>
        </div>
        </>
    )
}