"use client";
import React from "react";
import Header from "../components/header";
import BlogList from "../components/blogList";
import Fouter from "../components/fouter";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
 <div className="max-w-7xl mx-auto">
     <ToastContainer theme="dark" />
       <Header />
      <BlogList />
      <Fouter />
    </div>
  );
}
