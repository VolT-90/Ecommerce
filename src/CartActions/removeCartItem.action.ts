"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function removeItemFromCart(id: string) {
  const token = await getMyToken();
  if (!token) throw new Error("Please log in first");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  const payload = await res.json();
  return payload;
}
