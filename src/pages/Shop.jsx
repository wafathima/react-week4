
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
    const category = params.get("category")||"";
     const searchQuery = params.get("search")?.toLowerCase|| "";

    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    // if(status === "loading") return <div>Loading...</div>
    // if(status === "failed")return <div>Error loading products</div>
    // if(!items) return null;

    // const filteredProducts = items.filter((p)=>{
    //     const matchesSearch = p.name.toLowerCase().includes(searchQuery);
    //     const matchesCategory = category ? p.category === category:true;
    //     return matchesSearch && matchesCategory;
    // })

    let filteredProducts = items;
    if(searchQuery){
        filteredProducts = filteredProducts.filter((p)=>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())||
       p.category.toLowerCase().includes(searchQuery.toLowerCase)
    );
    }

    if (category){
        filteredProducts = filteredProducts.filter(
        (p)=>p.category.toLowerCase()===category.toLowerCase()
        );
    }

    return (
         <div>
            <Navbar/>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {category? `${category}`:"All Products"}
                </h1>
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