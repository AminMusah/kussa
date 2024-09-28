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

  // Get productId from the request body
  const { productId } = await req.json(); // Added await

  if (!sessionId) {
    return new NextResponse("item not found", { status: 400 });
  }

  if (!productId) {
    return new NextResponse("product id is required", { status: 400 });
  }

  // Find the cart associated with the sessionId
  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    return new NextResponse("cart not found", { status: 400 });
  }

  // Find the index of the item to remove
  const itemIndex = cart.items.findIndex(
    (item: any) => item.productId.toString() === productId
  );

  if (itemIndex === -1) {
    return new NextResponse("Item not found in cart", { status: 400 });
  }

  // Remove the item from the cart
  cart.items.splice(itemIndex, 1);

  await cart.save();
  try {
    return NextResponse.json({ message: "item deleted" });
  } catch (error) {
    console.log("[ITEM_IN_CART_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
