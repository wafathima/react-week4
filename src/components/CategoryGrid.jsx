import { useNavigate } from "react-router-dom";


export default function CategoryGrid(){
    const navigate = useNavigate();

const categories = [
    {name:"Men", image:"https://chicagocitysports.com/cdn/shop/files/Men_s-PUMA-Suede-Classic-XXI-Shoes-Peacoat-Navy_37491504_08.jpg"},
     {name:"Women", image:"https://img01.ztat.net/article/spp-media-p1/347caa8e9ef64465bb44c1af82b2edc2/49360ac8555d4540a78047d5b64ae338.jpg?imwidth=762"},
      {name:"New Arrivals", image:"https://cdn.sanity.io/images/qa41whrn/prod/19da2b3bb88bee229893ec5ee82c0aa4444541c1-800x800.jpg"},
      {name:"Sports", image:"https://cdn.mos.cms.futurecdn.net/GRkHKErVf5VpAHfcDs4vg5-1280-80.jpg"}
];
      const handleCategoryClick = (category)=>{
        navigate(`/shop?category=${encodeURIComponent(category)}`);
      }

    return (
        <div className="py-10 px-6 grid grid-cols-2 sm: grid-cols-4 gap-6">
            {categories.map((cat)=>(
                <div
                key={cat.name}
                onClick={()=>handleCategoryClick(cat.name)}
                className="relative cursor-pointer group"
                >
                    <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-70 object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                    <p className="text-white text-2xl font-semibold">{cat.name}</p>
                    </div>
                </div>
            ))}

        </div>
    );
}