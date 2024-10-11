import Category from "@/models/Category";
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

  const category = await Category.findById(id);

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

  const { label, desc } = body;

  if (!id) {
    return new NextResponse("id is required", { status: 400 });
  }

  if (!label) {
    return new NextResponse("Please enter category name", { status: 400 });
  }

  const updateCategory = await Category.findByIdAndUpdate(
    { _id: id },
    {
      label,
      desc,
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
