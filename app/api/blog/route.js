import { connectDB } from "../../../lib/config/db";
import BlogModel from "../../../lib/models/blogModel";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let dbReady = connectDB().catch((err) => {
  console.error("DB connection failed:", err);
});

// upload buffer -> Cloudinary
function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "blogs" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });
}

// https://res.cloudinary.com/.../upload/v123/blogs/abc.jpg -> blogs/abc
function getPublicId(url) {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
}

export async function GET(request) {
  await dbReady;
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  await dbReady;
  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);

  if (blog?.image?.includes("res.cloudinary.com")) {
    const publicId = getPublicId(blog.image);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
  }

  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
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
      const buffer = Buffer.from(await image.arrayBuffer());
      const result = await uploadToCloudinary(buffer);
      imgUrl = result.secure_url;
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

    return NextResponse.json({ success: true, msg: "blog added" });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || String(err) },
      { status: 500 },
    );
  }
}