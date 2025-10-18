import { useState,useEffect } from "react";
import axios from "axios";

function Home(){
    const [products,setProducts] =useState([]);
    const [search , setSearch] = useState("");
    const [category,setCategory] = useState("All");
    const [sort,setSort] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:5001/products").then((res)=>{
            setProducts(res.data)
        });
    },[]);
    const filtered = products
    .filter((p)=>
    p.name.toLowerCase().includes(search.toLowerCase())
)
.filter((p)=>(category === "All"? true: p.category === category))
.sort((a,b)=>
sort === "low-high"
   ?a.price - b.price 
   :sort === "high-low"
   ? b.price-a.price
   :0
);
    return(
        <div className="p-8">
        <h1 className="text-8xl font-bold mb-25 text-center text-red-900">L I O |Store</h1>

        <div className="flex gap-2 justify-center mb-4">
            <input 
            placeholder="find"
            className="border p-2 rounded"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <select
            className="border p-2 rounded"
            onChange={(e)=>setCategory(e.target.value)}
            >
                <option>All</option>
                <option>Bag</option>
                <option>Footwear</option>
                <option >Clothing</option>
            </select>

            <select
            className="border p-2 rounded"
            onChange={(e)=>setSort(e.target.value)}
            >
             <option value="">Sort</option>
             <option value="low-high">Low - High</option>
             <option value="high-low">High - Low</option>
            </select>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {filtered.map((p)=>(
                <div 
                key={p.id}
                className="border rounded p-4 hover:shadow-md transition"
                >
                    <img src={p.image} alt={p.name} className="w-full h-40 object-cover"/>
                    <h3 className="font-semibold mt-2">{p.name}</h3>
                    <p>{p.price}</p>
                    <p className="text-sm text-gray-600">{p.category}</p>
                </div>
             ))}
            </div>
        </div>
        </div>
    )
}
export default Home;