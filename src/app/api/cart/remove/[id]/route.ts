import { NextResponse } from "next/server";
import removeItemFromCart from "@/CartActions/removeCartItem.action";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await removeItemFromCart(params.id);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Remove cart item error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to remove item" },
      { status: 500 }
    );
  }
}
