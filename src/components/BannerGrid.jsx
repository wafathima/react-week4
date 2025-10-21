export default function BannerGrid(){
    const banners=[
        {id:1,img:"https://cdn.sanity.io/images/c1chvb1i/production/d000444ef7d446b1600cbd4d240b9aa85e74a48b-1980x1320.jpg"},
        
    ];

    return(
        <div className="w-full h-full">
            {banners.map((b)=>(
              <img 
              key={b.id}
              src={b.img}
              alt={`Banner ${b.id}`}
              className="rounded-ig w-full h-full object-cover "
              />
            ))}
        </div>
    )
}

