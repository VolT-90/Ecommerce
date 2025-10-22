"use client";
import React from "react";
import img1 from "../../../../public/images/slider-image-1.jpeg";
import img2 from "../../../../public/images/slider-image-2.jpeg";
import img3 from "../../../../public/images/slider-image-3.jpeg";
import img4 from "../../../../public/images/blog-img-2.jpeg";
import img5 from "../../../../public/images/blog-img-1.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay} from "swiper/modules";

export default function MainSlider() {
  return (
    <div className="w-[80%] flex mx-auto my-4">
      <div className="w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}   // 👈 enables infinite loop
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <Image
              alt="img1"
              src={img1}
              className="h-[400px] object-cover w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="img2"
              src={img4}
              className="h-[400px] object-cover w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="img3"
              src={img5}
              className="h-[400px] object-cover w-full"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/4">
        <Image alt="img2" src={img2} className="h-[200px] object-cover" />
        <Image alt="img2" src={img3} className="h-[200px] object-cover" />
      </div>
    </div>
  );
}
