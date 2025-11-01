import Hero from "../components/hero";
import CategoryGrid from "../components/categoryGrid";
import BannerGrid from "../components/BannerGrid";
import FeaturesSection from "../components/FeaturesSection";
import { useNavigate } from "react-router-dom";

  


export default function Home(){
    const navigate = useNavigate();
    
    return (
        <div >
            
            <Hero/>
         
            {/* {categories section} */}
            <section className="py-12 px-6">
                <h2 className="text-3xl font-bold mb-6 text-center">DISCOVER OUR COLLECTIONS</h2>
                  <CategoryGrid/>
            </section>

            {/* {banners} */}
            <section className="py-10 px-6">
                <BannerGrid/>
            </section>

           <div className=" relative flex justify-center h-[800px] w-[500px] mx-auto my-4 ">
           
            <img 
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/image_collection_3_b86a4d088a.jpg"
            />
            <img
             src="https://images.footlocker.com/content/dam/final/footlocker/site/backpages/2023/story/230623-fl-adidas-brand-page-stories-asp-samba.jpg"
             className="w-full h-full object-cover "
            />
            <img
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_800,w_800/unisex_if_needed_b5016083d3.jpg"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-end text-center text-white p-4">
            <h2 className="text-3xl font-bold mb-3">SAMBA COLLECTION</h2>
             <p className="text-lg mb-4 opacity-90">Classic Style Reimagined</p>
             <button    onClick={() => navigate("/shop?category=Samba")}
             className="bg-white text-black px-6 py-2 font-semibold hover:bg-gray-400 transition-all duration-300">
             SHOP NOW
            </button>
           </div>
           </div>

            {/* {about store} */}
               <FeaturesSection/>
              
            
        </div>
    )
}