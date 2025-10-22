"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay} from "swiper/modules";
import { CategoryType } from "@/types/Category.type";
import Image from "next/image";

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
  // console.log(data);

  return (
    <div className="mx-auto w-[80%] my-8">
      <h2 className="font-bold text-slate-400 text-xl my-1">
        Shop Popular Categories{" "}
      </h2>
      <Swiper
        spaceBetween={8}
        slidesPerView={7}
        loop={true} // 👈 enables infinite loop
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        {data.map((category: CategoryType) => (
          <SwiperSlide key={category._id || category.name}>
            <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-xl">
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-center font-bold mt-2">{category.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
