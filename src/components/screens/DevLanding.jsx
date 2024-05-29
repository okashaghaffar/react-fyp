import React, { useEffect, useState } from 'react'
import { api } from '../../variable';
import Sidebar from '../Sidebar';
import { Link, useParams } from 'react-router-dom';
export default function DevLanding() {
    const [projects, setProjects] = useState([]);
    const [role, setRole] = useState([]); // Initialize role state as an array
    const [dev, setDev] = useState([]);
    // const id = localStorage.getItem("id");
    const [US, setUs] = useState([]);
    const { id } = useParams();
  
  
    useEffect(() => {
      fetch(`${api}get/user/us/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setProjects(data);;
        });
    }, []);
  
  return (
    <>
     <Sidebar></Sidebar>

     <div className="p-4 sm:ml-64 ">
      <div className="w-full inline-flex text-center items-center justify-center p-2 mb-4 me-2 overflow-hidden text-2xl text-white group bg-gradient-to-r from-[#401F71] to-[#BE7B72] via-[#824D74] font-light">
       Project List
      </div>

      <div className="flex flex-row justify-between ">
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
           
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center ">User Stories</div>
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
                  {project.pid.deadline}
                </th>
                <td className="px-6 py-4 text-black">{project.pid.title}</td>
                <td className="px-6 py-4 text-black">
                  {project.pid.bid_by.username}
                </td>
                <td className="px-6 py-4 text-black">
                  {project.pid.assigned ? "Assigned" : "Not-Assigned"}
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/lead/us/${project.pid.id}`}
                    className="font-medium text-blue-500 italic hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}
