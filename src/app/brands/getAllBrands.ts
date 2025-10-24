'use server'
export default async function getAllBrands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands',{
    method : 'GET'
  } 
)
const payload = response.json()
return payload
}
