import { useNavigate } from "react-router-dom"

export default function Hero(){
    const navigate = useNavigate();

    return (
        <section className="relative w-full h-[80vh] mt-12">
       <img
       src="https://cdn.sanity.io/images/c1chvb1i/production/3c0c79efc86ab4b17f18caad43ba9388d0b2e924-1200x579.png"
       alt="puma banner"
       className="w-full h-full object-cover rounded "
       />
       <div className="absolute inset-0 flex flex-col items-start justify-center px-12 bg-black/30 text-white">
         <h1 className="text-5xl sm:text-6xl font-bold mb-4">FOR THE TRENDSETTERS.</h1>
         <p className="text-lg mb-6 ">SPEEDCAT RETURNS IN NEW COLORWAYA FOR THE SEASON</p>
         
         <div className="flex center gap-5">
        <button  onClick={()=> navigate("/shop")}
        className="bg-white text-black py-3 px-6 font-semibold rounded hover:bg-gray-300 transition">SHOP NOW</button>
       </div>

       </div>
        </section>
    )
}