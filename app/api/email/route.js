import { connectDB } from "../../../lib/config/db";
import EmailModel from "../../../lib/models/emailModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
let dbReady = connectDB().catch((err) => {
  console.error("DB connection failed:", err);
});

export async function POST(request) {
  await dbReady;
  const formData = await request.formData();
  const emailData = {
    email: `${formData.get("email")}`,
  };
  await EmailModel.create(emailData);
  return NextResponse.json({success:true,msg:"email subscribed"});
}

export async function GET(request){
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const emails = await EmailModel.find({})
  return NextResponse.json({emails})
}

export async function DELETE(request){
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const id = await request.nextUrl.searchParams.get("id")
  await EmailModel.findByIdAndDelete(id)
  return NextResponse.json({success:true,msg:'email deleted'})
}