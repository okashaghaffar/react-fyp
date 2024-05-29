
import React, { useState } from "react";
import {FaClock, FaFire} from "react-icons/fa";
import {FiPlus, FiTrash} from "react-icons/fi"
import Sidebar from "../Sidebar";
import { NotionKanban } from "../Kanban";

// function SalesAddNewProject() {
//   return (
//     <div>
//         <Sidebar></Sidebar>
//         <div className="p-4 sm:ml-64 bg-black">


//         </div>
      
//     </div>
//   )
// }

// export default SalesAddNewProject


export const SalesAddNewProject = () =>{
  return(
    <div className="h-screen w-full bg-gradient-to-r  text-neutral-50">
      <Sidebar></Sidebar>
      <div className="sm:ml-64 ">
      <NotionKanban></NotionKanban>
      </div>
    </div>  
  );
};

export default SalesAddNewProject