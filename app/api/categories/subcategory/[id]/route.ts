import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

// DELETE endpoint for deleting a subcategory
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  await connect();

  // Extract subcategory ID from the request URL or body
  const { id } = params;

  console.log(id, "del");

  if (!id) {
    return new NextResponse("Subcategory ID is required", { status: 400 });
  }

  try {
    // Find the subcategory
    const subcategory = await SubCategory.findById(id);

    if (!subcategory) {
      return new NextResponse("Subcategory not found", { status: 404 });
    }

    // Remove subcategory from the parent category
    await Category.updateOne(
      { _id: subcategory.parentCategory },
      { $pull: { subcategories: id } }
    );

    // Delete the subcategory
    await SubCategory.findByIdAndDelete(id);

    return new NextResponse("Subcategory deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("[DELETE_SUBCATEGORY]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
