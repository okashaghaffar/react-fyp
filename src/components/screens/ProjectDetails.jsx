import React from "react";
import Sidebar from "../Sidebar";
import { NotionKanban } from "../Kanban";

export default function ProjectDetails() {
  
  return (
    <>
      <Sidebar></Sidebar>
      <div className=" sm:ml-64">
        <NotionKanban></NotionKanban>
      </div>
    </>
  );
}
