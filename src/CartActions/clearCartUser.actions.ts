'use server'
import getMyToken from '@/utilities/getMyToken'

export default async function clearCartUser() {
  const token = await getMyToken()
  if(!token) { throw new Error('You are not logged in')}

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
    method : 'DELETE',
    headers : {
        token,
        "Content-Type" : "application/json",
    },
  })

  const payload = await res.json()
  return payload
}
