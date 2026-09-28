"use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col bg-slate-100 min-h-screen ">
      <div className="px-2 sm:pl-14 py-3 border w-auto h-auto border-black">
        <Image src={assets.logo} alt="" width={120} height={40} className="w-[120px] h-[40px]" />
      </div>

      <div
        className={`w-36 sm:w-80 flex-1 relative py-14 border border-black transition ${
          !session ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <Link href='/admin/addproduct' className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white cursor-pointer">
          <Image src={assets.add_icon} alt="" /><p>Add blogs</p>
        </Link>
        <Link href='/admin/bloglist' className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white cursor-pointer">
          <Image src={assets.blog_icon} alt="" /><p>Blogs lists</p>
        </Link>
        <Link href='/admin/subscription' className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white cursor-pointer">
          <Image src={assets.email_icon} alt="" /><p>Subscriptions</p>
        </Link>

        {session && (
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white cursor-pointer w-full text-left text-red-600"
          >
            <p>Logout</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;