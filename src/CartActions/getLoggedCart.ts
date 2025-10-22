'use server'
import getMyToken from '@/utilities/getMyToken'

export default async function getLoggedUserCart() {

    const token = await getMyToken()

    if(!token){
        throw new Error ('Please login to be able add to the cart')
    }

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
    method : 'GET',
    headers : {
        token,
        "Content-Type" : "application/json"
    },
  })
  const payload = await response.json()
  return payload
}
