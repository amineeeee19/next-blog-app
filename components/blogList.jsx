"use client";

import React, { useEffect, useState } from "react";
import { blog_data } from "../Assets/assets";
import BlogItem from "./blogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      console.log("API response:", response.data);

      setBlogs(response.data.blogs || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des blogs :", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs =
    menu === "All" ? blogs : blogs.filter((item) => item.category === menu);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          All
        </button>

        <button
          onClick={() => setMenu("technology")}
          className={
            menu === "technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Technology
        </button>

        <button
          onClick={() => setMenu("startup")}
          className={
            menu === "startup" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Startup
        </button>

        <button
          onClick={() => setMenu("lifestyle")}
          className={
            menu === "lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Lifestyle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10 xl:mx-24">
        {filteredBlogs.map((item) => (
          <BlogItem
            key={item._id}
            image={item.image}
            title={item.title}
            description={item.description}
            category={item.category}
            id={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
