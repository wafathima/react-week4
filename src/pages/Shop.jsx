import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProducts } from "../features/products/productsSlice";
import ProductList from "../features/products/ProductList";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Navigate } from "react-router-dom";
import { use } from "react";

export default function Shop(){
    const dispatch = useDispatch();
    const {items,status} =useSelector((s)=>s.products);
    const location = useLocation();
    const [searchTerm,setSearchTerm] = useState("");

    const params = new URLSearchParams(location.search);
    const category = params.get("category")||"";
     const [sortOrder,setSortOrder] = useState("default");

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    let filteredProducts = items;

       if(searchTerm.trim()){
        filteredProducts = filteredProducts.filter((p)=>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
       }


     if(category){
        filteredProducts = filteredProducts.filter(
            (p)=>p.category.toLowerCase()=== category.toLowerCase()
        );
     }
 
    if(sortOrder === "low-high"){
        filteredProducts=[...filteredProducts].sort((a,b)=>a.price-b.price)
    }else if (sortOrder === "high-low"){
        filteredProducts=[...filteredProducts].sort((a,b)=>b.price - a.price)
    }

    return (
         <div>
            <Navbar/>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-center mt-8">
                    {category? `${category}`:"All Products"}
                </h1>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
                    {/* {search} */}
                    <div className="relative w-full sm:w-1/2">
                    <Search
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                     <input
                     type="text"
                     placeholder="Search for products and Brands"
                     value={searchTerm}
                     onChange={(e)=>setSearchTerm(e.target.value)}
                     
                     className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-black focus:border-black outline-none text-gray-700"
                     />
                    </div>

                    {/* {sort} */}
                    <select
                    value={sortOrder}
                    onChange={(e)=>setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-2.5 shadow-sm text-gray-700 bg-white cursor-pointer hover:border-black focus:ring-2 focus:ring-black"
                    >
                        <option value="default">Sort by</option>
                        <option value="low-high">Low-High</option>
                        <option value="high-low">High-Low</option>
                    </select>
                  </div>

                {filteredProducts.length > 0 ?(
                    <ProductList products={filteredProducts}/>
                ):(
                    <p className="text-center text-gray-500 text-lg">no products found</p>
                )}
            </div>
            <Footer/>
         </div>
)
}