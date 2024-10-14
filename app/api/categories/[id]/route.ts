import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  if (!id) {
    return new NextResponse("category id is required", { status: 400 });
  }

  const category = await Category.findById(id).populate({
    path: "subcategories",
    model: "SubCategory",
    select: "label",
  });

  try {
    return NextResponse.json(category, {
      status: 200,
    });
  } catch (err) {
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
    return new NextResponse("category id is required", { status: 400 });
  }

  const body = await req.json();

  const { label, desc, subcategories } = body;

  if (!id) {
    return new NextResponse("id is required", { status: 400 });
  }

  if (!label) {
    return new NextResponse("Please enter category name", { status: 400 });
  }

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

  const updateCategory = await Category.findByIdAndUpdate(
    { _id: id },
    {
      label,
      desc,
      subcategories: createdSubcategories,
    },
    {
      new: true,
    }
  );

  try {
    return NextResponse.json(updateCategory);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
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
    return new NextResponse("category id is required", { status: 400 });
  }

  const category = await Category.findById(id);

  if (category.id === id) {
    await category.deleteOne();
    return new NextResponse("category has been deleted", { status: 200 });
  }
  try {
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
