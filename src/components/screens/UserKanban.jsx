import React from 'react'
import Sidebar from '../Sidebar'
import { NotionKanban } from '../UserKanbanComponent'
export default function UserKanban() {
  return (
    <>
    <Sidebar></Sidebar>
    <div className=" sm:ml-64">
      <NotionKanban></NotionKanban>
    </div>
  </>
  )
}
