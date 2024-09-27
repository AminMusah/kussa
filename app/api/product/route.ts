import Product from "@/models/Product";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connect();

    const products = await Product.find({});

    return NextResponse.json(products, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  await connect();

  const { name, description, price, stockQuantity, images, category } =
    await req.json();

  if (!name) {
    return new NextResponse("Please name is required", { status: 400 });
  }

  if (!description) {
    return new NextResponse("Please description is required", { status: 400 });
  }

  if (!price) {
    return new NextResponse("Please price is required", { status: 400 });
  }

  if (!stockQuantity) {
    return new NextResponse("Please stock quantity is required", {
      status: 400,
    });
  }

  if (images.length <= 0) {
    return new NextResponse("Please at least one image is required", {
      status: 400,
    });
  }

  const newProduct = new Product({
    name,
    description,
    price: parseFloat(price),
    stockQuantity: parseInt(stockQuantity),
    images,
    category,
  });

  await newProduct.save();

  try {
    return NextResponse.json(newProduct, {
      status: 200,
    });
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
