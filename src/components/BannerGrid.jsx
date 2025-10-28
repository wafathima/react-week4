import { useNavigate } from "react-router-dom";
export default function BannerGrid(){
  const navigate = useNavigate();

    const banners=[
        {
            id:1,
            img:"https://jazko.com/wp-content/uploads/2023/12/Palermo-2980-2.jpg",
            title:"THE FUTURE JUST LANDED",
            subtitle:"OWN THE NEW SEASON",
            buttonText1:"FOR HIM",
            buttonText2:"FOR HER"
        },
    ];

    return(
        <div className="relative w-full h-full overflow-hidden rounded-2xl">

            {/* {img} */}
            {banners.map((b)=>(
                <div key={b.id} className="relative w-full h-full group">
                    <img
                    src={b.img}
                    alt={`Banner ${b.id}`}
                    className="w-full  object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
                    />

                    {/* {text} */}
                    <div className="absolute inset-0 flex flex-col items-start justify-start px-12 p-20  text-white ">
                        <h2 className="text-6xl font-extrabold mb-9">{b.title}</h2>
                       <p className="text-4xl mb-6 max-w-md opacity-90">{b.subtitle}</p>

                       <div className="flex gap-6">

                       <button onClick={()=>navigate("/shop?category=Men")}
                       className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-300 transition-all duration-300">{b.buttonText1}</button>
                         <button onClick={()=> navigate("/shop?category=Women")}
                          className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-300 transition-all duration-300">{b.buttonText2}</button>
                        </div>
                    </div>
                </div>
                
            ))}
        </div>
        
    )
}

