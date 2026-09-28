import React from "react";
import Image from "next/image";
import { assets, blog_data } from "../Assets/assets";
import Link from "next/link";

const BlogItem = ({ title, description, category, image, id }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] mx-auto bg-white border border-black hover:shadow-[-1px_1px_3px_3px]">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image || assets.upload_area}
          alt=""
          width={400}
          height={400}
          className="border-b border-black"
        />
      </Link>
      <p className="ml-5 mt-5 inline-block bg-black text-white text-sm">{category}</p>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
        <p className="mb-3 text-sm tracking-tight text-gray-700" dangerouslySetInnerHTML={{__html:description.slice(0,120)}} ></p>
        <Link href={`/blogs/${id}`} className="flex flex-row items-center font-semibold text-center mt-auto">
          Read more <Image src={assets.arrow} alt="arrow" className="ml-2" width={25} />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;