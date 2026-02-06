import { useContext } from "react";
import { Context } from "../../context/Context";
import "./CakeShowcase.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const CakeShowcase = () => {
  const { cakeList, capitalize } = useContext(Context);

  return (
    <section className="cake-showcase">
      <h2 className="section-title">Cakes Created by Our Community</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true} // 🔥 infinite loop
        autoplay={{
          delay: 0, // continuous scroll
          disableOnInteraction: false,
        }}
        speed={5000} // smooth long movement
        slidesPerView={1} // show as many as fit
        grabCursor={true}
        className="cake-swiper"
      >
        {cakeList.map((cake, index) => (
          <SwiperSlide key={index} className="card-cake">
            <img src={cake.image} alt={cake.name} />
            <div className="cake-information">
              <h3>{cake.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CakeShowcase;
