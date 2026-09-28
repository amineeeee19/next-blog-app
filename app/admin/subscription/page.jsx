'use client'
import React, { useEffect, useState } from "react";
import Subtableitrem from "../../../components/admincomponents/subtableitrem";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
const [emails,setemails] = useState([])
const fetchemails = async () =>{
    const response = await axios.get('/api/email')
    setemails(response.data.emails)
}
const deleteEmail = async (mongoID)=>{
   const response = await axios.delete('/api/email',{params:{
    id:mongoID
   }}) 
   if(response.data.success){
    toast.success(response.data.msg)
    fetchemails()
   }else{
    toast.error("error")
   }

}

useEffect(()=>{
    fetchemails()
},[])


  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-15">
        <h1>All subscription</h1>
        <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
            <thead className="text-sm text-left text-gray-700 uppercase bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3">
                    Email subscription
                    </th>
                <th scope="col" className="px-6 py-3">
                Date
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                    </th>

                </tr>

            </thead>
            <tbody>
                {emails.map((item,index)=>{
                    return <Subtableitrem key={index} mongoID={item._id} email={item.email} date={item.date} deleteEmail={deleteEmail}/>

                })}
            </tbody>

        </table>
        </div>
        

       
     </div>
  );
};

export default page;