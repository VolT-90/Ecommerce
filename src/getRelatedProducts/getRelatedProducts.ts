

export default async function getRelatedProducts(cardId : string) {
 const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${cardId}`)

 const payload = response.json()
 return payload
}
