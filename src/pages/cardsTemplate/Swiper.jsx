import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './swipestyle.css'

export default function Swipers() {
  const swipelinks = [{
    img: "https://m.media-amazon.com/images/I/81sbdlgNjNL._AC_UF1000,1000_QL80_.jpg"
  }, {
    img: "https://i.pinimg.com/736x/11/ae/2d/11ae2d691b0bb1fa22fd082182b7588b.jpg"
  }, {
    img: "https://tatvik.shop/cdn/shop/articles/CARRIER_OIL_WHITE_blog_1.png?v=1700648800&width=1100"
  }, {
    img: "https://static.vecteezy.com/system/resources/thumbnails/004/732/000/small_2x/body-wash-ad-with-leaf-and-flower-background-liquid-soap-products-made-from-natural-extracts-and-fragrant-flowers-realistic-eps-file-vector.jpg"
  }, {
    img: "https://b2177822.smushcdn.com/2177822/wp-content/uploads/2020/01/Sandal-Soap-75g.png?lossy=1&strip=1&webp=1"
  }, {
    img: "https://myayurmanthra.com/wp-content/uploads/2020/07/Aloe-vera.png"
  }, {
    img: "https://cdn.shopify.com/s/files/1/0551/4575/8907/files/Eucalyptus_essential_oil_for_car_freshness_600x600.png?v=1692599035"
  }
  ]
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {swipelinks.map((item, index) => (
          <SwiperSlide key={index}><img src={item.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
