import React from "react";
import AddBtn from "../AddBtn/AddBtn";
import { ProductType } from "@/types/Product.type";
import Image from "next/image";

export default function SelectedProduct({ data }: { data: ProductType }) {
  return (
    <div className=" container w-full lg:w-[60%] mx-auto flex justify-center items-center my-8">
      <div className="w-1/4">
        <div className="w-full">
          <Image width={500} height={500} src={data.imageCover} alt="" />
        </div>
      </div>
      <div className="w-3/4 p-9">
        <h1 className="font-bold text-2xl mt-6">{data.title}</h1>
        <p className="my-4">{data.description}</p>
        <p className="text-green-500">{data.category.name}</p>
        <div className="flex justify-between my-4">
          <span>{data.price}</span>
          <span>
            <i className="fas fa-star text-yellow-400"></i>{" "}
            {data.ratingsAverage}
          </span>
        </div>
        <AddBtn id={data.id} />
      </div>
    </div>
  );
}
