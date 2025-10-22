
  //Fetch all products
  export default async function getAllProducts(){
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products",
    {
      cache : 'force-cache',
      // next : {
      //   revalidate : 60
      // }
    }
  );
  const { data } = await response.json();
  return data
  }
