import { Truck,RefreshCw,Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FeaturesSection({}){
    const navigate = useNavigate();
    return (
        <div className="w-full py-12 flex flex-col items-center bg-blue-100">

            {/* {view All button} */}
            <button
            onClick={()=>navigate("/shop")}
            className="bg-blue-800 text-white px-10 py-6 rounded-md text-lg  font-semibold mb-12 hover:bg-blue-600 transition">
            VIEW ALL PRODUCTS
            </button>
            
            {/* {feature} */}
            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-32 text-center">
             
             {/* {free Ship} */}
             <div className="flex flex-col items-center">
                <Package className="w-8 h-8 text-[#0D2E4E] mb-3"/>
                <p className="text-sm font-medium text-gray-700">
                  FREE SHIPPING
                </p>
             </div>

             {/* {return} */}
             <div className="flex flex-col items-center">
                <RefreshCw className="w-8 h-8 text-[#0D2E4E] mb-3"/>
                <p className="text-sm font-medium text-gray-700">
                    RETURN WITHIN 15 DAYS
                </p>
             </div>

             {/* {express delivery} */}
             <div className="flex flex-col items-center">
                <Truck className="w-8 h-8 text-[#0D2E4E] mb-3"/>
                <p className="text-sm font-medium text-gray-700">
                    EXPRESS DELIVERY IN STORE MODE
                </p>
             </div>
            </div>
        </div>
    )
}
export default FeaturesSection;