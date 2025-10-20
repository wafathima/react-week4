import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {fetchProducts} from "../features/products/productsSlice";
import ProductList from "../features/products/ProductList";

export default function Home (){
    const dispatch = useDispatch();
    const {items , status} = useSelector(s=> s.products);
    const [showAll, setShowAll] = useState(false);

    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])

    if(status === "loading") return <div>Loading...</div>;
    if(status === "failed") return <div>Error loading products</div>
     
    const productsToShow = showAll ? items:items.slice(0,6);

    return (
        <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Featured products</h1>
        <ProductList products={productsToShow}/>
        <div className="mt-6 flex justify-center">
            <button onClick={()=> setShowAll(s => !s)} className="py-2 px-4 border rounded">
             {showAll ? "show less" : `view all (${items.length})`}
            </button>
          </div>
        </div>
    );
}

