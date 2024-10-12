import Order from "@/models/Order";
import Product from "@/models/Product";
import connect from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  await connect();

  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  const { products, userOrderingInfo } = await req.json();

  if (!products || products.length === 0) {
    return new NextResponse("Please add products", { status: 400 });
  }

  if (!userOrderingInfo) {
    return new NextResponse("Customer info is required!", { status: 400 });
  }

  if (!sessionId) {
    return new NextResponse("No sessionId found", { status: 400 });
  }

  // Deduct stock for each item
  for (const productOrder of products) {
    const { productId, quantity } = productOrder;

    const product = await Product.findById(productId);

    if (!product) {
      return new NextResponse(`Product not found: ${productId}`, {
        status: 400,
      });
    }

    if (product.stockQuantity < quantity) {
      return new NextResponse(`Not enough stock for product: ${product.name}`, {
        status: 400,
      });
    }

    // Deduct the quantity from stock
    product.stockQuantity -= quantity;

    // Save the updated product
    await product.save();
  }

  // Calculate the total amount
  const totalAmount = products.reduce((acc: any, item: any) => {
    return acc + item.quantity * item.price;
  }, 0);

  const generateOrderNumber = () => {
    const timestamp = Date.now(); // Get current timestamp
    const randomNum = Math.floor(Math.random() * 10000); // Generate a random number
    return `ORD-${timestamp}-${randomNum}`; // Format the order number
  };

  // Create the order
  const order = new Order({
    sessionId,
    items: products,
    userOrderingInfo,
    totalAmount,
    orderNumber: generateOrderNumber(),
    status: "pending",
  });

  // Save the order
  await order.save();

  try {
    return NextResponse.json("Order placed successfully!", {
      status: 200,
    });
  } catch (error) {
    console.log("[ADMIN_ORDER_POST]", error);
    return new NextResponse("Failed to place order", { status: 500 });
  }
};
