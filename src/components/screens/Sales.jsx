import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { FaSearch } from "react-icons/fa";
import { api } from "../../variable";
import { useNavigate } from "react-router-dom";

export function Sales() {
    console.log("hello this is sales")
    const [projects, setProjects] = useState([]);
    const nav=useNavigate()
  useEffect(() => {
    if(sessionStorage.getItem("access")&& (sessionStorage.getItem("role")=="sales" ||sessionStorage.getItem("role")=="admin")){
        fetch(`${api}get/taskcompleted`)
        .then((res) => res.json())
        .then((data) => setProjects(data));
    }
    else{
        nav("/login")
    }

   
  }, []);
  console.log(projects)
    return (
        <>
            <Sidebar></Sidebar>

            <div className="p-2 sm:ml-64 ">

                {/* <div class="  w-full inline-flex  text-center items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-2xl font-medium text-[#401F71]  group bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] focus:ring-4 focus:outline-none font-bold">
                    <span class="relative px-5 py-2.5 w-full bg-white ">
                        SALES
                    </span>
                </div> */}
                 <div class="  w-full inline-flex  text-center items-center justify-center p-2 mb-4 me-2 overflow-hidden text-2xl font-medium text-white group bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] ">
                    {/* <span class="relative px-5 py-2.5 w-full bg-white ">  */}
                        SALES
                    {/* </span>  */}
                </div>
                



                <div className="flex flex-row justify-between items-center p-2 mx-[40px] mb-4">
                    <div className="flex gap-x-2">
                        <input type="text" className="border border-black rounded-md p-2" placeholder="Search"/>
                        <button type="button" className="text-white bg-[#824D74]  font-medium rounded-lg text-sm   px-6 flex flex-row items-center gap-x-2 ">
                            
                            <FaSearch></FaSearch>
                            </button>

                    </div>

                    
                    
                </div>

                <div className="  relative overflow-x-auto rounded-lg shadow mx-5   ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 pd">
                        <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74]">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Date
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Project name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Delivered By
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Developer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center">
                                        Price
                                        <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                        </svg></a>
                                    </div>
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    {/* Edit */}
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                projects.map((project)=>(
                                    <tr className="bg-white border-b  dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
                                        {project.pid.deadline}
                                    </th>
                                    <td className="px-6 py-4 text-black">
                                   {project.pid.title}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                        {project.pid.bid_by.username}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                        {project.status}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                        {project.assigned_to.username}
                                    </td>
                                    <td className="px-6 py-4 text-black">
                                        ${project.pid.price}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a href="#" className="font-medium text-purple-800 hover:underline">Edit</a>
                                    </td>
                                </tr>
                                ))
                            }
                           

                           
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}
export default Sales