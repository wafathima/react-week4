import {useDispatch , useSelector} from "react-redux";
import {removeFromBag,clearBag} from "./bagSlice";
import {addOrder} from "../orders/ordersSlice";
import {useNavigate} from "react-router-dom";
import {createPortal} from "react-dom";
import toast from "react-hot-toast";

export default function BagPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bagItems = useSelector((state)=>state.bag.items);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleOrder =()=>{
        if(!user){
            navigate("/auth")
            return;
        }
        const order ={
            id:Date.now(),
            userEmail :user.email,
            items:bagItems,
            total:bagItems.reduce((acc, item) => acc + item.price * item.qty, 0),
            timastamp: Date.now(),
        };

        dispatch(addOrder(order));
        dispatch(clearBag());

          const CustomToast = ({ t }) =>
            createPortal(
               <div
                 className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity ${
        t.visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Toast box only */}
      <div className="pointer-events-auto bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center text-center border border-green-300 transition-all duration-300 transform scale-100 opacity-100">
        <div className="bg-green-100 p-3 rounded-full mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-green-700 mb-1">Success!</h2>

        <p className="text-gray-600 text-sm mb-4">
          We’ve confirmed your order and payment.
          <br /> Thank you for shopping!
        </p>

        <button
          onClick={()=>{
            toast.dismiss(t.id);
            navigate("/orders")
          }}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go to Orders
        </button>
      </div>
    </div>,
    document.body
  );
            toast.custom((t)=> <CustomToast t={t}/>,{duration:3000});
            setTimeout(()=>navigate("/orders"),1000);
    };

    return (
        
       <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* {left sec} */}
        <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Your Bag ({bagItems.length} {bagItems.length === 1 ? "item" : "items"})
            </h1>
            
            {bagItems.length === 0?(
                <p className="text-center text-gray-500 text-lg">Your bag is empty!</p>
            ):(
                <div className="flex flex-col gap-6">
                    {bagItems.map((item)=>(
                        <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4 items-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
                        >
                       {/* {img} */}
                       <img
                       src={item.image}
                       alt={item.name}
                       className="w-40 h-40 object-cover rounded-lg"
                       />

                       {/* {product info} */}
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-800">
                                {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-1">
                                Seller: <span className="font-medium">Online Store</span>
                            </p>
                            <p className="text-green-600 text-sm font-semibold mb-2">
                                 Return available for 7 days
                            </p>

                            <div className="flex items-center gap-4 mb-2">
                                <p className="text-gray-800 font-semibold">${item.price}</p>
                                <p className="text-sm line-through text-gray-400">${item.price}</p>
                                <p className="text-sm text-green-600 font-medium">$20 OFF</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-gray-700 font-medium">Qty:</span>
                                <span  className="bg-gray-100 px-3 py-1 rounded-md">{item.qty}</span>
                            </div>
                        </div>

                        {/* {action} */}
                        <div className="flex flex-col gap-3">
                         <button
                         onClick={()=> dispatch(removeFromBag(item.id))}
                         className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                         >
                          Remove
                         </button>
                        </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
             {/* {rigth sec} */}
             {bagItems.length >0 && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 h-fit">
                    <h2  className="text-xl font-semibold mb-4 text-gray-800">PRICE DETAILS</h2>

                    <div className="space-y-3 text-gray-700">
                        <div className="flex justify-between">
                            <span>Total Doller</span>
                            <span>${bagItems.reduce((acc,item)=> acc + (item.price +500)* item.qty,0)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Discount on MRP</span>
                            <span className="text-green-600">-${bagItems.reduce((acc, item) => acc + 500 * item.qty, 0)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>platform fee</span>
                            <span>$223</span> 
                        </div>
                        <hr className="my-3"/>

                        <div className="flex justify-between font-semibold text-lg">
                           <span>Total Amount</span>
                           <span>
                            $
                            {bagItems.reduce((acc,item)=> acc + item.price * item.qty)}
                           </span>
                        </div>
                    </div>
                    <button
                    onClick={handleOrder}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-green-700 transition"
                    >
                     Place Order
                    </button>
                </div>
             )}
       </div>
    )
}