import { useSelector,useDispatch } from "react-redux";
import { removeFromCart,setQty,clearCart } from "./cartSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { addOrder } from "../orders/ordersSlice";

export default function CartPage(){
    const items = useSelector(s=> s.cart.items);
    const user = useSelector((s)=>s.auth.user);
    const dispatch = useDispatch();

    const total = items.reduce((acc,it)=> acc + it.price * it.qty,0);

     const handleOrderNow = async (product = null)=>{
        if(!user){
            toast.error("Please login to checkout!")
            return;
        }
        const orderItems = product? [product]:items;

        if(items.length===0){
            toast.error("Your cart is empty")
            return;
        }

        const orderTotel = orderItems.reduce((acc,i)=>acc + i.price * i.qty,0);

        const order={
            id:Date.now(),
            userEmail:user.email,
            items:orderItems,
            total:orderTotel,
            timestamp:Date.now()
        };
        try{
            await axios.post("http://localhost:5001/orders",order);
            dispatch(addOrder(order));

              if (product){
                dispatch(removeFromCart(product.id));
              }else{
                dispatch(clearCart());
              }

            toast.success(
            <div className="flex flex-col items-start">
            <span className="font-bold text-white">Order Placed!</span>
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
        }catch(err){
            toast.error("Failed to place order‼");
            console.log(err)
        }
     }

    return (
        <div>
           
        <div className="p-8">
        <h1 className="text-4xl font-bold mb-4 mt-7">Your Cart</h1>

        {items.length === 0 ? 
        <div>Cart is empty</div> :(
            <>
            <div className="spece-y-4">

             {items.map (i =>(
                <div key={i.id} className="flex gap-4 items-center border px-3 mt-3 mb-3 rounded">
                    <img className="w-20 h-20 object-cover" src={i.image} alt={i.name}/>
                   <div className="flex-1 ">
                    <div className="font-semibold ">{i.name}</div>
                    <div className="text-blue-600 font-bold">${i.price}</div>
                   </div>

                   <input type="number" 
                   min={1}
                    value={i.qty}
                     onChange={(e)=>dispatch(setQty({id:i.id,qty:Number(e.target.value)}))}
                     className="w-16 border p-1"
                     />

                   <button 
                   onClick={()=>dispatch(removeFromCart(i.id))}
                   className="py-1 px-3 border bg-red-700 text-white rounded">
                   Remove
                    </button>

                   <button
                   onClick={()=>handleOrderNow(i)}
                   className="py-1 px-3 border bg-black text-white rounded"
                   >
                   Order
                   </button>

                </div>
             ))}
            </div>

            <div className="mt-6 border-t pt-4">
                <div className="text-xl font-bold mb-4">Total:${total}</div>

                <button
                 onClick={()=> handleOrderNow()}
                 className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-800">
                Order All
                </button>

                <button 
                onClick={()=>dispatch(clearCart())} 
                className="ml-2 py-2 px-4 border rounded bg-black text-white">
                Clear
                </button>
            </div>
            </>
        )}
        </div>
         
       </div> 
    );
}


