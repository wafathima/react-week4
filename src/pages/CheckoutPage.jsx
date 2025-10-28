import { useSelector,useDispatch } from "react-redux";
import { removeFromOrder,clearOrders } from "../features/orders/ordersSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

export default function checkoutPage(){
     const order = useSelector((state)=>state.orders.items);
     const dispatch = useDispatch();

     return (
        <div>
            <Navbar/>
            <div  className="p-8 max-w-5xl mx-auto">
             <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

             {orders.length === 0?(
                <p className="text-center text-gray-500 text-lg">
                     You don’t have any orders yet.
                </p>
             ):(
                <div className="space-y-6">
                    {orders.map((order)=>(
                        <div 
                        key={order.id}
                        className="border border-gray-200 rounded-2xl shadow-md p-6 bg-white"
                        >
                    <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <ul className="space-y-3">
                        {order.items.map((item)=>(
                            <li
                            key={item.id}
                            className="flex justify-between border-b border-gray-100 pb-2"
                            >
                             <span className="font-medium">{item.name}</span>
                             <span className="text-gray-600">${item.price}*{item.qty}</span>
                            </li>
                        ))} 
                    </ul>

                    <div className="flex justify-between mt-4">
                       <p className="font-semibold text-gray-700">
                        Total:$ 
                        {order.items.reduce(
                            (sum,it)=>sum+it.price*it.qty,0
                        )}
                       </p>
                       <button
                       onClick={()=> dispatch(removeFromOrder(order.id))}
                       className="text-red-500 hover:text-red-700 font-medium"
                       >
                        Remove
                       </button>
                        </div>
                        </div>
                    ))}
                   <button
                   onClick={()=>dispatch(clearOrders())}
                   className="mt-6 bg-black text-white px-6 py-2 rounded-xl hover-bg-gray-800"
                   >
                    Clear All
                   </button>
                </div>
             )} 
              </div>
              <Footer/>
            </div>
      
     )
}