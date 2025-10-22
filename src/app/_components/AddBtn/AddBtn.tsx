"use client";
import addToCart from "@/CartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/cartContext";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {

  const context = useContext(CartContext);

  if(!context) throw new Error("Not Exist")

  const {numberOfCartItems ,setnumberOfCartItems} = context

  async function checkAddProduct(id: string) {
    const res = await addToCart(id);
    console.log(res);

    if (res.status === "success") {
      toast.success(res.message +'👌', {
        position: "top-center",
        duration: 2000,
        className:
          "!bg-green-500 !border !border-green-500 !text-white !font-semibold !rounded-xl !shadow-md",
      });

      setnumberOfCartItems(numberOfCartItems + 1)
    } else {
      toast.error(`${res.message} `,{
              position: "top-center",
              duration: 2000,
              className: "!bg-red-500 !text-white !border !border-red-500 !font-semibold !rounded-xl !shadow-md",})
    }
  }

  return (
    <>
      <Button
        onClick={() => checkAddProduct(id)}
        className="cursor-pointer bg-green-500 w-full hover:bg-green-400  "
      >
        {" "}
        Add to cart{" "}
      </Button>
    </>
  );
}
