"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { blog_data } from "@/Assets/assets";
import { assets } from "@/Assets/assets";
import Fouter from "@/components/fouter";
const page = ({ params }) => {
  const resolvedparams = use(params);
  const [data, setdata] = useState(null);
  const fetchblogdata = async() => {
  const response = await axios.get('/api/blog',{params:{id:resolvedparams.id}})
    setdata(response.data)
  };
  useEffect(() => {
  if (resolvedparams?.id) {
    fetchblogdata();
  }
}, [resolvedparams]);

  if (!data) {
    return <div className="p-4 text-center">Loading or blog not found...</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="py-5 px-5 md:px-12 lg:px-25 bg-gray-100 pb-28 ">
        <div className="flex justify-between items-center ">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              className="w-[130px] sm:w-auto"
              alt=""
            />
          </Link>
          <button className="flex items-center  bg-black text-white py-2 px-4 rounded">
            Get started
          </button>
        </div>
        <br /><br /><br />
         <div className="flex flex-col  items-center ">
            <h1 className=" text-2xl sm:text-4xl font-semibold max-w-[700px]">{data.title}</h1>
        <Image className="mx-auto mt-6 border border-white rounded-full"
          src={data.authorImg || assets.logo_light}
          width={80}
          height={80}
          alt=""
        />
        <h1 className=" text-2xl sm:text-4xl font-semiblod mx-auto ">{data.author}</h1>
      </div>
      </div>

      <div className=" flex flex-col fustify-center mx-5 max-w-[800px] md:mx-auto mt-[-80px] mb-10   ">
        <Image
        className="mx-auto block"
          src={data.image}
          height={720}
          width={1280}
          alt={data.title || "Blog image"}
        />
        <h1 className="my-5 text-[26px] font-semiblod">Content</h1>
  <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}>

  </div>
   <div className="my-24">
    <p className="tetx-black font-semibold my-4">share thisnarticle on social media</p>
    <div className="flex">
        <Image src={assets.facebook_icon} width={50} alt="" ></Image>
        <Image src={assets.twitter_icon} width={50} alt="" ></Image>
        <Image src={assets.googleplus_icon} width={50} alt="" ></Image>


    </div>
   </div>
      </div>
      <Fouter/>
    </div>
  );
};
export default page;
