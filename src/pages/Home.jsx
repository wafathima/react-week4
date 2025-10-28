import Hero from "../components/hero";
import CategoryGrid from "../components/categoryGrid";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import BannerGrid from "../components/BannerGrid";
import FeaturesSection from "../components/FeaturesSection";

export default function Home(){
    
    return (
        <div >
             <Navbar/>
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

            {/* {about store} */}
               <FeaturesSection/>
            <Footer/>
        </div>
    )
}