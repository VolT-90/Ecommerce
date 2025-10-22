'use client'

import React, { createContext, useEffect, useState, ReactNode } from 'react'
import getLoggedUserCart from '@/CartActions/getLoggedCart'
import { ProductType } from '@/types/Product.type'
import { CartProductType } from '@/types/Cart.type'

// 1️⃣ Define the context type
export interface CartContextType {
  numberOfCartItems: number
  setnumberOfCartItems: React.Dispatch<React.SetStateAction<number>>
}

// 2️⃣ Create the context with an initial undefined type (so we can check for provider existence)
export const CartContext = createContext<CartContextType | undefined>(undefined)

// 3️⃣ Define the props for the provider
interface CartContextProviderProps {
  children: ReactNode
}

// 4️⃣ Create the provider component
export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartItems, setnumberOfCartItems] = useState<number>(0)

  async function getUserCart() {
    try {
      const response = await getLoggedUserCart()
      if (response.status === 'success') {
        let sum = 0
        response.data.products.forEach((product : CartProductType) => {
          sum += product.count
        })
        setnumberOfCartItems(sum)
      }
    } catch (err : unknown) {
      console.log('Must Login')
    }
  }

  useEffect(() => {
    getUserCart()
  }, [])

  return (
    <CartContext.Provider value={{ numberOfCartItems, setnumberOfCartItems }}>
      {children}
    </CartContext.Provider>
  )
}
