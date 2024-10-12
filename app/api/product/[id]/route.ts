import Category from "@/models/Category";
import Product from "@/models/Product";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("product id is required", { status: 400 });
  }

  const product = await Product.findById(id);

  try {
    return NextResponse.json(product, {
      status: 200,
    });
  } catch (err) {
    console.log("[PRODUCT_GET]", err);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("product id is required", { status: 400 });
  }

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

  const updateProduct = await Product.findByIdAndUpdate(
    { _id: id },
    {
      name,
      description,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      images,
      category,
    },
    {
      new: true,
    }
  )
    .populate("category")
    .populate("categories");

  if (category) {
    await Category.findByIdAndUpdate(category, {
      $addToSet: { products: updateProduct._id }, // Use $addToSet to prevent duplicates
    });
  }

  try {
    return NextResponse.json(updateProduct);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("product id is required", { status: 400 });
  }

  const product = await Product.findById(id);

  if (product.id === id) {
    await product.deleteOne();
    return new NextResponse("product has been deleted", { status: 200 });
  }
  try {
    return NextResponse.json({ message: "product deleted" });
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
