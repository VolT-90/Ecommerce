import { NextResponse } from "next/server";
import removeItemFromCart from "@/CartActions/removeCartItem.action";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { status: "error", message: "Missing product id" },
        { status: 400 }
      );
    }

    const data = await removeItemFromCart(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Remove item error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to remove item" },
      { status: 500 }
    );
  }
}
