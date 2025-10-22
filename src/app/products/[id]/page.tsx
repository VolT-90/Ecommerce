import selectedProduct from "@/api/selectedProduct.api";
import SelectedProduct from "@/app/_components/selectedProduct/page";
import SinglePost from "@/app/_components/SingleProduct/singleProduct";
import getRelatedProducts from "@/getRelatedProducts/getRelatedProducts";
import { ProductType } from "@/types/Product.type";
import React from "react";

export default async function productDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data: ProductType = await selectedProduct(id);
  console.log(data.category._id);

  const relatedProducts = await getRelatedProducts(data.category._id);
  console.log(relatedProducts);

  return (
    <>
      <SelectedProduct data={data}></SelectedProduct>

      <div className="container w-[80%] mx-auto flex flex-wrap mt-12">
        {relatedProducts.data.map((currentProduct: ProductType) => (
          <SinglePost key={currentProduct.id} product={currentProduct} />
        ))}
      </div>
    </>
  );
}
