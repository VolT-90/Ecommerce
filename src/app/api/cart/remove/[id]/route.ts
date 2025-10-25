import { NextRequest, NextResponse } from "next/server";
import removeItemFromCart from "@/CartActions/removeCartItem.action";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params (Next.js 15)
    const data = await removeItemFromCart(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Remove cart item error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to remove item" },
      { status: 500 }
    );
  }
}
