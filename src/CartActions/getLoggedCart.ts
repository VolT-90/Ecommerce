import getMyToken from "@/utilities/getMyToken";

export default async function getLoggedUserCart() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please login to be able to access the cart");
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}
