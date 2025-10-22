"use client";

import { CartContext } from "@/context/cartContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

export default function Navbar() {
  const { data: session} = useSession();

  const context = useContext(CartContext);
  if (!context) throw new Error("Not Exist");

  const { numberOfCartItems } = context;
  // console.log(session);
  // console.log(status);

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-emerald-600 p-4 ">
      <div className="container mx-auto lg:w-[80%] flex flex-col lg:flex-row gap-3 justify-between items-center">
        <div className="left">
          <ul className="flex gap-5 text-white items-center">
            <Link href="/" className="text-xl flex items-center">
              <i className="fa-solid fa-cart-shopping"></i>Freshcart
            </Link>
            <Link href="/">Home</Link>
            {session && (
              <Link className="relative" href="/cart">
                Cart{" "}
                {numberOfCartItems > 0 && (
                  <span className="absolute top-[-15px] end-[-10px] bg-amber-50 text-emerald-500 rounded-4xl size-5 flex justify-center text-sm">
                    {numberOfCartItems}
                  </span>
                )}{" "}
              </Link>
            )}
            <Link href="/products">Products</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/brands">Brands</Link>
          </ul>
        </div>
        <div className="right">
          <ul className="text-white flex gap-3 items-center">
            {!session ? (
              <>
                <li className="fab fa-facebook"></li>
                <li className="fab fa-twitter"></li>
                <li className="fab fa-tiktok"></li>
                <li className="fab fa-instagram"></li>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            ) : (
              <>
                <li> Hi ,{session?.user.name}</li>
                <span onClick={logout} className="cursor-pointer">
                  Signout
                </span>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
