'use client'
import React, { useState } from "react"
import Image from "next/image"
import {assets} from "@/Assets/assets"
import { title } from "process"
import axios from "axios"
import { toast } from "react-toastify"

const page = () => {
    const [image,setimage] = useState(false)
    const [data,setdata] = useState({
        title : "",
        description : "",
        category : "startup",
        author : "alex bannett",
        authorImg : "/author_img.png"
    })
    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setdata(data=>({...data,[name]:value}))
        console.log(data)
    }
    const onSubmitHandler = async (e) =>{
    e.preventDefault();
    const formdata = new FormData()
    formdata.append('title',data.title)
    formdata.append('description',data.description)
    formdata.append('category',data.category)
    formdata.append('author',data.author)
    formdata.append('authorImg',data.authorImg)
    formdata.append('image',image)
    const response = await axios.post('/api/blog',formdata)
    if(response.data.success){
        toast.success(response.data.msg)
    }else{
        toast.error("error")
    }

    }
    return (
        <>
        <form onSubmit={onSubmitHandler}  className="pt-4 px-5 sm:pt-8 sm:pl-12">
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
        <Image className="mt-3" src={!image?assets.upload_area:URL.createObjectURL(image)} width={140} height={70} style={{ width: "140px", height: "70px", objectFit: "cover" }} alt="" />
        </label>
        <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="image" hidden required />
        <p className="text-xl mt-3">Blog title</p>
        <input name='title' onChange={onChangeHandler} value={data.title}  className="w-full sm:w-[500px] mt-4 px-5 py-2 border border-gray-500 rounded  " placeholder="type here" type="text" required />
         <p className="text-xl mt-3">Blog description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} className="w-full sm:w-[500px] mt-4 px-5 py-2 border border-gray-500 rounded  " placeholder="write content here" rows={6} type="text" required />
         <p className="text-xl mt-3">Blog category</p>
         <select name='category' onChange={onChangeHandler} value={data.category} className="w-40 mt-4 px-4 py-2 border text-gray-500 rounded"> 
            <option value="statup">statup</option>
            <option value="technology">technology</option>
            <option value="lifestyle">lifestyle</option> 
         </select>
         <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white rounded">ADD</button>
        </form>
        </>
    )
}
export default page