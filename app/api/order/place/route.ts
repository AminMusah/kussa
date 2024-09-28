import Cart from "@/models/Cart";
import Order from "@/models/Order";
import connect from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connect();

    const orders = await Order.find({});

    return NextResponse.json(orders, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  await connect();
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  const { userOrderingInfo } = await req.json();

  console.log(userOrderingInfo);

  if (!sessionId) {
    return new NextResponse("No sessionId found", { status: 400 });
  }

  // Find the cart using sessionId
  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    return new NextResponse("Cart not found ", { status: 400 });
  }

  if (cart?.items?.length === 0) {
    return new NextResponse("Cart is empty", { status: 400 });
  }

  // Calculate the total amount
  const totalAmount = cart.items.reduce((acc: any, item: any) => {
    return acc + item.quantity * item.price;
  }, 0);

  if (!userOrderingInfo) {
    return new NextResponse("Customer details is required", {
      status: 400,
    });
  }

  // Create the order
  const order = new Order({
    sessionId,
    items: cart.items,
    userOrderingInfo,
    totalAmount,
    status: "pending",
  });

  // Save the order
  await order.save();

  //   // Clear the cart after order placement
  //   await Cart.deleteOne({ sessionId });

  try {
    return NextResponse.json("Order placed successfully!!", {
      status: 200,
    });
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Failed to place order", { status: 500 });
  }
};
