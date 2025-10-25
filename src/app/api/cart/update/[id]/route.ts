import { NextResponse, NextRequest } from "next/server";
import updateCartQuantity from "@/CartActions/updateCartQuantity.actions";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // params is a Promise
) {
  try {
    const resolvedParams = await params; // unwrap the Promise
    const body = await request.json();
    const count = body.count;

    if (typeof count !== "number" || count < 1) {
      return NextResponse.json(
        { status: "error", message: "Invalid quantity" },
        { status: 400 }
      );
    }

    // ✅ convert count to string if needed
    const data = await updateCartQuantity(resolvedParams.id, String(count));

    return NextResponse.json({
      status: "success",
      message: "Quantity updated successfully",
      data,
    });
  } catch (error) {
    console.error("Update cart quantity error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to update quantity" },
      { status: 500 }
    );
  }
}
