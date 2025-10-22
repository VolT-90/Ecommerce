"use server"
import { checkoutSchemaType } from '@/app/Schema/checkout.schema'
import getMyToken from '@/utilities/getMyToken'

export default async function onlinePayment(cartId: string,url = process.env.NEXT_URL,formValues : checkoutSchemaType) {
  const token = await getMyToken()
  if(!token) throw new Error("Login First")

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
    method :'POST',
    headers : {
        token,
        "Content-type" : "application/json"
    },
    body : JSON.stringify({shippingAddress : formValues})
  })

  const payload = response.json()
  return payload;
}
