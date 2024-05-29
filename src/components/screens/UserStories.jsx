import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../variable";
import Sidebar from "../Sidebar";
export default function UserStories() {
  const [US, setUs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${api}project/userstory/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUs(data);
      });
  }, []);

  const selectTask = async(pid,usid) => {
    console.log("BRATHJER",localStorage.getItem("id"),pid,usid)
  
    await fetch(`${api}select/task`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(
        {pid:pid,
        usid:usid,
        assigned_to:localStorage.getItem("id")
        })
      })
  };

  return (
    <>
      <Sidebar></Sidebar>

      <div className="p-4 sm:ml-64 ">
        <div className="w-full inline-flex text-center items-center justify-center p-2 mb-4 me-2 overflow-hidden text-2xl text-white group bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] font-light">
          Project List
        </div>

        <div className="flex flex-row justify-between "></div>

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
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {US.map((project, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap "
                  >
                    {project.pid.deadline}
                  </th>
                  <td className="px-6 py-4 text-black">{project.pid.title}</td>
                  <td className="px-6 py-4 text-black">
                    {project.description}
                  </td>
                  <td className="px-6 py-4 text-black">
                    {project.status ? "Assigned" : "Not-Assigned"}
                  </td>
                  <td className="px-6 py-4 text-black">
                    {sessionStorage.getItem("role") === "developer" ? (
                      !project.status?
                      <button
                        className="my-2 w-full rounded py-2 transition duration-1000 bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] text-white shadow-md hover:from-[#824D74] hover:to-[#401F71] "
                        type="submit"
                        onClick={() => {
                          selectTask(project.pid.id, project.id);
                        }}
                      >
                        Select
                      </button>:""
                    ) : (
                      "hello2"
                    )}
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
