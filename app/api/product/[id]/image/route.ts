import Product from "@/models/Product";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Product ID
  try {
    await connect();

    const { imageId } = await req.json(); // Image ID to delete

    console.log(imageId, "img id");
    console.log(id, "product id");

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updatedImages = product?.images?.filter((image: any) => {
      return image?._id !== imageId;
    });

    if (updatedImages?.length === product?.images?.length) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Update the images array and save the updated product
    product.images = updatedImages;

    await product.save();

    return NextResponse.json({ message: "Image deleted" });
  } catch (error) {
    console.log("[IMAGE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
