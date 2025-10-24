import { BrandType } from "@/types/Brand.type";
import getAllCategories from "./getAllBrands";
import Image from "next/image";

export default async function Categories() {
  const response = await getAllCategories();

  return (
    <div className="w-full px-4 mb-10">
      <h1 className="font-bold text-4xl text-center text-green-500 my-8">
        Our Brands
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-6xl">
        {response?.data?.map((brand: BrandType) => (
          <div
            key={brand._id}
            className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] text-center flex flex-col items-center"
          >
            {/* Image container */}
            <div className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] overflow-hidden rounded-xl shadow-md transform transition duration-300 hover:-translate-y-2 shadow-md hover:shadow-lg cursor-pointer">
              <Image
                src={brand.image}
                alt={brand.name}
                width={340}
                height={340}
                className="object-contain w-full h-full"
              />
            </div>

            {/* brand name */}
            <p className="mt-3 font-semibold text-lg text-gray-800">
              {brand.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
