import { NextResponse } from "next/server";
import clearCartUser from "@/CartActions/clearCartUser.actions";

export async function DELETE() {
  try {
    const data = await clearCartUser();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Clear cart error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
