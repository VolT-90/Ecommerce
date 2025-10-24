'use server'
export default async function getAllCategories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories',{
    method : 'GET'
  } 
)
const payload = response.json()
return payload
}
