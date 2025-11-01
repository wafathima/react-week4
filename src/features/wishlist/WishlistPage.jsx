import { useSelector,useDispatch } from "react-redux";
import { removeFromWishlist,clearWishlist } from "./wishlistSlice";
import { addToBag } from "../bag/bagSlice";
import toast from "react-hot-toast";

export default function WishlistPage(){
    const wishlist = useSelector((state)=>state.wishlist.items);
    const dispatch = useDispatch();
    
    const handleAddToBag=(item)=>{
      dispatch(addToBag(item));
      toast.success("Added to bag!")
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 mt-12">
              Your Wishlist ({wishlist.length})
            </h1>

            {wishlist.length === 0?(
                <p className="text-gray-500 text-center">No items in wishlist </p>
            ):(
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {wishlist.map((item)=>(
                    <div
                       key={item.id}
                       className="border rounded-xl shadow-md p-4 flex flex-col items-center"
                    >
                        <img
                        src={item.image}
                        alt={item.name}
                        className="w-40 h-40 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                         <p className="text-gray-600">${item.price}</p>

                         <div className="flex gap-3 mt-4">
                          <button
                          onClick={() => handleAddToBag(item)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                          >
                           Add to Bag
                          </button>

                           <button
                            onClick={() => dispatch(removeFromWishlist(item.id))}
                             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                             >
                             Remove
                               </button>
                         </div>
                    </div>
                 ))}
                </div>
            )}

            {wishlist.length > 0 && (
                <button
                 onClick={() => dispatch(clearWishlist())}
                className="mt-8 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                >
                   Clear Wishlist
                </button>
            )}

        </div>
    )
}