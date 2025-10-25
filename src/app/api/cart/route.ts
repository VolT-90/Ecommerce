import { NextResponse } from "next/server";
import getMyToken from "@/utilities/getMyToken";

export async function GET() {
  try {
    const token = await getMyToken();
    if (!token) {
      return NextResponse.json(
        { status: "error", message: "No token found. Please login." },
        { status: 401 }
      );
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "GET",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Cart fetch error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
