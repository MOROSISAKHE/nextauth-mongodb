import mongodbConnection from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await mongodbConnection();
    const hashedPassword= await bcrypt.hash(password, 5)
    await User.create({ name, email, password:hashedPassword});
    console.log("User Created");

    // console.log(name);
    // console.log(email);
    // console.log(password);
    return NextResponse.json(
      { message: "User Created!"},
      { status: 200 }
    );
  } catch (error) {
    console.log("Error Occure while creating the user");
    return NextResponse.json(
      { message: "Error Occure while creating the user" },
      { status: 500 }
    );
  }
}
