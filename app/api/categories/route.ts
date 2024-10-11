import Category from "@/models/Category";
import Product from "@/models/Product";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connect();

    const categories = await Category.find({}).populate({
      path: "products",
      model: Product,
    });

    return NextResponse.json(categories, {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  await connect();

  const { label, desc } = await req.json();

  if (!label) {
    return new NextResponse("Please enter label text", { status: 400 });
  }

  const category = new Category({
    label,
    desc,
  });

  await category.save();

  try {
    return NextResponse.json(category, {
      status: 200,
    });
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
