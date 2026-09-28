'use client'
import React, { useEffect, useState } from "react"
import axios from "axios"
import Blogtableitem from "../../../components/admincomponents/blogitemtable"
import { toast } from "react-toastify"

const page = () => {
    const [blogs, setBlogs] = useState([])

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog')
        setBlogs(response.data.blogs )
    }

    const deleteBlog = async (mongoId) => {
  try {
    const response = await axios.delete("/api/blog", { params: { id: mongoId } });
    await fetchBlogs(); 
    toast.success(response.data.msg)
  } catch (err) {
    console.error(err);
    toast.error("Delete failed")
  }
};

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className="flex-1 pt-5 sm:pt-12 sm:pl-16">
            <h1>All blogs</h1>
            <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="hidden sm:table-cell px-6 py-3">
                                author name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                blog title
                            </th>
                            <th scope="col" className="hidden sm:table-cell px-6 py-3">
                                date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item, index) => (
                            <Blogtableitem
                                key={index}
                                mongoId={item._id}
                                title={item.title}
                                authorImg={item.authorImg}
                                author={item.author}
                                date={item.date}
                                deleteBlog={deleteBlog}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default page