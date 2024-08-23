import mongodbAuth from '@/lib/mongodbAuth';
import Tickets from '@/models/tickets';
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, location, description,category} = await req.json();
        console.log(category);
        await mongodbAuth();
        await Tickets.create({ title, location, description, category});
          console.log("Ticket Created");
        return NextResponse.json({message:"User Succesfully created!"}, {status:200});
      } catch (error) {
        console.log("Error Occure while creating the user");
        return NextResponse.json(
          { message: "Error Occure while creating the user" },
          { status: 500 }
        );
      }
}

export async function GET() {
  await mongodbAuth();
  const ticket = await Tickets.find();
  return NextResponse.json(ticket);
}
export async function DELETE(req){
  const ticketID= req.nextUrl.searchParams.get("id");
  await mongodbAuth();
   await Tickets.findByIdAndDelete(ticketID)
   return NextResponse.json({message:"Ticket deleted"}, {status: 201})
}