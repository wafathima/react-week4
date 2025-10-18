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
        <div className="p-8 ">

            {/* {header} */}
            <div className="bg-gray-100 w-full h-auto  shadow-lg ">
            <h1 className="text-9xl sm:text-9xl font-bold mb-10 text-center text-red-900 ">L I O  <span className="text-blue-900 font-semibold ">Store</span></h1>
             </div>

             <hr/>

             <div className="flex justify-between mb-9 mt-7">
                
            {/* {filter&sortbar} */}
            <div className="flex-justify-start">
                <input
                placeholder="What are you looking for?"
                className="p-3 h-12 w-48 text-sm focus:outline-none border"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />

                {/* {category} */}
                <select className="p-3 h-12 appearance-none min-w-[100px]text-sm bg-white cursor-pointer focus:ouline-none border justify-center"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                >
                <option value="All">All</option>
                <option value="Bag">Bag</option>
                <option value="Footwear">Footwear</option>
                <option value="Clothing">Clothing</option>
                <option value="Watch">Watch</option>
                <option value="Specs">Specs</option>
                <option value="Shirt">Shirt</option>
                </select>

                {/* {sort} */}
                <select className="p-3 h-12 appearence-none min-w-[100px] text-sm bg-white cursor-pointer focus:outline-none border "
                value={sort}
                onChange={(e)=>setSort(e.target.value)}
                >
                    <option value="">Sort</option>
                    <option value="high-low">High-Low</option>
                    <option value="low-high">Low-High</option>
                </select>
            </div>

             {/* {button} */}
             <div className="flex justify-end gap-5">
             <button className="bg-red-900 text-white font-semibold py-3 px-10 rounded hover:bg-red-700 transation duration-300">Login</button> 
             <button className="bg-blue-900 text-white font-semibold py-3 px-10 rounded hover:bg-blue-700 transation duration-300">Cart</button>
             </div>

        </div>
        
        <div className="grid grid-colos-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-auto max-auto ">
            {filtered.map((p)=>(
                <div
                key={p.id}
                className="border rounded p-4 hover:shadow-lg transition duration-300"
                >
                    <img src={p.image} alt={p.name} className="w-full object-cover rounded mb-2 "/>
                    <h3 className="font-semibold mt-2 ">{p.name}</h3>
                    <p className="font-bold text-lg">{p.price}</p>
                    <p className="text-sm text-gray-600">{p.category}</p>

                </div>
            ))}
        </div>
        </div>
    )  
}
export default Home;