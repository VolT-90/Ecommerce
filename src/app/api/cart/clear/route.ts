import clearCartUser from "@/CartActions/clearCartUser.actions";
import { NextResponse, NextRequest } from "next/server";


export async function DELETE(request: NextRequest) {
  try {
    const result = await clearCartUser();

    return NextResponse.json({
      status: "success",
      message: "Cart cleared successfully",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
