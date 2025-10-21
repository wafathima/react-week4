// import { useEffect,useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import {fetchProducts} from "../features/products/productsSlice";
// import ProductList from "../features/products/ProductList";
// import Navbar from "../components/Navbar";
// import Hero from "../components/hero";
// import Footer from "../components/footer";
// import CategoryGrid from "../components/categoryGrid";

// export default function Home (){
//     const dispatch = useDispatch();
//     const {items , status} = useSelector(s=> s.products);
//     const [showAll, setShowAll] = useState(false);

    
//    const [searchTerm,setSearchTerm] = useState("");
//     const [category,setCategory] = useState("All");
//     const [sort,setSort] = useState("none")

//     useEffect(()=>{
//         dispatch(fetchProducts())
//     },[dispatch])

//     if(status === "loading") return <div>Loading...</div>;
//     if(status === "failed") return <div>Error loading products</div>
    
    // const filtered= items
    // .filter((p)=>p.name.toLowerCase().includes(searchTerm.toLowerCase()))

    // .filter((p)=>(category === "All"? true: p.category === category))

    // .sort ((a,b)=>
    // sort === "low-high"
    //    ?a.price - b.price: sort === "hig-low" ? b.price - a.price:0)

    

//     return (
            
//         <div className="p-8 ">
//             <Hero/>
//             <CategoryGrid/>
//           <h1 className="text-4xl font-bold font-serif mb-6 ">SPEEDCAT</h1>

          {/* {filtered} */}
        //   <div className="flex flex-wrap gap-4 mb-6 border bg-gray-400 ">
        //     {/* {search} */}
        //     <input 
        //     type="text"
        //     placeholder="What are you looking for?"
        //     value={searchTerm}
        //     onChange={(e)=>setSearchTerm(e.target.value)}
        //     className=" px-3 py-2 w-64"
        //     /> 
          
//             {/* {category} */}
//             <select
//             value={category}
//             onChange={(e)=>setCategory(e.target.value)}
//             className=" px-3 py-2 "
//             >
//                 <option value="All">All</option>
//                 <option value="Women's Shoes">Women</option>
//                 <option value="Men's Shoes">Men</option>
//             </select>

//             {/* {sort} */}
//             <select
//             value={sort}
//             onChange={(e)=>setSort(e.target.value)}
//             className=" px-3 py-2"
//             >
//               <option value="none">Sort</option>
//               <option value="low-high">Low-High</option>
//               <option value="high-low">High-Low</option>  
//             </select>
//           </div>

//           {/* {ProductList} */}
//           <ProductList products={filtered}/>
//          <Footer/>
//          </div>
       
//     );
// }

import Hero from "../components/hero";
import CategoryGrid from "../components/categoryGrid";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import BannerGrid from "../components/BannerGrid";

export default function Home(){
    return (
        <div>
             <Navbar/>
            <Hero/>
         
            {/* {categories section} */}
            <section className="py-12 px-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Shop by Category</h2>
                  <CategoryGrid/>
            </section>

            {/* {banners} */}
            <section className="py-10 px-6">
                <BannerGrid/>
            </section>
           
            <Footer/>
        </div>
    )
}