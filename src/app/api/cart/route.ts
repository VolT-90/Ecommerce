import getLoggedUserCart from "@/CartActions/getLoggedCart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await getLoggedUserCart();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Get cart error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
