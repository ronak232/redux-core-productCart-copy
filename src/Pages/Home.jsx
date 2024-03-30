import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
// import Shop from "../Components/Shop";
import { Link } from "react-router-dom";
import LogoSlider from "../Components/LogoSlider";
import { RiArrowUpSLine } from "react-icons/ri";
import Store from "../Components/Store";
import OffersBanner from "../Components/OffersBanner";

function Home() {
  return (
    <>
      <section>
        <div className="product__banner">
          <div className="product__banner--container">
            <div className="product__banner--slider">
              <Swiper
                tag="div"
                loop={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                speed={800}
                className="product__banner--slide"
              >
                <SwiperSlide className="slider">
                  <div className="product__banner--text">
                    <h2 className="product__banner--text-delay">
                      Check our huge
                    </h2>
                    <h1 className="product__banner--text-bold">Smartphones</h1>
                    <h5 className="product__banner--text-light">
                      & Accessories collection
                    </h5>

                    <a className="product__banner-btn-red" href="/">
                      Shop Now
                      <RiArrowUpSLine className="arrow" />
                    </a>
                  </div>
                  <div className="product__banner--slide-images">
                    <img
                      className="product__banner--slide-img"
                      src="https://img.freepik.com/free-vector/home-screen-concept-illustration_114360-4703.jpg?t=st=1711628645~exp=1711632245~hmac=2363b339533d9b020e36285af293f6e857eedf39da8e8e569629a5d633661b13&w=740"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slider">
                  <div className="product__banner--text">
                    <h2 className="product__banner--text-delay">
                      World of music with
                    </h2>
                    <h1 className="product__banner--text-bold">Headphones</h1>
                    <h5 className="product__banner--text-light">
                      Choose between top brands
                    </h5>
                    <a className="product__banner-btn-red" href="/">
                      Shop Now
                      <RiArrowUpSLine className="arrow" />
                    </a>
                  </div>
                  <div className="product__banner--slide-images">
                    <img
                      className="product__banner--slide-img"
                      src="https://cartzilla.createx.studio/img/home/hero-slider/05.jpg"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slider">
                  <div className="product__banner--text">
                    <h2 className="product__banner--text-delay">
                      Explore the best
                    </h2>
                    <h1 className="product__banner--text-bold">
                      VR Collection
                    </h1>
                    <h5 className="product__banner--text-light">
                      on the market
                    </h5>
                    <a className="product__banner-btn-red" href="/">
                      Shop Now
                      <RiArrowUpSLine className="arrow" />
                    </a>
                  </div>
                  <div className="product__banner--slide-images">
                    <img
                      className="product__banner--slide-img"
                      src="https://cartzilla.createx.studio/img/home/hero-slider/04.jpg"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="product__banner--sidepanel">
              <div className="product__banner--sidepanel-wrapper">
                <a href="/" className="product__banner--sidepanel-cam">
                  <img
                    src="https://cartzilla.createx.studio/img/home/banners/banner-sm01.png"
                    alt=""
                  />
                  <div className="product__banner--sidepanel-text">
                    <h3>Next Gen Video with 360 Cam</h3>
                    <div className="product__banner--sidepanel-cam-link">
                      Shop Now
                      <RiArrowUpSLine className="product__banner--sidepanel-cam-arrow" />
                    </div>
                  </div>
                </a>
                <a href="/" className="product__banner--sidepanel-gadgets">
                  <img
                    src="https://cartzilla.createx.studio/img/home/banners/banner-sm02.png"
                    alt=""
                  />
                  <div className="product__banner--sidepanel-text">
                    <h3>Top Rated Gadgets are on Sale</h3>
                    <div className="product__banner--sidepanel-gadgets-link">
                      Shop Now
                      <RiArrowUpSLine className="product__banner--sidepanel-gadgets-arrow" />
                    </div>
                  </div>
                </a>
                <a href="/" className="product__banner--sidepanel-earbuds">
                  <img
                    src="https://cartzilla.createx.studio/img/home/banners/banner-sm03.png"
                    alt=""
                  />
                  <div className="product__banner--sidepanel-text">
                    <h3>Catch Big Deals on Earbuds</h3>
                    <div className="product__banner--sidepanel-earbuds-link">
                      Shop Now
                      <RiArrowUpSLine className="product__banner--sidepanel-earbuds-arrow" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="shop-link">
        <div className="shop-link-products">
          <h2 className="shop-link-products-title">Special Offers</h2>
          <div className="shop-link-products-trigger">
            <Link className="shop-link-products-trigger-links" to="/shop">
              More Products
              <RiArrowUpSLine className="arrow" />
            </Link>
          </div>
        </div>
        <OffersBanner />
      </div>
      <LogoSlider />
      <Store />
    </>
  );
}

export default Home;
