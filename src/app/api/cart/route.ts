import { NextResponse } from "next/server";
import getLoggedUserCart from "@/CartActions/getLoggedCart";

export async function GET() {
  try {
    const data = await getLoggedUserCart();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
