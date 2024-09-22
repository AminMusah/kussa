import User from "@/models/Users";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  await connect();

  const { email, password } = await req.json();

  // checking if user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return new NextResponse("Invalid Email or Password", { status: 400 });
  }

  // compare valid password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return new NextResponse("Invalid Email or Password", { status: 400 });
  }

  try {
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
