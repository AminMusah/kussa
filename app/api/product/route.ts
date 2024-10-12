import Category from "@/models/Category";
import Product from "@/models/Product";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connect();

    const url = new URL(req.url); // Create a URL object from req.url
    const searchParams = url.searchParams; // Use the URL object to get searchParams
    const name = searchParams.get("name");
    const category = searchParams.get("category");
    // console.log(query);

    // const { name, category } = await req.json(); // Change to await req.json() to access body
    const filters: {
      name?: { $regex: string; $options: string };
      category?: string;
    } = {}; // Define the type for filters

    // // Add filtering by name (case insensitive)
    if (name) {
      filters.name = { $regex: name, $options: "i" }; // "i" makes it case-insensitive
    }

    if (category) {
      filters.category = category; // Directly assign the category string
    }

    const products = await Product.find(filters).populate({
      path: "category",
      model: Category,
    });

    console.log(products);

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

  // Add category in the product
  await newProduct.categories.push(category);

  // Add the category ID to the products array
  await Category.findByIdAndUpdate(category, {
    $push: { products: newProduct._id },
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
