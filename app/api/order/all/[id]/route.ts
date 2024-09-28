import Order from "@/models/Order";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("order id is required", { status: 400 });
  }

  const order = await Order.findById(id).populate("items.productId");

  try {
    return NextResponse.json(order, {
      status: 200,
    });
  } catch (err) {
    console.log("[PRODUCT_GET]", err);
    return new NextResponse("Server Error", { status: 500 });
  }
}
