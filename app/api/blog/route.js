import { connectDB } from "../../../lib/config/db";
import { writeFile } from "fs/promises";
import BlogModel from "../../../lib/models/blogModel";
import path from "path";
import { NextResponse } from "next/server";
import fs from "fs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";

let dbReady = connectDB().catch((err) => {
  console.error("DB connection failed:", err);
});

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id")
   if(blogId){
   const blog = await BlogModel.findById(blogId)
   return NextResponse.json(blog)
   }else{
    
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  
  }
}

export async function DELETE(request){
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  const id = await request.nextUrl.searchParams.get('id')
  const blog = await BlogModel.findById(id)
  fs.unlink(`./public${blog.image}`,()=>{})
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:'Blog Deleted'})
}


export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    await dbReady;

    const formData = await request.formData();
    const image = formData.get("image");

    let imgUrl = "";

    if (image && typeof image !== "string" && image.size > 0) {
      const timestamp = Date.now();
      const safeName = path
        .basename(image.name)
        .replace(/[^a-zA-Z0-9._-]/g, "_");
      const fileName = `${timestamp}_${safeName}`;
      const filePath = path.join(process.cwd(), "public", fileName);

      const imageByData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByData);
      await writeFile(filePath, buffer);

      imgUrl = `/${fileName}`;
    }

    const blogData = {
      title: `${formData.get("title") || ""}`,
      description: `${formData.get("description") || ""}`,
      category: `${formData.get("category") || ""}`,
      author: `${formData.get("author") || ""}`,
      authorImg: `${formData.get("authorImg") || ""}`,
      image: imgUrl,
    };

    await BlogModel.create(blogData);
    console.log("blog saved");

    return NextResponse.json({ success: true, msg: "blog added" });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong while adding the blog" },
      { status: 500 },
    );
  }
}