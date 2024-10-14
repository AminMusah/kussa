import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    await connect();

    const categories = await Category.find({}).populate({
      path: "subcategories", // Populates the subcategories field
      model: "SubCategory", // Refers to the SubCategory model
      select: "label", // Only return the 'label' field from subcategories
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

  const { label, desc, subcategories } = await req.json();

  if (!label) {
    return new NextResponse("Please enter label text", { status: 400 });
  }

  // Step 1: Create subcategories if provided
  // Create and store subcategories with label and _id
  let createdSubcategories = [];
  if (subcategories && subcategories.length > 0) {
    createdSubcategories = await Promise.all(
      subcategories.map(async (subLabel: string) => {
        const subcategory = new SubCategory({ label: subLabel });
        await subcategory.save();
        return { _id: subcategory._id, label: subcategory.label }; // Return the subcategory's _id and label
      })
    );
  }

  const category = new Category({
    label,
    desc,
    subcategories: createdSubcategories, // Save subcategories to the category
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
