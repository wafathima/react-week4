import {removeFromOrder } from "./ordersSlice"; 
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { addOrder } from "./ordersSlice";

export default function OrdersPage(){
    const user = useSelector((state)=>state.auth.user);
    const orders = useSelector((state)=>state.orders.items)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShopOrder =(product) =>{
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user){
            navigate("/auth");
            toast.error("Please login to checkout!");
            return;
        }

        const order={
            id:Date.now(),
            userEmail:user.email,
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

        dispatch(addOrder(order));
       toast.success(
            <div className="flex flex-col items-start">
            <span className="font-bold text-white">✨Order Placed!</span>
            <span className="text-sm text-white">
                {product.name}-${product.price.toFixed(2)}
            </span>
            </div>,
            {
                duration:2000,
                style:{
                    background:'#136913ff',
                    padding:'16px',
                    borderRadius:'12px'
                },
            }
        );
    }
    
    useEffect(()=>{
        if(!user) navigate("/auth");
    },[user,navigate]);

    if (!user)return null;

    if(!orders || orders.length === 0 ) {
        return (
        <div className="min-h-screen flex flex-col">
        <Navbar/>
        <div className="flex-grow p-10 text-center text-lg text-gray-600">
        No Orders yet.!
         </div>
         </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <div className="flex-grow container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-amber-900">Your Orders</h1>

                {orders.map((order,idx)=>{
                    const total = order.total ?? order.items?. reduce((sum,i)=> sum + i.price * i.qty,0)?? 0;

                    return (
                        <div 
                        key={order.id || idx}
                        className="border p-4 rounded mb-4 shadow-sm"
                        >
                       <h2 className="font-bold">Order #{order.id || idx + 1}</h2>
                       
                       <p>Total:${total.toFixed(2)}</p>

                       <div className="mt-2">
                        {order.items?.length > 0 ? (
                            order.items.map((item,i)=>(
                                <div
                                key={i}
                                className="flex items-center gap-4 border-b py-2 last:border-b-0"
                                >
                                    <img
                                    src={item.image || "/Placeholder.png"}
                                    alt={item.name || "Product"}
                                    className="w-16 h-16 object-cover rounded"
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium">{item.name || "Unknown Product"}</p>
                                        <p className="text-sm text-gray-600">
                                            ${item.price?.toFixed(2)}*{item.qty}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ):(
                            <p className="text-gray-500 italic">No items found in this order.</p>
                        )}
                         <button 
                         onClick={()=>dispatch(removeFromOrder(order.id))}
                         className="mt-2 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-700"
                         >
                          Cancel order
                         </button>
                       </div>
                        </div>

                    )
               })}
            </div>
           </div>
    );
}
                
                
                
    


