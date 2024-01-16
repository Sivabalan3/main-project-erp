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
    img: "https://tiimg.tistatic.com/fp/2/004/930/akathiya-turmeric-sandal-handmade-soap-503.jpg"
  }, {
    img: "https://5.imimg.com/data5/IR/RS/MY-7782064/akathiya-handmade-herbal-soap.jpg"
  }, {
    img: "https://5.imimg.com/data5/KF/GN/MY-7782064/akathiya-handmade-herbal-soap-500x500.jpg"
  }, {
    img: "https://cdn.shopify.com/s/files/1/2395/7673/files/1_-_Coconut_Milk_Soap_Recipe-02_480x480.jpg?v=1685347131"
  }, {
    img: "https://www.drsquatch.com/cdn/shop/articles/shutterstock_216984226_coconut1-e1430940754723.jpg?v=1629088736"
  }, {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJsIrt3AHKHhbjuDVFQekpsJJ3smvilligR6rtG7NqpRbwPSBplHBMBnWGC0G8Ti7xSBw&usqp=CAU"
  }, {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5zpoiSGbdNG9NE2gKHz47ZmSkyC8eoMqmv-zZFe0ZBhdLN5CMrPDHbEtWRPkOzG8W9xU&usqp=CAU"
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
