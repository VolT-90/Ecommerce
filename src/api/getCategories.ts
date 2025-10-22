
export default async function getCategories() {
  const respnse = await fetch('https://ecommerce.routemisr.com/api/v1/categories', 
    {
      cache : 'force-cache',
      // next : {
      //   revalidate : 60
      // }
    })
  const data = respnse.json()
  return data
}
