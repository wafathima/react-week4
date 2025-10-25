import {removeFromOrder } from "./ordersSlice"; 
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";

export default function OrdersPage(){
    const user = useSelector((state)=>state.auth.user);
    const orders = useSelector((state)=>state.orders.items)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmedOreders,  setConfirmedOrders] = useState([])
    
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
 
    const handleConfirm = (orderId) =>{
        toast.success("Thank You! Your Order Confirmed!🎉");
        setConfirmedOrders((prev)=>[...prev,orderId]);

        setTimeout(()=>{
            dispatch(removeFromOrder(orderId));
            setConfirmedOrders((prev)=>prev.filter((id)=> id !== orderId));
        },3000);
    };

    const handleCancel = (orderId)=>{
        toast.error("Order Cancelled");
        dispatch(removeFromOrder(orderId));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <div className="flex-grow container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-amber-900">Your Orders</h1>

                {orders.map((order,idx)=>{
                    const total = order.total ?? order.items?. reduce((sum,i)=> sum + i.price * i.qty,0)?? 0;

                    const isConfirmed = confirmedOreders.includes(order.id);

                    return (
                        <div 
                        key={order.id || idx}
                        className={`border p-4 rounded mb-4 shadow-sm bg-white transition-all duration-300 ${
                         isConfirmed ? "border-green-500 bg-green-50" : ""
                            }`}
                        >
                       <h2 className="font-bold">Order #{order.id || idx + 1}</h2>
                       
                       <p className="text-blue-600 mb-3"
                       ><strong>Total:$</strong>{total.toFixed(2)}</p>

                       {isConfirmed &&(
                        <div className="text-green-700 font-semibold mb-2 flex items-center gap-2">
                        ✅Order Confirmed
                        </div>
                       )}

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
                          
                          {!isConfirmed && (
                        <div className="flex gap-5 justify-end">
                         <button 
                         onClick={()=> handleCancel(order.id)}
                         className="mt-2 py-3 px-5 bg-red-600 text-white rounded hover:bg-red-800"
                         >
                          Cancel order
                         </button>

                         <button
                          onClick={()=> handleConfirm(order.id)}
                         className="mt-2 py-3 px-5 bg-green-600 text-white rounded hover:bg-green-800"
                         >
                         Confirm Order
                         </button>
                         </div>
                          )}
                       </div>
                        </div>
                    )
               })}
            </div>
           </div>
    );
    }
         


                
                
    


