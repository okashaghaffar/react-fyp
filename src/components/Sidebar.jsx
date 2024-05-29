import React, { useState } from "react";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { FaMoneyCheckAlt, FaRegFileWord } from "react-icons/fa";
import { CiLogout, CiUser } from "react-icons/ci";
import { FaRegFileAudio } from "react-icons/fa";
import logo from "../assets/dynamo (2).png";


import { Link } from "react-router-dom";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
 const role= sessionStorage.getItem("role")
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    role==="admin"?(
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-400 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        {/* <IoMenuOutline className="w-6 h-6" /> */}
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#282A36] text-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  ">
          {/* <button  className="my-2 w-1/2 rounded py-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] ">
            <div className="font-bold">
              <span> D</span>ynamo
            </div>
          </button> */}
          <div className="ml-2 w-[30%] rounded py-2">
              
              <img src={logo} alt="" className="" />
            
          </div>

          <ul className="space-y-2 font-medium text-white">
            <li>
              <Link
                to="/admin/Home"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <IoIosHome className="w-5 h-5" />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/usermanagement"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <IoPeople className="w-5 h-5" />
                <span className="ms-3">User Management</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/projectdetails"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <GoProjectRoadmap className="w-5 h-5" />
                <span className="ms-3">Project Details</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/userprogress"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <GiProgression className="w-5 h-5" />
                <span className="ms-3">User Progress</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/sales/home"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <FaMoneyCheckAlt className="w-5 h-5 " />
                <span className="ms-3">Sales</span>
              </Link>
            </li> */}
          </ul>
          <div className="absolute bottom-0 text-white my-3">
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group ">
              {/* Icon for notifications */}
              <IoIosNotifications className="w-5 h-5" />
              <span className="ms-3">Notifications</span>
              <span className="inline-flex items-center justify-center w-5 h-5 px-2 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                3
              </span>
            </div>
            <Link to="/login" className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiLogout className="w-5 h-5"></CiLogout>
              <span  className="ms-3">Logout</span>
            </Link>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiUser className="w-5 h-5"></CiUser>
              <small className="ms-3">{sessionStorage.getItem("email")}</small>
            </div>
          </div>
        </div>
      </aside>
    </>):role==="cto"?(<>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-400 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        {/* <IoMenuOutline className="w-6 h-6" /> */}
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#282A36] text-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  ">
          <button  className="my-2 w-1/2 rounded py-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] ">
            <div className="font-bold">
              <span> D</span>ynamo
            </div>
          </button>
          <ul className="space-y-2 font-medium text-white">
            <li>
              <Link
                to="/cto/Home"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <IoIosHome className="w-5 h-5" />
                <span className="ms-3">Home</span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/projectdetails"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <GoProjectRoadmap className="w-5 h-5" />
                <span className="ms-3">Project Details</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/userprogress"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <GiProgression className="w-5 h-5" />
                <span className="ms-3">User Progress</span>
              </Link>
            </li>
        
          </ul>
          <div className="absolute bottom-0 text-white my-3">
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group ">
              {/* Icon for notifications */}
              <IoIosNotifications className="w-5 h-5" />
              <span className="ms-3">Notifications</span>
              <span className="inline-flex items-center justify-center w-5 h-5 px-2 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                3
              </span>
            </div>
            <Link to="/login" className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiLogout className="w-5 h-5"></CiLogout>
              <span  className="ms-3">Logout</span>
            </Link>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiUser className="w-5 h-5"></CiUser>
              <span className="ms-3">{sessionStorage.getItem("email")}</span>
            </div>
          </div>
        </div>
      </aside></>):role==="sales"?(<aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#282A36] text-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  ">
          <button  className="my-2 w-1/2 rounded py-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] ">
            <div className="font-bold">
              <span> D</span>ynamo
            </div>
          </button>
          <ul className="space-y-2 font-medium text-white">
            <li>
              <Link
                to="/sales/add"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <IoIosHome className="w-5 h-5" />
                <span className="ms-3">Home</span>
              </Link>
            </li>
         

      
            <li>
              <Link
                to="/sales/home"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <FaMoneyCheckAlt className="w-5 h-5 " />
                <span className="ms-3">Sales</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mom"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <FaRegFileAudio className="w-5 h-5" />
                <span className="ms-3">Mom Generation</span>
              </Link>
            </li>
            <li>
              <Link
                to="/srs"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <FaRegFileWord className="w-5 h-5" />
                <span className="ms-3">SRS Generation</span>
              </Link>
            </li>
          </ul>
          <div className="absolute bottom-0 text-white my-3">
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group ">
              {/* Icon for notifications */}
              <IoIosNotifications className="w-5 h-5" />
              <span className="ms-3">Notifications</span>
              <span className="inline-flex items-center justify-center w-5 h-5 px-2 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                3
              </span>
            </div>
            <Link to="/login" className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiLogout className="w-5 h-5"></CiLogout>
              <span  className="ms-3">Logout</span>
            </Link>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiUser className="w-5 h-5"></CiUser>
              <span className="ms-3">{sessionStorage.getItem("email")}</span>
            </div>
          </div>
        </div>
      </aside>)
      :role==="team lead"?(<aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#282A36] text-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  ">
          <button  className="my-2 w-1/2 rounded py-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] ">
            <div className="font-bold">
              <span> D</span>ynamo
            </div>
          </button>
          <ul className="space-y-2 font-medium text-white">
            <li>
              <Link
                to="/lead/home"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <IoIosHome className="w-5 h-5" />
                <span className="ms-3">Home</span>
              </Link>
            </li>
         

      
            <li>
              <Link
                to="/dev/progress"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <FaMoneyCheckAlt className="w-5 h-5 " />
                <span className="ms-3">Dev Progress</span>
              </Link>
            </li>
       
            
          </ul>
          <div className="absolute bottom-0 text-white my-3">
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group ">
              {/* Icon for notifications */}
              <IoIosNotifications className="w-5 h-5" />
              <span className="ms-3">Notifications</span>
              <span className="inline-flex items-center justify-center w-5 h-5 px-2 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                3
              </span>
            </div>
            <Link to="/login" className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiLogout className="w-5 h-5"></CiLogout>
              <span  className="ms-3">Logout</span>
            </Link>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiUser className="w-5 h-5"></CiUser>
              <span className="ms-3">{sessionStorage.getItem("email")}</span>
            </div>
          </div>
        </div>
      </aside>)
      :(<aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#282A36] text-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto  ">
          <button  className="my-2 w-1/2 rounded py-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] ">
            <div className="font-bold">
              <span> D</span>ynamo
            </div>
          </button>
          <ul className="space-y-2 font-medium text-white">
          <li>
              <Link
                to={`/dev/landing/${localStorage.getItem("id")}`}
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <IoIosHome className="w-5 h-5" />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/user/kanban/${localStorage.getItem("id")}`}
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <IoIosHome className="w-5 h-5" />
                <span className="ms-3">My tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mom"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <FaRegFileAudio className="w-5 h-5" />
                <span className="ms-3">Mom Generation</span>
              </Link>
            </li>
            <li>
              <Link
                to="/srs"
                className="flex items-center p-2 rounded-lg hover:bg-gray-400 group"
              >
                <FaRegFileWord className="w-5 h-5" />
                <span className="ms-3">SRS Generation</span>
              </Link>
            </li>
         

      
          </ul>
          <div className="absolute bottom-0 text-white my-3">
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group ">
              {/* Icon for notifications */}
              <IoIosNotifications className="w-5 h-5" />
              <span className="ms-3">Notifications</span>
              <span className="inline-flex items-center justify-center w-5 h-5 px-2 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                3
              </span>
            </div>
            
            <Link to="/login" className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiLogout className="w-5 h-5"></CiLogout>
              <span  className="ms-3">Logout</span>
            </Link>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-400 group">
              <CiUser className="w-5 h-5"></CiUser>
              <span className="ms-3">{sessionStorage.getItem("email")}</span>
            </div>
          </div>
        </div>
      </aside>)
  );
}
