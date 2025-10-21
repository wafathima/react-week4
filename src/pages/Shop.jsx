// import { useParams } from "react-router-dom";
// import { useSelector,useDispatch } from "react-redux";
// import ProductList from "../features/products/ProductList";
// import Navbar from "../components/Navbar";
// import { fetchProducts } from "../features/products/productsSlice";
// import { useEffect,useState } from "react";
// import CategoryGrid from "../components/categoryGrid";

// export default function Shop(){
//     const {category} = useParams();
//     const dispatch = useDispatch();
//      const [showAll, setShowAll] = useState(false);
//      const [searchTerm,setSearchTerm] = useState("");
//     const [sort,setSort] = useState("none")

//         const items = useSelector((state)=>state.products.items);
//         const status = useSelector((state)=>state.products.items);
 
//         const productsToShow = showAll ? items: items?.slice(0,6) || [];

//     useEffect(()=>{
//         if(items.length ===0){
//             dispatch(fetchProducts())
//         }
//     },[dispatch, items?.length]);

//    if(status === "loading") return <div>Loading...</div>;
//    if(status === "failed") return <div>Error loading products</div>


// const filtered= items
//     .filter((p)=>p.name.toLowerCase().includes(searchTerm.toLowerCase()))

//     .filter((p)=>(category === "All"? true: p.category === category))

//     .sort ((a,b)=>
//     sort === "low-high"
//        ?a.price - b.price: sort === "hig-low" ? b.price - a.price:0)


//     return(
//         <div className="p-8">
           
//             <h2 className="text-3xl font-bold mb-6 capitalize">
//                 {category ? `${category}Collection`:"All Products"}
//                  </h2>
//                  {filtered.length > 0 ?(
//                     <ProductList products={filtered}/>
//                  ):(
//                     <p>No products fount in this category </p>
//                  )}
//         </div>
//     )
// }

import { useEffect } from "react";
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
    const category = params.get("category");

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    if(status === "loading") return <div>Loading...</div>
    if(status === "failed")return <div>Error loading products</div>
    if(!items) return null;

    const filteredProducts= category ? items.filter((p)=>p.category===category):items;

    return (
         <div>
            <Navbar/>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {category? `${category}`:"All Products"}
                </h1>
                <ProductList products={filteredProducts}/>
            </div>
            <Footer/>
         </div>
    )
}