import Cart from "@/models/Cart";
import connect from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return new NextResponse("No sessionId found", { status: 400 });
  }

  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    return new NextResponse("cart not found", { status: 400 });
  }

  // Clear the cart
  await Cart.deleteOne({ sessionId });

  try {
    return NextResponse.json({ message: "Cart cleared!!" });
  } catch (error) {
    console.log("[CART_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
