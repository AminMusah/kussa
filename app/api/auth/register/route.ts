import User from "@/models/Users";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  await connect();
  try {
    const { user } = await req.json();

    // checking if user already exists in the database
    const emailExist = await User.findOne({ email: user.email });
    if (emailExist) {
      return new NextResponse("User Already exist!!", { status: 400 });
    }

    const newUser = new User({
      user,
    });

    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
