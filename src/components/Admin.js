import React from 'react'
import Sidebar from './Sidebar'

const Admin = () => {
  return (
    <div>
          <div className="grid grid-cols-12 grid-rows-1">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="bg-[#F8F5F0] col-span-10">
         <h1>Not allowed here</h1>
        </div>
      </div>
    </div>
  )
}

export default Admin