import { connectDB } from "../../../lib/config/db";
import AdminModel from "../../../lib/models/adminModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const adminCount = await AdminModel.countDocuments();
    const adminExists = !!(await AdminModel.findOne({ email: "admin@blog.com" }));
    return NextResponse.json({
      db: mongoose.connection.name,
      adminCount,
      adminExists,
      hasSecret: !!process.env.NEXTAUTH_SECRET,
      nextauthUrl: process.env.NEXTAUTH_URL,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}