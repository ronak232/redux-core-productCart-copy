import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import data from "../Json/data.json";
import "swiper/css";
import "swiper/css/navigation";

function LogoSlider() {
  // We can use it's core functionality
  // To configue the Slider as we want to it to be
  SwiperCore.use([Autoplay]);
  return (
    <section>
      <div className="logo-slider">
        <div className="logo-slider-container">
          <Swiper
          className="abc"
            tag="div"
            modules={[Navigation]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 0,

                navigation: "true",
              },
            }}
          >
            {data?.com?.map((item, index) => {
              return (
                <SwiperSlide
                  className="logo-slider-wrapper"
                  key={index}
                  tag="div"
                >
                  <a href="/">
                  <img
                    src={`${item?.imgUrl}`}
                    alt=""
                    className="logo-slider-wrapper-img"
                  />
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default LogoSlider;
