"use client";

import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/cartContext";
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const context = useContext(CartContext);
  if (!context) throw new Error("CartContext not found");

  const { setnumberOfCartItems } = context;

  // 🔁 Fetch cart data
  async function getCart() {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await res.json();
      if (data.status === "success") {
        setCart(data.data);
        // ✅ update navbar count immediately
        const totalCount = data.data.products.reduce(
          (acc: number, item: any) => acc + item.count,
          0
        );
        setnumberOfCartItems(totalCount);
      } else {
        setCart(null);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
      toast.error("Failed to fetch your cart ❌");
    } finally {
      setLoading(false);
    }
  }

  // 🧹 Clear entire cart
  async function clearCart() {
    setClearing(true);
    try {
      const res = await fetch("/api/cart/clear", { method: "DELETE" });

      // Some deployments return no body, so we safely parse
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = { status: res.ok ? "success" : "error" };
      }

      if (data.status === "success") {
        toast.success("Cart cleared successfully 🧹");
        setCart({ products: [], totalCartPrice: 0 });
        setnumberOfCartItems(0); // ✅ instantly update navbar
      } else {
        toast.error("Failed to clear cart ❌");
      }
    } catch (err) {
      console.error("Clear cart error:", err);
      toast.error("Server error while clearing ❌");
    } finally {
      setClearing(false);
    }
  }

  // 🗑 Remove product
  async function removeItem(id: string) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/cart/remove/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Item removed 🗑️");
        await getCart();
      } else toast.error("Error removing item ❌");
    } catch {
      toast.error("Server error while deleting ❌");
    } finally {
      setUpdatingId(null);
    }
  }

  // 🔄 Update quantity
  async function updateQuantity(id: string, count: number) {
    if (count < 1) return toast.error("Quantity must be at least 1");
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/cart/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count }),
      });
      const data = await res.json();
      if (data.status === "success") {
        toast.success("Quantity updated ✅");
        await getCart();
      } else toast.error("Failed to update quantity ❌");
    } catch {
      toast.error("Server error while updating ❌");
    } finally {
      setUpdatingId(null);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader color="#16a34a" size={80} />
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return (
      <h1 className="my-12 font-bold text-3xl text-center text-red-500">
        No Products added yet
      </h1>
    );
  }

  return (
    <div className="w-full md:w-5/6 lg:w-2/3 mx-auto my-12 px-3">
      <div className="flex justify-end py-4">
        <Button
          onClick={clearCart}
          disabled={clearing}
          className="cursor-pointer bg-red-700 hover:bg-red-500"
        >
          {clearing ? "Clearing..." : "Clear Cart Items"}
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-3xl text-emerald-500 my-4 text-center font-bold">
          Total Cart Price: {cart.totalCartPrice} EGP
        </h1>

        {/* 🧾 Desktop Table */}
        <table className="hidden md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product: any) => (
              <tr key={product._id} className="bg-white border-b hover:bg-gray-50">
                <td className="p-3">
                  <Image
                    width={300}
                    height={300}
                    src={product.product.imageCover}
                    alt={product.product.title}
                    className="w-16 md:w-24 rounded-md object-cover"
                  />
                </td>
                <td className="px-4 py-3 font-semibold text-green-500">
                  {product.product.title}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={updatingId === product.product.id}
                      onClick={() =>
                        updateQuantity(product.product.id, product.count - 1)
                      }
                      className="inline-flex items-center justify-center p-1 h-6 w-6 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 disabled:bg-slate-200"
                    >
                      −
                    </button>
                    {updatingId === product.product.id ? (
                      <i className="fa-solid fa-circle-notch fa-spin text-[#1ed540]"></i>
                    ) : (
                      <span>{product.count}</span>
                    )}
                    <button
                      disabled={updatingId === product.product.id}
                      onClick={() =>
                        updateQuantity(product.product.id, product.count + 1)
                      }
                      className="inline-flex items-center justify-center p-1 h-6 w-6 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 disabled:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">
                  {product.price * product.count} EGP
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    disabled={updatingId === product.product.id}
                    onClick={() => removeItem(product.product.id)}
                    className="font-medium text-red-600 hover:underline cursor-pointer disabled:text-slate-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link href={`/checkout/${cart._id}`}>
        <Button className="w-full p-4 my-4 bg-blue-500 hover:bg-blue-800 cursor-pointer">
          Checkout Now
        </Button>
      </Link>
    </div>
  );
}
