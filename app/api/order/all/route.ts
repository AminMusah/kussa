import Order from "@/models/Order";
import connect from "@/utils/db";
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
