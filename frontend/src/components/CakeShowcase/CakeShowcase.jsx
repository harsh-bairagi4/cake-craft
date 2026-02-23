import { useContext } from "react";
import { Context } from "../../context/Context";
import "./CakeShowcase.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const CakeShowcase = () => {
  const { cakeList, capitalize , loading, hasAnimated} = useContext(Context);

  return (
    <section className="cake-showcase">
      <h2 className="section-title">Cakes Created by Our Community</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView="auto" 
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={5000}
        grabCursor={true}
        className="cake-swiper"
      >
        {loading ?
        Array(5).fill(0)
      .map((_, index) => (
         <SwiperSlide key={index} className="card-cake">
                  <div className="skeleton-img"></div>
                  <div className="cake-information">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-subtitle"></div>
                  </div>
          </SwiperSlide>
      ))
      :
        cakeList.map((cake, index) => (
          <SwiperSlide key={index} className="card-cake">
            <img src={cake.image} alt={cake.name} />
            <div className="cake-information">
              <h3>{cake.name}</h3>
              <h4>Designed By : <span className="creator">  {cake.createdBy?.name
    ? capitalize(cake.createdBy.name)
    : "Community Member"}</span></h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CakeShowcase;
