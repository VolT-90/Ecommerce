import getCategories from '@/api/getCategories'
import React from 'react'
import CategorySwiper from '../categorySwiper/page';


export default async function CategorySlider() {

    const {data} = await getCategories()
    
  return (
    <div>
      <CategorySwiper data = {data}/>
    </div>
  )
}
