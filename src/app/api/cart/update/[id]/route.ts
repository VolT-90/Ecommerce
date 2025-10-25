import { NextRequest, NextResponse } from "next/server";
import updateCartQuantity from "@/CartActions/updateCartQuantity.actions";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    const body = await request.json();

    const data = await updateCartQuantity(id, body.quantity);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Update cart item error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to update item" },
      { status: 500 }
    );
  }
}
