"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import getLoggedUserCart from "@/CartActions/getLoggedCart";
import removeItemFromCart from "@/CartActions/removeCartItem.action";
import updateCartQuantity from "@/CartActions/updateCartQuantity.actions";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import clearCartUser from "@/CartActions/clearCartUser.actions";
import { CartContext } from "@/context/cartContext";
import { CartProductType } from "@/types/Cart.type";
import Link from "next/link";

export default function Cart() {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [removeDisable, setremoveDisable] = useState(false);
  const [updatedisabled, setupdatedisabled] = useState(false);
  const [loadingupdate, setloadingupdate] = useState(false);
  const [productId, setproductId] = useState("");
  const [total, settotal] = useState(0);
  const [cartId, setcartId] = useState("")

    const context = useContext(CartContext);
    if (!context) throw new Error("Not Exist");
  
    const { setnumberOfCartItems, numberOfCartItems } = context;

  async function getCart() {
    const response = await getLoggedUserCart();
    console.log(response);

    try {
      if (response.status === "success") {
        setproducts(response.data.products);
        settotal(response.data.totalCartPrice);
        console.log(response.cartId);
        setcartId(response.cartId)
        setloading(false);
      }
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  }

  async function deleteProduct(id: string) {
    setremoveDisable(true);
    setupdatedisabled(true);
    const res = await removeItemFromCart(id);
    console.log(res);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Product deleted successfully ✅", {
        position: "top-center",
        duration: 2000,
        className:
          "!bg-green-500 !border !border-green-500 !text-white !font-semibold !rounded-xl !shadow-md",
      });
      getCart();
      setupdatedisabled(false);
      setremoveDisable(false);
      let sum = 0;
      res.data.products.forEach((product: CartProductType) => {
        sum += product.count;
      });
      setnumberOfCartItems(sum);
    } else {
      toast.error(`There's an issue in deleting the product ❌`, {
        position: "top-center",
        duration: 2000,
        className:
          "!bg-red-500 !text-white !border !border-red-500 !font-semibold !rounded-xl !shadow-md",
      });
      setupdatedisabled(false);
      setremoveDisable(false);
    }
  }

  async function updateProduct(id: string, count: string, sign: string) {
    setupdatedisabled(true);
    setremoveDisable(true);
    setloadingupdate(true);
    setproductId(id);

    const res = await updateCartQuantity(id, count);
    console.log(res);
    if (res.status === "success") {
      setproducts(res.data.products);
      toast.success("Quantity updated successfully ✅", {
        position: "top-center",
        duration: 2000,
        className:
          "!bg-green-500 !border !border-green-500 !text-white !font-semibold !rounded-xl !shadow-md",
      });
      getCart();
      setloadingupdate(false);
      setupdatedisabled(false);
      setremoveDisable(false);
      if (sign == "+") {
        setnumberOfCartItems(numberOfCartItems + 1);
      } else {
        setnumberOfCartItems(numberOfCartItems - 1);
      }
    } else {
      toast.error(`There's an issue in updtaing the quantity ❌`, {
        position: "top-center",
        duration: 2000,
        className:
          "!bg-red-500 !text-white !border !border-red-500 !font-semibold !rounded-xl !shadow-md",
      });
      setloadingupdate(false);
      setupdatedisabled(false);
      setremoveDisable(false);
    }
  }

  async function clear() {
    const res = await clearCartUser();
    console.log(res);
    if (res.message == "success") {
      getCart();
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="#1ed540" size={197} />
      </div>
    );
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="w-full md:w-5/6 lg:w-2/3 mx-auto my-12 px-3">
          <div className="flex justify-end py-4">
            <Button
              onClick={() => {
                clear();
              }}
              className=" cursor-pointer bg-red-700 hover:bg-red-500"
            >
              Clear cart items
            </Button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* 🧾 Table View (Desktop) */}
            <h1 className="text-3xl text-emerald-500 my-4 text-center font-bold">
              Total Cart Price : {total}
            </h1>
            <table className="hidden md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: CartProductType) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-3">
                      <Image
                        width={300}
                        height={300}
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-16 md:w-24 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-500 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={updatedisabled}
                          onClick={() =>
                            updateProduct(
                              product.product.id,
                              String(product.count - 1),
                              "-"
                            )
                          }
                          className="inline-flex items-center justify-center p-1 h-6 w-6 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 disabled:bg-slate-200"
                          type="button"
                        >
                          −
                        </button>
                        {product.product.id === productId ? (
                          loadingupdate ? (
                            <i className="fa-solid fa-circle-notch fa-spin text-[#1ed540]"></i>
                          ) : (
                            <span>{product.count}</span>
                          )
                        ) : (
                          <span>{product.count}</span>
                        )}

                        <button
                          disabled={updatedisabled}
                          onClick={() =>
                            updateProduct(
                              product.product.id,
                              String(product.count + 1),
                              "+"
                            )
                          }
                          className="inline-flex items-center justify-center p-1 h-6 w-6 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200  disabled:bg-slate-200"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        disabled={removeDisable}
                        onClick={() => deleteProduct(product.product.id)}
                        className="font-medium text-red-600 hover:underline cursor-pointer disabled:text-slate-500"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 📱 Card View (Mobile) */}
            <div className="md:hidden flex flex-col gap-4 mt-4">
              {products.map((product: CartProductType) => (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-lg p-3 bg-white dark:bg-gray-800 shadow-sm"
                >
                  <Image
                    width={300}
                    height={300}
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-24 h-24 rounded-md object-cover"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-green-500 text-lg">
                      {product.product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {product.price * product.count} EGP
                    </p>
                    <div className="flex justify-center sm:justify-start items-center gap-3 mt-2">
                      <button
                        disabled={updatedisabled}
                        onClick={() =>
                          updateProduct(
                            product.product.id,
                            String(product.count - 1),
                            "-"
                          )
                        }
                        className="p-1 text-gray-600 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-200  disabled:bg-slate-200"
                      >
                        −
                      </button>
                      {product.product.id === productId ? (
                          loadingupdate ? (
                            <i className="fa-solid fa-circle-notch fa-spin text-[#1ed540]"></i>
                          ) : (
                            <span>{product.count}</span>
                          )
                        ) : (
                          <span>{product.count}</span>
                        )}
                      <button
                        disabled={updatedisabled}
                        onClick={() =>
                          updateProduct(
                            product.product.id,
                            String(product.count + 1),
                            "+"
                          )
                        }
                        className="p-1 text-gray-600 bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-200  disabled:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    disabled={removeDisable}
                    className="text-red-500 font-medium hover:underline text-sm cursor-pointer disabled:text-slate-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Link href = {`/checkout/${cartId}`}>
          <Button className="w-full p-4 my-4 bg-blue-500 hover:bg-blue-800 cursor-pointer">Checkout Now</Button>
          </Link>
        </div>
      ) : (
        <h1 className="my-12 font-bold text-3xl text-center text-red-500">
          No Products added yet
        </h1>
      )}
    </>
  );
}
