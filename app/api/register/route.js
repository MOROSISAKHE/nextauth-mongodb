import mongodbAuth from "@/_lib/mongodbAuth";
import User from "@/_models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await mongodbAuth();
    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.findOne({ email });
    if (!user) {
      await User.create({ name, email, password: hashedPassword });
      return NextResponse.json(
        { message: "You succesfully created an Account" },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: "User with this email already exists" },
      { status: 409 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error Occured while creating the user" },
      { status: 500 }
    );
  }
}
