import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { IoMdAdd } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { TbFileExport } from "react-icons/tb";
import { api } from "../../variable";
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function Devprogress() {
const [role, setRole] = useState("cto");

  const [users, setUsers] = useState([]);
  const navigate= useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("access") && sessionStorage.getItem("role")==="team lead"){
      fetch(`${api}get/dev-progress/${localStorage.getItem("id")}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
    }
    else{
      navigate("/login")
      
    }


  }, []);

  return (
    <div>
    <Sidebar></Sidebar>
    <div className="p-4 sm:ml-64">
      <div>
        <h1 className=" ">
          <p className="text-transparent text-2xl font-bold bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] bg-clip-text">
            {" "}
            Welcome to Dynamic Project Management Tool {sessionStorage.getItem("email")} !
          </p>
        </h1>

        <div className=" my-3 p-3">
          <ul className="flex flex-row justify-between items-center">
            <li className="">
              <span className="font-bold">Users</span>
              <br />
              <small>users that currently work under you</small>
            </li>
            <li>
              {role === "admin" ? (
                <button
                  className="my-2 w-full rounded p-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] "
                  type="submit"
                >
                  <div className="flex flex-row justify-between gap-x-2 items-center">
                    {" "}
                    <IoMdAdd />
                    Add new User
                  </div>
                </button>
              ) : (
                <></>
              )}
            </li>
            <li className="">
              <button
                className="my-2 w-full rounded p-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] "
                type="submit"
              >
                <div className="flex flex-row justify-between gap-x-2 items-center">
                  {" "}
                  <IoFilterOutline />
                  Filter
                </div>
              </button>
            </li>
            <li>
              {" "}
              <button
                className="my-2 w-full rounded p-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] "
                type="submit"
              >
                <div className="flex flex-row justify-between gap-x-2 items-center">
                  {" "}
                  <TbFileExport />
                  Export
                </div>
              </button>
            </li>
          </ul>
        </div>
        <div className="flex flex-row   items-center justify-between">
          <p className="text-2xl">Details of Users</p>
          <form className="flex items-center ">
            <label for="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
              <input
                type="text"
                id="voice-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos, Design Templates..."
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[#401F71] rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-black uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                options
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-white text-black">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  {user.user.username}
                </th>
                <td className="px-6 py-4">{user.user.first_name}</td>
                <td className="px-6 py-4">{user.user.last_name}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.user.email}</td>
                <td className="px-6 py-4">
                  <Link to={`/user/kanban/${user.user.id}`}className="underline">
                    {" "}
                    <p className="text-transparent font-bold bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] bg-clip-text">
                      {" "}
                     View Progress
                    </p>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}
