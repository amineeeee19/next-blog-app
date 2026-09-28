import react, { useState } from "react";
import Image from "next/image";
import { assets } from "../Assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const Header = () => {
    const [email,setemail] = useState("")
    const OnSubmitHandler = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("email",email)
    const response = await axios.post('/api/email',formData)
    if(response.data.success){
        toast.success(response.data.msg)
        setemail("")
    }else{
        toast.error("error")
    }

    }
  return (
    <div className="py-5 px-5 md:px-12 lg:px-25">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          className="w-[130px] sm:w-auto"
          alt=""
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid  shadow-[-5px_7px_0px_#000000]">get started</button>
      </div>
      <div className="text-center my-4"> 
        <h1 className="text-4xl font-semibold ">Latest Blogs</h1>
        <p className="mt-5 max-w-[740px] m-auto text-xs sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quaerat amet ab corrupti animi! Aut ipsa perferendis ea ipsum ratione provident consequatur sit id ad! Ex, in perferendis. Debitis, rem!</p>
      </div>
      <form onSubmit={OnSubmitHandler} className="flex items-center justify-between  max-w-[500px] mx-auto  scale-70 sm:scale-90 mt-5 border border-black  shadow-[-7px_7px_0px_#000000] " action="" >
        <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" placeholder="Enter your email" className="pl-4 outline-none  " />
        <button  className="border-l  bg-gray-50 py-4 px-4 sm:py-4 sm:px-8 active:bg-gray-600 active:text-white  ">Subscribe</button>
      </form>
    </div>
  );
};
export default Header;
