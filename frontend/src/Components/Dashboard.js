import React from 'react'
import StudentTable from "./StudentTable"
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    navigate("/")
  }


  return (
    <div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', margin: "20px 0" }}>
        <h3 style={{ margin: "auto" }}>Student Dashboard</h3>
        <div>
          <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </div>
        </div>
        <StudentTable></StudentTable>
    </div>
  )
}

export default Dashboard