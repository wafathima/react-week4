import { useNavigate } from "react-router-dom";
export default function BannerGrid() {
  const navigate = useNavigate();

  const banners = [
    {
      id: 2,
      img: "https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/6376085_CAM_Onsite_Static_FW_25_Animal_Print_27_Oct_PHI_Masthead_Banner_Desktop_2880x1280_D_44bb59ec33.gif",
      title: "WILD STYLE UNLEASHED",
      subtitle: "ANIMAL PRINT COLLECTION"
    },
    {
      id: 1,
      img: "https://jazko.com/wp-content/uploads/2023/12/Palermo-2980-2.jpg",
      title: "THE FUTURE JUST LANDED",
      subtitle: "OWN THE NEW SEASON",
      buttonText1: "FOR HIM",
      buttonText2: "FOR HER"
    },
    {
      img:"https://cdn.dribbble.com/users/1465772/screenshots/5726970/adidas_dri.gif"
    }
   
  ];

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {banners.map((banner) => (
        <div 
          key={banner.id} 
          className="relative w-full overflow-hidden rounded-2xl group"
        >
          <img
            src={banner.img}
            alt={`Banner ${banner.id}`}
            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-300"
          />

          <div className={`absolute inset-0 flex flex-col text-white ${
            banner.id === 1 
              ? "items-start justify-start px-12 p-20" 
              : "items-center justify-center text-center px-6 md:px-12 lg:px-20" 
          }`}>
            {banner.title && (
              <h2 className={`font-extrabold max-w-2xl leading-tight ${
                banner.id === 1 
                  ? "text-6xl mb-9" 
                  : "text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 lg:mb-8"
                  
              }`}>
                {banner.title}
              </h2>
            )}

            {banner.subtitle && (
              <p className={`max-w-md opacity-90 ${
                banner.id === 1 
                  ? "text-4xl mb-6" 
                  : "text-xl md:text-3xl lg:text-4xl mb-6 md:mb-8 lg:mb-10" 
              }`}>
                {banner.subtitle}
              </p>
            )}

            {(banner.buttonText1 || banner.buttonText2) && (
              <div className="flex gap-6">
                {banner.buttonText1 && (
                  <button 
                    onClick={() => navigate("/shop?category=Men")}
                    className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    {banner.buttonText1}
                  </button>
                )}
                
                {banner.buttonText2 && (
                  <button 
                    onClick={() => navigate("/shop?category=Women")}
                    className="bg-white text-black px-6 py-3 font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    {banner.buttonText2}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}