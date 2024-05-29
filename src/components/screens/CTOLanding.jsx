import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { api } from "../../variable";
import { useNavigate } from "react-router-dom";

function CTOLanding() {
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState([]); // Initialize role state as an array
  const [dev, setDev] = useState([]);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${api}get/na-project`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        // Initialize role state with an empty string for each project
        setRole(Array(data.length).fill(""));
      });

    fetch(`${api}get/dev`)
      .then((res) => res.json())
      .then((data) => setDev(data));
  }, []);

  const assign = (pid, assigned_to) => {
    console.log("ASSSIGNED IIIIDDD",id)
    fetch(`${api}create/pteam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pid: pid,
        lead: assigned_to,
      }),
    }).then(res=>res.json()).then(data=>console.log(data));
    window.location.href="/cto/Home"
   
  };
  return (
    <>
      <Sidebar></Sidebar>

      <div className="p-4 sm:ml-64 ">
        <div className="w-full inline-flex text-center items-center justify-center p-2 mb-4 me-2 overflow-hidden text-2xl text-white group bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] font-light">
          USER ACCESS PROGRESS
        </div>

        <div className="flex flex-row justify-between ">
          <form className="max-w-md my-2 bg-black w-full inline-flex text-center items-center justify-center p-0.5 overflow-hidden text-2xl text-[#401F71] group bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] focus:ring-4 focus:outline-none font-bold rounded-lg ">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />

              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-[#3d1d6ddc] hover:bg-[#824D74] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2  "
              >
                Search
              </button>
            </div>
          </form>

          <button
            type="button"
            className="text-white bg-[#BE7B72] hover:bg-[#824D74] focus:ring-4 font-medium rounded-lg text-sm px-7 h-9 me-2 mt-6"
          >
            Apply
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 pd">
            <thead className="text-xs text-white uppercase bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center ">
                    Date
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Uploaded by
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Task Assignment
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center ">Assignment</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap "
                  >
                    {project.deadline}
                  </th>
                  <td className="px-6 py-4 text-black">{project.title}</td>
                  <td className="px-6 py-4 text-black">
                    {project.bid_by.username}
                  </td>
                  <td className="px-6 py-4 text-black">
                    {project.assigned ? "" : "Not-Assigned"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="mb-3">
                      <select
                        className="w-full border rounded px-4 py-2 outline-none focus:border-blue-500"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select a user</option>
                        {dev.map((option) => (
                          <option key={option.user.id} value={option.user.id}>
                            {option.user.username}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={()=>{assign(project.id,role)}}
                      className="font-medium text-blue-500 italic hover:underline"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CTOLanding;
