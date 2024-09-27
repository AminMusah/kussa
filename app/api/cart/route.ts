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
    const hasCookie = cookieStore.has("sessionId");

    console.log(hasCookie);

    const cookie = cookieStore.get("sessionId");

    console.log(cookie);

    return NextResponse.json(hasCookie, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  // Change Request to NextApiRequest
  await connect();

  let randomid = uuidv4();
  create(randomid);
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("sessionId");
  let sessionId;
  let user;
  if (!hasCookie) {
    const cookie = cookieStore.get("sessionId");
    sessionId = cookie;
  } else {
    sessionId = cookieStore.get("sessionId")?.value;
  }

  const { userId } = auth();

  if (userId) {
    const response = await clerkClient.users.getUser(userId);
    user = response.publicMetadata.userId;
  }

  console.log(typeof randomid, "id");

  const { items } = await req.json();

  //   for (const item of items) {
  //     if (!item.productId) {
  //       return new NextResponse("Please product id is required", { status: 400 });
  //     }

  //     if (!item.quantity) {
  //       return new NextResponse("Please quantity is required", {
  //         status: 400,
  //       });
  //     }

  //     if (!item.price) {
  //       return new NextResponse("Please price is required", { status: 400 });
  //     }
  //   }

  const cart = new Cart({
    userId: user,
    sessionId: sessionId,
    items,
  });

  try {
    return NextResponse.json(cart, {
      status: 200,
    });
  } catch (error) {
    console.log("[CART_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
