import { useSelector,useDispatch } from "react-redux";
import { removeFromCart,setQty,clearCart } from "./cartSlice";

export default function CartPage(){
    const items = useSelector(s=> s.cart.items);
    const dispatch = useDispatch();

    const total = items.reduce((acc,it)=> acc + it.price * it.qty,0);

    return (
        <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {items.length === 0 ? <div>Cart is empty</div> :(
            <>
            <div className="spece-y-4">
             {items.map (i =>(
                <div key={i.id} className="flex gap-4 items-center">
                    <img className="w-20 h-20 object-cover" src={i.image} alt={i.name}/>
                   <div className="flex-1">
                    <div className="font-semibold">{i.name}</div>
                    <div>${i.price}</div>
                   </div>
                   <input type="number" min={1} value={i.qty} onChange={(e)=>dispatch(setQty({id:i.id,qty:Number(e.target.value)}))} className="w-16 border p-1"/>
                   <button onClick={()=>dispatch(removeFromCart(i.id))} className="py-1 px-3 border rounded">Remove</button>
                </div>
             ))}
            </div>
            <div className="mt-6">
                <div className="text-xl font-bold">Total:${total}</div>
                <button className="mt-3 py-2 px-4 bg-black text-white rounded">Checkout</button>
                <button onClick={()=>dispatch(clearCart())} className="ml-2 py-2 px-4 border rounded">Clear</button>
            </div>
            </>
        )}
        </div>
    );
}


