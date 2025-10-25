import { NextResponse } from "next/server";
import updateCartQuantity from "@/CartActions/updateCartQuantity.actions";

export async function POST(request: Request) {
  try {
    const { id, count } = await request.json();

    if (!id || count == null) {
      return NextResponse.json(
        { status: "error", message: "Missing id or count" },
        { status: 400 }
      );
    }

    const data = await updateCartQuantity(id, count);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Update quantity error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to update quantity" },
      { status: 500 }
    );
  }
}
