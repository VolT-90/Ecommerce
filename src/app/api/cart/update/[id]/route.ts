import { NextResponse } from "next/server";
import updateCartQuantity from "@/CartActions/updateCartQuantity.actions";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { count } = body;
    const data = await updateCartQuantity(params.id, count);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Update quantity error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to update quantity" },
      { status: 500 }
    );
  }
}
