import Product from "@/models/Product";
import connect from "@/utils/db";
import create from "@/utils/cookie";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next"; // Import NextApiRequest
import Cart from "@/models/Cart";
const { v4: uuidv4 } = require("uuid");
import { cookies } from "next/headers";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connect();

    const cookieStore = cookies();
    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      return NextResponse.json("Cart not found", {
        status: 400,
      });
    }

    // Find the cart associated with the sessionId
    const cart = await Cart.findOne({ sessionId }).populate("items.productId");

    if (!cart) {
      return NextResponse.json("Cart not found", {
        status: 400,
      });
    }

    return NextResponse.json(cart, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  await connect();
  let sessionId;
  let user;
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("sessionId");

  // Generate a new session ID only if it doesn't exist
  if (hasCookie) {
    sessionId = cookieStore.get("sessionId")?.value;
  } else {
    sessionId = uuidv4(); // Generate new session ID
    const cookie = create(sessionId); // Create cookie with new session ID
  }

  const { userId } = auth();

  if (userId) {
    const response = await clerkClient.users.getUser(userId);
    user = response.publicMetadata.userId;
  }

  const { productId, quantity } = await req.json();

  const product = await Product.findById(productId);
  if (!product) {
    return new NextResponse("Product not found!!", { status: 400 });
  }

  let cart = await Cart.findOne({ sessionId });

  if (!cart) {
    cart = new Cart({
      sessionId,
      items: [],
    });
  }

  const existingItemIndex = cart.items.findIndex(
    (item: any) => item.productId.toString() === productId
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    cart.items.push({
      productId: product._id,
      name: product.name,
      quantity,
      price: product.price,
    });
  }

  await cart.save();

  try {
    return NextResponse.json(cart, {
      status: 200,
    });
  } catch (error) {
    console.log("[CART_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
