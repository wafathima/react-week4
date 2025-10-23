
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../features/products/productsSlice";
import ProductList from "../features/products/ProductList";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { use } from "react";

export default function Shop(){
    const dispatch = useDispatch();
    const {items,status} =useSelector((s)=>s.products);
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const category = params.get("category")||"";
     const searchQuery = params.get("search")?.toLowerCase()|| "";
     const [sortOrder,setSortOrder] = useState("default");

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    console.log("url category",category);
    console.log("searchQuery",searchQuery);
    console.log("all items",items);

    let filteredProducts = items;

    if(searchQuery){
        filteredProducts = filteredProducts.filter((p)=>
        p.name.toLowerCase().includes(searchQuery)||
       p.category.toLowerCase()=== searchQuery
    );
    }

    if (category){
        filteredProducts = filteredProducts.filter(
        (p)=>p.category.toLowerCase() === category.toLowerCase()
        );
    }
 
    if(sortOrder === "low-high"){
        filteredProducts=[...filteredProducts].sort((a,b)=>a.price-b.price)
    }else if (sortOrder === "high-low"){
        filteredProducts=[...filteredProducts].sort((a,b)=>b.price - a.price)
    }

    // console.log("filtered products", filteredProducts)

    return (
         <div>
            <Navbar/>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {category? `${category}`:"All Products"}
                </h1>

                {/* {sort} */}
                  <div className="flex justify-end mb-6">
                       <select
                       value={sortOrder}
                       onChange={(e)=>setSortOrder(e.target.value)}
                       className="border px-3 py-2 rounded text-sm"
                       >
                        <option value="All">Sort by</option>
                        <option value="low-high">Low - High</option>
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