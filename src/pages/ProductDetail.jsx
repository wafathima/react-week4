// import { useParams,useNavigate } from "react-router-dom";
// import { use, useEffect,useState } from "react";
// import axios from "axios";
// import { useDispatch} from "react-redux";
// import toast from "react-hot-toast";
// import { addToBag } from "../features/bag/bagSlice";
// import { addToWishlist } from "../features/wishlist/wishlistSlice";

// export default function ProductDetail(){
//     const {id} = useParams();
//     const [product,setProduct]= useState(null);
//     const [loading,setLoading] = useState(true);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(()=>{
//         axios
//         .get(`http://localhost:5001/products/${id}`)
//         .then((res)=>{
//             setProduct(res.data);
//             setLoading(false);
//         })
//         .catch((err)=>{
//             console.error(err);
//             setLoading(false);
//         });
//     },[id]);



//         const handleAddToBag =()=>{
//             const user =JSON.parse(localStorage.getItem("user"));
//             if(!user){
//                 navigate("/auth")
//                 return;
//             }
//             dispatch(addToBag(product));
//             toast.success(
//                 <div className="flex flex-col items-start">
//                     <span className="font-bold text-white">Added to Bag!</span>
//                     </div>,
//                         {
//                             duration:2000,
//                             style:{
//                                 background:'#3c9d08ff',
//                                 padding:'16px',
//                                 borderRadius:'12px'
//                             }
//                         }
//             )
//         }

//     if(loading) return <div className="p-10 text-center">Loading...</div>
//     if(!product) return <div className="p-10 text-center">Product not found</div>

//     return(
//         <>
       
//         <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 mt-7">
//             <img
//             src={product.image}
//             alt={product.name}
//             className="w-full md:w-1/3 rounded-lg shadow-lg"
//             />

//             <div className="flex-1">
//                 <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//                 <p className="text-gray-600 mb-2">{product.category}</p>
//                 <p className="text-2xl font-bold mb-4 text-blue-700">${product.price}</p>
//                 <p className="text-gray-700 mb-6 leading-relaxed">
//                     {product.description || "no description available"}
//                 </p>
                   
//                 <div className="flex gap-5">
                
//                 <button onClick={ handleAddToBag }
//                 className="bg-black text-white px-6 py-3 rounded-lg hover:bg-green-700"
//                 >
//                 Add to Bag   
//                 </button>

//                 <button
//                 onClick={() => dispatch(addToWishlist(product))}
//                 className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 "
//                 >
//                  wishlist
//                 </button>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToBag } from "../features/bag/bagSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToBag = () => {
    if (!user) return navigate("/auth");
    if (!selectedSize)
      return toast.error("Please select a size before adding to bag!");

    dispatch(addToBag({ ...product, size: selectedSize }));
    toast.success("Added to Bag!");
  };

  const handleAddToWishlist = () => {
    if (!user) return navigate("/auth");
    dispatch(addToWishlist(product));
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
      
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        />
        
     

      <div className="flex-1">
        <h2 className="text-gray-500 text-sm mb-1 uppercase">
          {product.category}
        </h2>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-green-600 font-semibold text-lg">★ 4.5</span>
          <span className="text-gray-500">(206 Ratings)</span>
        </div>

        
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            MRP ${product.price}
          </h3>
         <p className="text-green-600 text-sm">inclusive of all taxes</p>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
         {product.description || "no description available"}
          </p>
      
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800">SELECT SIZE (UK Size)</h4>
            <span className="text-pink-600 text-sm font-medium cursor-pointer hover:underline">
              SIZE CHART
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            {[ 5,6,7,8,9].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 border rounded-full flex items-center justify-center text-lg font-medium ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

       
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleAddToBag}
            className="flex-1 bg-pink-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-pink-700 transition"
          >
            ADD TO BAG
          </button>

          <button
            onClick={handleAddToWishlist}
            className="flex-1 border border-gray-400 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <Heart size={20} /> WISHLIST
          </button>
        </div>

        
      </div>
    </div>
  );
}
