import getAllProducts from '@/api/products.api'
import React from 'react'
import SinglePost from '../SingleProduct/singleProduct'
import { ProductType } from '@/types/Product.type'

export default async function AllProducts() {
  const data = await getAllProducts()

  return (
    <div>
      <div className="container w-[80%] mx-auto flex flex-wrap mt-12">
            {data.map((currentProduct : ProductType) => (
              <SinglePost key={currentProduct.id} product = {currentProduct}/>
            ))}
          </div>
    </div>
  )
}
